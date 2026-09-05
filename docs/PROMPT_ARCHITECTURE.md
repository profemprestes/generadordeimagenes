# Arquitectura de Prompts v2.0 - Generador de Imágenes

Optimizado para Nano Banana Pro (`gemini-3-pro-image-preview`) y Nano Banana 2 (`gemini-3.1-flash-image-preview`)

## 1. Estructura Obligatoria de Prompt

Todo prompt generado debe redactarse en un único párrafo denso en idioma inglés, estructurado bajo el siguiente orden:

1. **Subject & Action:** Identidad central, geometría y pose/orientación espacial.
2. **Environment & Staging:** Fondo controlado (ciclorama, estudio, entorno urbano) y sombras de contacto.
3. **Materials & Surface Physics (PBR):** Especificación táctil de materiales (titanio satinado, polímero lacado, vidrio esmerilado, texturas micro-acabadas).
4. **Integrated Typography (Opcional):** Textos literales entre comillas `"TEXT"`, tipografía (modern sans-serif, monospace), material de la letra y su relación espacial (relieve, grabado o sobreimpreso).
5. **Optics & Lighting:** Tipo de lente (ej. 85mm f/1.4), esquema de luces (three-point softbox, rim light de recorte) y resolución de salida (1K, 2K, 4K).

## 2. Reglas de Descarte (Antipatrones Prohibidos)

- **Prohibido el tag de firma:** No incluir palabras clave como "Nano Banana", "photorealistic", "trending on artstation" o "hyperrealistic".
- **Prohibido el keyword-stuffing:** Usar sintaxis gramatical fluida y descriptiva en lugar de listas de etiquetas separadas por comas.
- **Prohibido externalizar texto básico:** Aprovechar la capacidad de Nano Banana Pro para renderizar marcas, iniciales y titulares directos.

## 3. Guía de Flujo en Google Flow

- **Nuevas Generaciones:** Usar Nano Banana Pro para activos de marca y Nano Banana 2 cuando se requiera verificación geográfica/landmarks mediante Google Search Grounding.
- **Edición e Inpainting:** Formular órdenes conversacionales semánticas referenciando el área exacta (ej. _"Change the color of the helmet to canary yellow #FFEC01 while keeping the rest of the image unchanged"_).
- **Consistencia Multimodal:** En composiciones de hasta 14 referencias, asignar explícitamente qué aporta cada imagen (Sujeto de Imagen 1, Paleta de Imagen 2, Entorno de Imagen 3).
