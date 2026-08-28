// src/app/admin/crea-imagenes/ui-optimizer/actions.ts
'use server';

import { promises as fs } from 'fs';
import path from 'path';

export async function getFileContentAction(filePath: string): Promise<{ success: boolean; content?: string; error?: string }> {
    if (!filePath) {
        return { success: false, error: "La ruta del archivo no puede estar vacía." };
    }

    // Basic security check to prevent path traversal
    const projectRoot = path.resolve(process.cwd());
    const absolutePath = path.resolve(projectRoot, filePath);

    if (!absolutePath.startsWith(projectRoot)) {
        return { success: false, error: "Acceso no autorizado." };
    }

    try {
        const content = await fs.readFile(absolutePath, 'utf-8');
        return { success: true, content };
    } catch (e) {
        console.error(`Error reading file ${filePath}:`, e);
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido al leer el archivo.';
        return { success: false, error: `No se pudo leer el archivo: ${errorMessage}` };
    }
}
