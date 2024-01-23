"use client";
import React, { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaFolderPlus, FaFolderOpen } from "react-icons/fa";
import { FilesContext } from "@contexts/FilesContext";
import Folder from "@models/Folder";
import File from "@models/File";
import Loading from "@components/ui/Loading";
import { Progress } from "@components/ui/progress";
const iconStyle = "w-24 h-24 text-primary";
const menuOptions = [
    {
        title: "Open or create a new space",
        subTitle: "We'll store all your thoughts here",
        icon: <FaFolderPlus className={iconStyle} />,
    },
];

let tempRootFolder: Folder;
const iterateFileSystemItem = async (folder: Folder, [currState, setState]) => {
    const folderHandler: any = folder.getHandler();
    const promises: Promise<void>[] = [];
    for await (const entry of folderHandler.values()) {
        currState++;
        // console.log(currState);
        setState(currState);
        if (entry.kind == "directory") {
            const currFolder = new Folder(entry.name, entry);
            folder.addChild(currFolder);
            promises.push(
                iterateFileSystemItem(currFolder, [currState + 1, setState])
            );
        } else {
            const currFile = new File(entry.name, entry);
            folder.addChild(currFile);
        }
    }
    await Promise.all(promises);
};
const SpaceMenu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currState, setState] = useState(0);
    let contextObj = useContext(FilesContext);
    const fileObj = useContext(FilesContext);
    const ref = useRef<HTMLInputElement>(null); // To ref the input element
    const router = useRouter();

    const handleSelectFolder = async () => {
        let dirHandler;
        if (typeof (window as any).showDirectoryPicker === "function") {
            dirHandler = await (window as any).showDirectoryPicker({
                mode: "readwrite",
            });
        } else {
            console.error(
                "showDirectoryPicker is not supported on the browser!"
            );
            return;
        }

        tempRootFolder = new Folder(dirHandler.name, dirHandler);
        console.log(dirHandler);
        setIsLoading(true);
        await iterateFileSystemItem(tempRootFolder, [currState, setState]).then(
            () => {
                console.log("false now");
                router.push("/home");
                setIsLoading(false);
            }
        );
        contextObj?.setRootFolder(tempRootFolder);
    };

    // e.target.files is an object of type FileList
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                {menuOptions.map((item) => (
                    <button
                        onClick={handleSelectFolder}
                        key={item.title}
                        className="duration-100 ease-linear cursor-pointer border-[3px] border-secondary border-dashed  hover:bg-foreground/10 rounded-3xl p-8 bg-transparent flex flex-row justify-center items-center gap-8"
                    >
                        <div className="text-primary">{item.icon}</div>
                        <div className="text-left">
                            <h1 className="text-xl text-primary font-bold [word-spacing:-3px]">
                                {item.title}
                            </h1>
                            <h4 className="text-base text-muted-foreground">
                                {item.subTitle}
                            </h4>
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-20">
                {isLoading && <Progress value={currState % 100}></Progress>}
            </div>
        </div>
    );
};

export default SpaceMenu;
