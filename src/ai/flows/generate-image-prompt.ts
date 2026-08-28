'use server';
/**
 * @fileOverview Flow para generar prompts detallados para modelos de generación de imágenes.
 *
 * - generateImagePrompt - Genera un prompt para un modelo de imagen.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';
import imageProfiles from '@/lib/imagenes.json';

const GenerateImagePromptInputSchema = z.object({
  sectionType: z.string().describe("El tipo de sección de la página donde se usará la imagen (ej: Hero, Card, Banner)."),
  serviceName: z.string().describe("El nombre del servicio para el cual es la imagen (ej: Envíos Express, Plan Emprendedores)."),
  serviceContext: z.string().optional().describe("Información detallada sobre el servicio para dar contexto y enriquecer el prompt."),
  aspectRatio: z.string().describe("La relación de aspecto de la imagen (ej: '16:9' para panorámica, '1:1' para cuadrada)."),
  style: z.string().describe("El estilo visual deseado para la imagen (ej: 'Fotografía Realista', 'Ilustración Digital')."),
  background: z.string().optional().describe("Descripción del fondo deseado para la imagen."),
  additionalDetails: z.string().optional().describe("Detalles adicionales o requerimientos específicos del usuario para la imagen."),
  inspirationImageName: z.string().optional().describe("Nombre de una imagen existente en imagenes.json para usar como inspiración."),
  textToInclude: z.string().optional().describe("Texto opcional para incluir en la imagen."),
});
type GenerateImagePromptInput = z.infer<typeof GenerateImagePromptInputSchema>;

const GenerateImagePromptOutputSchema = z.object({
  prompt: z.string().describe("El prompt detallado y optimizado para ser usado en un modelo de generación de imágenes como Imagen o Nano Banana."),
});
type GenerateImagePromptOutput = z.infer<typeof GenerateImagePromptOutputSchema>;

export async function generateImagePrompt(input: GenerateImagePromptInput): Promise<GenerateImagePromptOutput> {
  const companyData = companyProfile.company_profile;
  
  let inspirationImageData = null;
  if (input.inspirationImageName && input.inspirationImageName !== 'none') {
    inspirationImageData = imageProfiles.image_profiles.find(img => img.name === input.inspirationImageName) || null;
  }

  const flowInput = {
    ...input,
    company: companyData,
    inspirationImage: inspirationImageData,
    isMercadoLibreFlex: input.serviceName === "Mercado Libre Flex",
    isDeliveryGastronomico: input.serviceName === "Delivery Gastronómico",
    isEnviosExpress: input.serviceName === "Envíos Express",
    isEnviosLowCost: input.serviceName === "Envíos LowCost"
  };

  return generateImagePromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateImagePromptTemplate',
  input: { schema: z.any() }, // Accept any since we augment it
  output: { schema: GenerateImagePromptOutputSchema },
  prompt: `
    Tu tarea es actuar como un experto en "prompt engineering" para modelos de generación de imágenes de Google (como Imagen o Nano Banana).
    Debes crear un prompt detallado y efectivo en inglés, basado en la información proporcionada. El objetivo es generar una imagen profesional, de alta calidad y que se integre perfectamente con la identidad de marca del proyecto.

    **Contexto del Proyecto (Identidad de Marca):**
    - Empresa: {{company.identity.name}}, una empresa de {{company.identity.slogan_principal}}.
    - Tono general: Profesional, confiable, moderno y amigable.
    - Localización: {{company.location_contact.primary_city}}, Argentina. Si es posible, incluye sutilmente elementos que evoquen una ciudad costera (ej. rambla, lobos marinos, arquitectura, el mar de fondo).
    - Paleta de colores principal: Azul primario (similar a {{company.branding.colors.theme_primary.hex}}) y Amarillo/Naranja secundario (similar a #FBBF24). Estos colores deben ser prominentes.
    - Regla de texto: 
      {{#if textToInclude}}
        Incluye el siguiente texto de forma profesional y legible en la imagen: "{{textToInclude}}".
        - **Tipografía:** Utiliza una fuente audaz, moderna y con estilo tecnológico, similar a la fuente 'Orbitron'.
        - **Colores del Texto:** Aplica una combinación de colores blanco y amarillo/naranja a las palabras del texto. Por ejemplo, si el texto es "Envíos Express", la palabra "Envíos" podría ser blanca y "Express" amarilla, o alternar colores si hay más palabras. El objetivo es crear un contraste visual atractivo.
        - **Integración:** El texto debe estar perfectamente integrado en el diseño, con buena legibilidad y complementando el estilo visual general.
      {{else}}
        NO incluyas ningún tipo de texto, letras, logos o tipografías en la imagen.
      {{/if}}

    **Instrucciones para la generación del prompt:**
    1.  **Idioma:** El prompt final DEBE estar en inglés.
    2.  **Estructura:** Comienza con el tipo de toma (ej: "Dynamic action shot", "Vibrant digital illustration", "Cinematic photo"). Describe la escena principal, luego los sujetos, el fondo, y finalmente, los detalles de estilo.
    3.  **Integración de Marca:** Incorpora la paleta de colores (azul y amarillo/naranja) de forma natural en la escena (uniformes, vehículos, paquetes, elementos gráficos, etc.).

    {{#if inspirationImage}}
      **Instrucción Principal (Modo Inspiración):**
      La solicitud se basa en una imagen existente. Tu objetivo es crear un prompt que genere una versión MEJORADA, MÁS PROFESIONAL y con mayor impacto visual de la imagen de inspiración, manteniendo su concepto central pero elevando la calidad.
      - **Concepto de Inspiración:** {{inspirationImage.description}}
      - **Tags de Inspiración:** {{inspirationImage.tags}}
      - No copies el prompt antiguo. Reimagina la escena basándote en la descripción y los tags, aplicando tu experiencia para un resultado superior. Por ejemplo, si la descripción es "un fondo abstracto", crea un prompt para un fondo abstracto más dinámico, con mejor iluminación y composición.
    {{else}}
      **Instrucción Principal (Modo Creativo):**
      Debes generar un prompt desde cero basado en los siguientes requerimientos.
    {{/if}}

    **Requerimientos Específicos de la Solicitud:**
    - **Servicio Asociado:** "{{serviceName}}". Adapta la atmósfera y el concepto de la imagen a este servicio.
    - **Guía de Contenido Específico por Servicio:**
      {{#if isMercadoLibreFlex}}
        - **Elementos Clave:** Incorpora elementos visuales de Mercado Libre. Esto puede incluir el logo de Mercado Libre en las cajas, el color amarillo característico de la marca, o el packaging oficial de Mercado Envíos. La escena debe reflejar la velocidad y eficiencia del servicio Flex.
      {{/if}}
      {{#if isDeliveryGastronomico}}
        - **Elementos Clave:** La imagen debe centrarse en el delivery de comida. Incluye elementos como contenedores de comida para llevar, bolsas de papel de restaurantes, o un repartidor entregando un pedido a un cliente en la puerta de su casa. La atmósfera debe ser apetitosa y profesional.
      {{/if}}
      {{#if isEnviosExpress}}
        - **Elementos Clave:** El concepto principal es la velocidad. Utiliza efectos visuales como estelas de luz, desenfoque de movimiento (motion blur) o una composición dinámica para transmitir urgencia y rapidez.
      {{/if}}
      {{#if isEnviosLowCost}}
        - **Elementos Clave:** La imagen debe comunicar ahorro e inteligencia. Puedes incluir elementos como una alcancía (piggy bank) con el logo de la empresa, gráficos de flechas apuntando hacia abajo para simbolizar costos reducidos, o un repartidor en una ruta optimizada con varias paradas.
      {{/if}}
      
    {{#if serviceContext}}
      - **Contexto del Servicio:** Utiliza esta información para inspirar el concepto de la imagen. Por ejemplo, si el servicio es sobre "rapidez garantizada", la imagen debe ser dinámica. Si es sobre "ahorro", debe transmitir economía e inteligencia.
      '''
      {{serviceContext}}
      '''
    {{/if}}
    - **Tipo de Sección/Uso:** "{{sectionType}}". Ajusta la composición (ej: un 'Hero' debe ser panorámico e impactante; una 'Card' debe ser más enfocada y simple).
    - **Relación de Aspecto:** La composición debe ser coherente con "{{aspectRatio}}".
    - **Estilo Visual:** Aplica el estilo "{{style}}". Usa palabras clave expertas para lograrlo (ej: para 'Fotografía Realista' usa "hyper-realistic, photorealistic, cinematic lighting, shot on DSLR, 8k"; para 'Ilustración Digital' usa "digital illustration, vibrant colors, clean lines, graphic novel style").
    - **Fondo:** {{#if background}}"{{background}}"{{else}}Crea un fondo apropiado para el contexto.{{/if}}
    - **Detalles Adicionales:** "{{additionalDetails}}".

    **Optimización Final (Siempre aplicar):**
    - Añade siempre términos que mejoren la calidad: "hyper-detailed", "cinematic lighting", "sharp focus", "dynamic composition", "8k", "professional photography", "Unreal Engine render" (si es 3D).
    - Sé específico en los detalles. En lugar de "un hombre", di "a friendly male courier in his 20s".
    - Utiliza adjetivos potentes para describir la atmósfera (ej: "dynamic", "serene", "professional", "vibrant").

    Genera el prompt final en inglés a continuación.
  `,
});

const generateImagePromptFlow = ai.defineFlow(
  {
    name: 'generateImagePromptFlow',
    inputSchema: z.any(),
    outputSchema: GenerateImagePromptOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
