'use-client';
import { FilesContext } from '@contexts/FilesContext';
import FileSystemItem from '@models/FileSystemItem';
import React, { useContext, useEffect, useState } from 'react';
import FileTree from './FileTree';

const FileTreeData = () => {
    const [isLoaded, setIsLoaded] = useState(0);
    const contextObj = useContext(FilesContext);
    const [files, setFiles] = useState([]);
    let entries = [];
    if (contextObj?.rootFolder == null || contextObj?.rootFolder == undefined) {
        return <div>Root folder is not selected</div>;
    } else {
        return (
            <div className="flex flex-col w-full max-h-full overflow-y-scroll overflow-x-visible text-sm scrollbar">
                <FileTree entry={contextObj?.rootFolder} />
                <div className="py-32"></div>
            </div>
        );
    }
};

export default FileTreeData;
