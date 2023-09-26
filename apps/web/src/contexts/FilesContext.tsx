'use client';
import Folder from '@models/Folder';
import React from 'react';
import { createContext, useState } from 'react';
export type FolderContextValue = {
    rootFolder: Folder | null;
    setRootFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
};

/*
 * FilesContext would provide values of type FileContextValues or null
 * through the FileContext.Provider
 */

export const FilesContext = createContext<FolderContextValue | null>(null);
export const FilesContextProvider = ({ children }) => {
    const [rootFolder, setRootFolder] = useState<Folder | null>(null);
    return (
        <FilesContext.Provider value={{ rootFolder, setRootFolder }}>
            {children}
        </FilesContext.Provider>
    );
};
