'use client';
import React from 'react';
import { createContext, useState } from 'react';
export type FileContextValues = {
    files: File[] | null;
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
};

/*
 * FilesContext would provide values of type FileContextValues or null
 * through the FileContext.Provider
 */

export const FilesContext = createContext<FileContextValues | null>(null);
export const FilesContextProvider = ({ children }) => {
    const [files, setFiles] = useState<File[] | null>(null);
    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    );
};
