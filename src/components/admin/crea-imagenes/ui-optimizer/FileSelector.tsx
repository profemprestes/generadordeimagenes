// src/components/admin/crea-imagenes/ui-optimizer/FileSelector.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, FileCode } from 'lucide-react';
import { getFileContentAction } from '@/app/ui-optimizer/actions';
import { useToast } from '@/hooks/use-toast';


export interface ComponentNode {
    component_path: string;
    components: ComponentNode[];
}

export interface PageStructure {
    page_path: string;
    components: ComponentNode[];
}

export interface SelectedPaths {
    pagePath: string;
    components: {
        path: string;
        subComponents: string[];
    }[];
}

interface FileSelectorProps {
    projectStructure: PageStructure[];
    onFilesSelect: (files: { path: string; content: string }[], paths: SelectedPaths) => void;
}

export function FileSelector({ projectStructure, onFilesSelect }: FileSelectorProps) {
    const [selectedPagePath, setSelectedPagePath] = useState<string>('');
    const [mainComponentPath, setMainComponentPath] = useState<string>('__page__');
    const [subComponentPath, setSubComponentPath] = useState<string>('__all__');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const pageData = useMemo(() => projectStructure.find(p => p.page_path === selectedPagePath), [selectedPagePath, projectStructure]);
    const mainComponentData = useMemo(() => pageData?.components.find(c => c.component_path === mainComponentPath), [pageData, mainComponentPath]);
    
    useEffect(() => {
        setMainComponentPath('__page__');
    }, [selectedPagePath]);

    useEffect(() => {
        setSubComponentPath('__all__');
    }, [mainComponentPath]);

    const fetchContent = useCallback(async () => {
        if (!selectedPagePath) {
            onFilesSelect([], { pagePath: '', components: [] });
            return;
        }

        setIsLoading(true);
        let pathsToFetch: string[] = [];
        const selectedPathsData: SelectedPaths = { pagePath: selectedPagePath, components: [] };
        
        if (mainComponentPath === '__page__') {
            pathsToFetch.push(selectedPagePath);
            if (pageData) {
                 pageData.components.forEach(c => pathsToFetch.push(c.component_path));
            }
        } else if (mainComponentData) {
            pathsToFetch.push(mainComponentData.component_path);
            const componentSelection = { path: mainComponentData.component_path, subComponents: [] as string[] };
            
            if (subComponentPath === '__all__') {
                const allSubPaths = mainComponentData.components.map(sc => sc.component_path);
                pathsToFetch.push(...allSubPaths);
                componentSelection.subComponents = allSubPaths;
            } else if (subComponentPath !== '__none__') {
                pathsToFetch.push(subComponentPath);
                componentSelection.subComponents = [subComponentPath];
            }
            selectedPathsData.components.push(componentSelection);
        } else {
             pathsToFetch.push(selectedPagePath);
        }

        const uniquePaths = [...new Set(pathsToFetch)];
        const files: { path: string; content: string }[] = [];
        for (const path of uniquePaths) {
            const result = await getFileContentAction(path);
            if (result.success && result.content) {
                files.push({ path, content: result.content });
            } else {
                toast({
                    title: "Error al cargar archivo",
                    description: `No se pudo leer el contenido de: ${path}.`,
                    variant: "destructive",
                });
            }
        }
        onFilesSelect(files, selectedPathsData);
        setIsLoading(false);
    }, [selectedPagePath, mainComponentPath, subComponentPath, pageData, mainComponentData, onFilesSelect, toast]);
    
    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    return (
        <Card className="shadow-md">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    {/* Page Selector */}
                    <div className="space-y-2 lg:col-span-1">
                        <label className="text-sm font-medium flex items-center gap-2">
                           <FileCode className="h-4 w-4"/> Página
                        </label>
                        <Select onValueChange={setSelectedPagePath} value={selectedPagePath}>
                            <SelectTrigger><SelectValue placeholder="Elige una página..." /></SelectTrigger>
                            <SelectContent>
                                {projectStructure.map(page => (
                                    <SelectItem key={page.page_path} value={page.page_path}>{page.page_path.replace('src/app/', '')}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Main Component Selector */}
                    <div className="space-y-2 lg:col-span-1">
                         <label className="text-sm font-medium flex items-center gap-2">
                           <FileCode className="h-4 w-4"/> Componente Principal
                        </label>
                        <Select onValueChange={setMainComponentPath} value={mainComponentPath} disabled={!pageData}>
                            <SelectTrigger><SelectValue placeholder="Elige un componente..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__page__">Página Completa</SelectItem>
                                {pageData?.components.map(component => (
                                    <SelectItem key={component.component_path} value={component.component_path}>
                                        {component.component_path.split('/').pop()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {/* Sub-component Selector */}
                    <div className="space-y-2 lg:col-span-1">
                        <label className="text-sm font-medium flex items-center gap-2">
                           <FileCode className="h-4 w-4"/> Sub-componentes
                        </label>
                        <Select
                            onValueChange={setSubComponentPath}
                            value={subComponentPath}
                            disabled={!mainComponentData || mainComponentData.components.length === 0}
                        >
                            <SelectTrigger><SelectValue placeholder="Elige sub-componentes..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__">Todos los sub-componentes</SelectItem>
                                <SelectItem value="__none__">Ninguno</SelectItem>
                                {mainComponentData?.components.map(sub => (
                                    <SelectItem key={sub.component_path} value={sub.component_path}>
                                        {sub.component_path.split('/').pop()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 {isLoading && (
                    <div className="mt-4 flex items-center justify-center text-muted-foreground text-sm">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Cargando código fuente...
                    </div>
                 )}
            </CardContent>
        </Card>
    );
}
