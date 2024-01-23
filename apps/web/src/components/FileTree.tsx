import React, { useContext } from "react";
import { FilesContext } from "@contexts/FilesContext";
import FolderCmp from "./FolderCmp";
import FileCmp from "./FileCmp";
import Folder from "@models/Folder";
import FileSystemItem from "@models/FileSystemItem";

interface fileTreeProp {
    entry: Folder;
}

const FileTree: React.FC<fileTreeProp> = ({ entry }) => {
    return (
        <div className="w-full max-h-full pl-4">
            {entry?.getChildren().map((item, index) => (
                <div className="text-primary" key={index}>
                    {item.getHandler().kind == "directory" ? (
                        <FolderCmp folder={item as Folder} />
                    ) : (
                        <FileCmp file={item} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default FileTree;
