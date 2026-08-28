// src/ai/evaluation/replication.dataset.ts
import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import { defineDataset } from '@genkit-ai/evaluator';

// Ruta al archivo JSON generado por el script de Python
const ARCHITECTURE_MAP_PATH = path.resolve(process.cwd(), 'scripts', 'paginas_y_componentes.json');

// Función para cargar los datos del JSON
const loadArchitectureData = (): Record<string, any> | null => {
  try {
    if (fs.existsSync(ARCHITECTURE_MAP_PATH)) {
      const fileContent = fs.readFileSync(ARCHITECTURE_MAP_PATH, 'utf-8');
      return JSON.parse(fileContent);
    }
    console.warn(`[Replication Dataset] Archivo no encontrado: ${ARCHITECTURE_MAP_PATH}`);
    return null;
  } catch (error) {
    console.error('[Replication Dataset] Error al leer o parsear el archivo JSON:', error);
    return null;
  }
};

const architectureMap = loadArchitectureData();

// Creamos un array de DataPoints. Empezamos con la página de inicio.
const testCases: any[] = [];

if (architectureMap && architectureMap['src/app/page.tsx']) {
  const homePageData = architectureMap['src/app/page.tsx'];
  testCases.push({
    input: {
      pagePath: 'src/app/page.tsx',
      server_components: homePageData.server_components || [],
      client_components: homePageData.client_components || [],
      actions: homePageData.actions || [],
    },
    output: `Asistente, necesito que inicies la creación de la página`, // El output esperado es un prompt, podemos validar que contenga un texto clave.
  });
} else {
    console.warn("[Replication Dataset] No se encontraron datos para 'src/app/page.tsx' en el mapa de arquitectura.");
}

// Definimos el dataset de evaluación
export const replicationDataset = defineDataset({
  name: 'replicationPrompts',
  data: testCases,
});
