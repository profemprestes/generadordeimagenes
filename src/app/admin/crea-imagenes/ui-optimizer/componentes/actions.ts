// src/app/admin/crea-imagenes/ui-optimizer/componentes/actions.ts
'use server';

import { promises as fs } from 'fs';
import path from 'path';

interface GetContentResult {
    success: boolean;
    files?: { path: string; content: string }[];
    error?: string;
}

export async function getComponentFilesContentAction(paths: string[]): Promise<GetContentResult> {
    if (!paths || paths.length === 0) {
        return { success: false, error: "No se proporcionaron rutas de archivo." };
    }

    const projectRoot = path.resolve(process.cwd());
    const files: { path: string; content: string }[] = [];
    const errors: string[] = [];

    for (const relativePath of paths) {
        const absolutePath = path.resolve(projectRoot, relativePath);

        // Security check
        if (!absolutePath.startsWith(projectRoot)) {
            errors.push(`Acceso no autorizado a la ruta: ${relativePath}`);
            continue;
        }

        try {
            const content = await fs.readFile(absolutePath, 'utf-8');
            files.push({ path: relativePath, content });
        } catch (e) {
            console.error(`Error leyendo el archivo ${relativePath}:`, e);
            const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
            errors.push(`No se pudo leer el archivo: ${relativePath} (${errorMessage})`);
        }
    }

    if (errors.length > 0) {
        return { success: false, error: errors.join('\n') };
    }

    return { success: true, files };
}
