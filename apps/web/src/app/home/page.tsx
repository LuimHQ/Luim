"use client";
import FileTree from "@components/FileTree";
import FileTreeData from "@components/FileTreeData";
import { Input } from "@components/ui/Input";
import { FilesContext } from "@contexts/FilesContext";
import { CiFolderOn, CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import React, { useContext, useEffect, useState } from "react";
import FileCmp from "@components/FileCmp";
import FileSystemItem from "@models/FileSystemItem";
import SideBar from "@components/SideBar";
import { UiContext } from "@contexts/uiContext";
import { ForwardRefEditor } from "@components/ForwardRef";
import "@mdxeditor/editor/style.css";
import FileService from "@models/FileService";
import { MDXEditorMethods } from "@mdxeditor/editor";

const Home = () => {
    const ref = React.useRef<MDXEditorMethods>(null);
    const contextObj = useContext(FilesContext);
    const openFile = async (file: FileSystemItem): Promise<string> => {
        let contents = await FileService.openFile(file);
        return contents;
        // console.log(contents);
    };
    const saveFile = async (file: FileSystemItem, contents: string) => {
        await FileService.saveFile(file, contents);
    };
    const contextObject = useContext(FilesContext);
    const [markdown, setMarkdown] = useState<string>("");
    useEffect(() => {
        console.log(contextObject?.currFile);

        if (
            contextObject?.currFile != null &&
            contextObj?.currFile != undefined
        ) {
            openFile(contextObj?.currFile).then((contents) => {
                console.log(contents);

                ref.current?.setMarkdown(contents);
            });
        } else {
            setMarkdown("");
        }
    }, [contextObject?.currFile]);

    const handleEditorChange = (markdown: string) => {
        setMarkdown(markdown);
        const editedMarkdown = ref.current?.getMarkdown();
        if (contextObj?.currFile !== null && editedMarkdown) {
            saveFile(contextObj?.currFile as FileSystemItem, editedMarkdown);
        }

        // FileService.saveFile()
    };
    const uiContextObj = useContext(UiContext);
    useEffect(() => {
        uiContextObj?.setSidebarOpen(true);
    }, []);

    return (
        <div className="flex flex-row gap-2 w-full h-full bg-background">
            <SideBar />
            <div className="flex w-full px-12 overflow-y-scroll max-h-full scrollbar">
                <ForwardRefEditor
                    markdown={markdown}
                    onBlur={(e: any) => {
                        handleEditorChange(e.target?.innerText);
                     }}
                    ref={ref}
                />
            </div>
        </div>
    );
};

export default Home;
