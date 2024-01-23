"use client";
import FileTreeData from "@components/FileTreeData";
import { Input } from "@components/ui/Input";
import { FilesContext } from "@contexts/FilesContext";
import { CiFolderOn, CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import React, { useContext, useEffect, useState } from "react";
import FileCmp from "@components/FileCmp";
import FileSystemItem from "@models/FileSystemItem";
import { UiContext } from "@contexts/uiContext";
const recur = async (folder, entries, setFiles) => {
    const children = await folder.getChildren();
    // console.log('Children of ', folder.name, ' ', children);
    for (const entry of children) {
        if (entry.getHandler().kind == "directory") {
            await recur(entry, entries, setFiles);
        } else {
            entries.push(entry);
        }
    }
};
const SideBar = () => {
    const uiContextObj = useContext(UiContext);
    const fileContextObj = useContext(FilesContext);
    let entries = [];
    const [toolOptions, setToolOptions] = useState([1, 0]);
    const [query, setQuery] = useState("");
    const [files, setFiles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        if (fileContextObj?.rootFolder) {
            const folder = fileContextObj?.rootFolder;
            recur(folder, entries, setFiles).then(() => {
                console.log(entries);
                setFiles([...entries]);
            });
        }
    }, [fileContextObj?.rootFolder]);
    useEffect(() => {
        setFiltered(
            files?.filter((item: FileSystemItem) =>
                item?.getName().toLowerCase().match(query.toLowerCase())
            )
        );
    }, [query]);

    return (
        <div
            className={`flex-col gap-4 h-full pt-4 pr-4 w-80 bg-secondary/30 ${
                uiContextObj?.sidebarOpen ? "flex" : "hidden"
            }`}
        >
            {fileContextObj?.rootFolder ? (
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex flex-row max-w-full ml-6 gap-2  p-2 bg-secondary/50 border border-dashed border-primary/20 rounded-lg transition-all">
                        <div
                            className={`bg-transparent flex justify-center items-center w-8 h-8 hover:bg-primary rounded-[8px] p-1 hover:text-background cursor-pointer  duration-100 ${
                                toolOptions[0]
                                    ? "bg-slate-400 text-primary"
                                    : "bg-transparent"
                            }`}
                            onClick={() => {
                                setToolOptions([1, 0]);
                            }}
                        >
                            <CiFolderOn className="w-8 h-8" />
                        </div>
                        <div
                            className={`flex justify-center items-center ${
                                toolOptions[1]
                                    ? "bg-slate-400 text-primary"
                                    : "bg-transparent"
                            } w-8 h-8 hover:bg-primary rounded-[8px] p-1 hover:text-background cursor-pointer  duration-100`}
                            onClick={() => {
                                setToolOptions([0, 1]);
                            }}
                        >
                            <CiSearch className="w-8 h-8" />
                        </div>
                    </div>
                    <div
                        className={`${
                            toolOptions[1] ? "flex flex-col" : "hidden"
                        }`}
                    >
                        <div>
                            <Input
                                type="text"
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mt-4">
                            {filtered.map((item: FileSystemItem, index) => (
                                <div key={index} className="">
                                    <FileCmp file={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={`${
                            toolOptions[0] ? "flex h-full" : "hidden"
                        }`}
                    >
                        <FileTreeData />
                    </div>
                </div>
            ) : (
                <div className="text-primary p-6 flex flex-col gap-4 justify-center items-center text-center h-full">
                    <CiFolderOn className="w-16 h-16 text-primary/40" />
                    No folder selected! Select a folder to start!
                </div>
            )}
        </div>
    );
};

export default SideBar;
