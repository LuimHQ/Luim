'use client';
import React, { useContext } from 'react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaFolderPlus, FaFolderOpen } from 'react-icons/fa';
import { FilesContext } from '@contexts/FilesContext';
import Folder from '@models/Folder';
import File from '@models/File';
const iconStyle = 'w-24 h-24 text-muted-foreground';
const menuOptions = [
    {
        title: 'Open or create a new space',
        subTitle: "We'll store all your thoughts here",
        icon: <FaFolderPlus className={iconStyle} />,
    },
];

let tempRootFolder: Folder;
const iterateFileSystemItem = async (folder: Folder) => {
    const folderHandler: any = folder.getHandler();
    for await (const entry of folderHandler.values()) {
        if (entry.kind == 'directory') {
            const currFolder = new Folder(entry.name, entry);
            folder.addChild(currFolder);
            iterateFileSystemItem(currFolder);
        } else {
            const currFile = new File(entry.name, entry);
            folder.addChild(currFile);
        }
    }
};
const SpaceMenu = () => {
    let contextObj = useContext(FilesContext);
    const fileObj = useContext(FilesContext);
    const ref = useRef<HTMLInputElement>(null); // To ref the input element
    const router = useRouter();

    const handleSelectFolder = async () => {
        const dirHandler = await window.showDirectoryPicker({
            mode: 'readwrite',
        });

        tempRootFolder = new Folder(dirHandler.name, dirHandler);
        console.log(dirHandler);

        iterateFileSystemItem(tempRootFolder);
        contextObj?.setRootFolder(tempRootFolder);
        router.push('/home');
    };

    // e.target.files is an object of type FileList
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                {menuOptions.map((item) => (
                    <button
                        onClick={handleSelectFolder}
                        key={item.title}
                        className="duration-100 ease-linear cursor-pointer  hover:bg-slate-900 rounded-3xl p-8 bg-secondary flex flex-row justify-center items-center gap-8"
                    >
                        <div>{item.icon}</div>
                        <div className="text-left">
                            <h1 className="text-xl text-primary font-bold">
                                {item.title}
                            </h1>
                            <h4 className="text-base text-muted-foreground">
                                {item.subTitle}
                            </h4>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpaceMenu;
