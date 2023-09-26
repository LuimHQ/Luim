import { FilesContext } from '@contexts/FilesContext';
import FileSystemItem from '@models/FileSystemItem';
import React, { useContext } from 'react';
import FileTree from './FileTree';

const FileTreeData = () => {
    const contextObj = useContext(FilesContext);
    if (contextObj?.rootFolder == null || contextObj?.rootFolder == undefined) {
        return <div>Root folder is not selected</div>;
    } else {
        return (
            <div className="">
                <FileTree entry={contextObj?.rootFolder} />
            </div>
        );
    }
};

export default FileTreeData;
