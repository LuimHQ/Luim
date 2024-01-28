'use client';
import Folder from '@models/Folder';
import File from '@models/File';
import React from 'react';
import { createContext, useState } from 'react';
import FileSystemItem from '@models/FileSystemItem';
import FileService from '@models/FileService';
export type FolderContextValue = {
    rootFolder: Folder | null;
    setRootFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
    currFile: File | null;
    setCurrFile: React.Dispatch<React.SetStateAction<File | null>>;
    openFile: (file: FileSystemItem) => Promise<string>;
};

/*
 * FilesContext would provide values of type FileContextValues or null
 * through the FileContext.Provider
 *
 */

export const FilesContext = createContext<FolderContextValue | null>(null);
export const FilesContextProvider = ({ children }) => {
    const [rootFolder, setRootFolder] = useState<Folder | null>(null);
    const [currFile, setCurrFile] = useState<File | null>(null);
    const openFile = async (file: FileSystemItem): Promise<string> => {
        let contents = await FileService.openFile(file);
        return contents;
        // console.log(contents);
    };

    return (
        <FilesContext.Provider
            value={{
                rootFolder,
                setRootFolder,
                currFile,
                setCurrFile,
                openFile,
            }}
        >
            {children}
        </FilesContext.Provider>
    );
};
