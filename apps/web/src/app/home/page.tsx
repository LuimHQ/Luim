'use client';
import FileTree from '@components/FileTree';
import FileTreeData from '@components/FileTreeData';
import { Input } from '@components/ui/Input';
import { FilesContext } from '@contexts/FilesContext';
import { CiFolderOn, CiSearch } from 'react-icons/ci';
import { LuSearch } from 'react-icons/lu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FileCmp from '@components/FileCmp';
import FileSystemItem from '@models/FileSystemItem';
import SideBar from '@components/SideBar/SideBar';
import { UiContext } from '@contexts/uiContext';
import { ForwardRefEditor } from '@components/ForwardRef';
import '@mdxeditor/editor/style.css';
import FileService from '@models/FileService';
import { MDXEditorMethods } from '@mdxeditor/editor';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@components/ui/resizable';
import { Sidebar } from 'lucide-react';

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
    const [markdown, setMarkdown] = useState<string>('');
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
            setMarkdown('');
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
    const sideBarRef = useRef(null);
    useEffect(() => {
        const sideBar = sideBarRef.current as any;
        if (uiContextObj?.sidebarOpen) {
            sideBar.expand();
        } else {
            sideBar.collapse();
        }
    }, [uiContextObj?.sidebarOpen]);

    return (
        <ResizablePanelGroup direction="horizontal">
            <div className="flex flex-row gap-2 w-full h-full bg-background">
                <ResizablePanel
                    ref={sideBarRef}
                    maxSize={40}
                    collapsible={true}
                    minSize={10}
                    collapsedSize={0}
                    defaultSize={30}
                >
                    <SideBar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <div className="flex w-full px-12 pb-24 overflow-auto max-h-full scrollbar justify-center">
                        <ForwardRefEditor
                            markdown={markdown}
                            onBlur={(e: any) => {
                                handleEditorChange(e.target?.innerText);
                            }}
                            ref={ref}
                        />
                    </div>
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>
    );
};

export default Home;
