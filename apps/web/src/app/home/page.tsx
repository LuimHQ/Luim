'use client';
import FileTree from '@components/FileTree';
import FileTreeData from '@components/FileTreeData';
import { Input } from '@components/ui/Input';
import { FilesContext } from '@contexts/FilesContext';
import { CiFolderOn, CiSearch } from 'react-icons/ci';
import { LuSearch } from 'react-icons/lu';
import React, { useContext, useEffect, useState } from 'react';
import FileCmp from '@components/FileCmp';
import FileSystemItem from '@models/FileSystemItem';
import SideBar from '@components/SideBar';
import { UiContext } from '@contexts/uiContext';
import { ForwardRefEditor } from '@components/ForwardRef';
import '@mdxeditor/editor/style.css'
import FileService from '@models/FileService';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Delayed from '@components/Delayed';

const Home = () => {
    // const [loading, setLoading] = useState(false);
    const ref = React.useRef<MDXEditorMethods>(null);
    const contextObj = useContext(FilesContext);
    const openFile = async (file: FileSystemItem): Promise<string> => {
        // try {
        // setLoading(true);
        const contents = await FileService.openFile(file);
        return contents;
        // } finally {
        // setLoading(false);
        // }
    };
    const saveFile = async (file: FileSystemItem, contents: string) => {
        await FileService.saveFile(file, contents);
    };
    const contextObject = useContext(FilesContext);
    const [markdown, setMarkdown] = useState<string>('');
    useEffect(() => {
        if (
            contextObject?.currFile != null &&
            contextObj?.currFile != undefined
        ) {
            openFile(contextObj?.currFile).then((contents) => {
                // !loading && ref.current?.setMarkdown(contents);
                ref.current?.setMarkdown(contents)
            });
        } else {
            setMarkdown('');
        }
    }, [contextObject?.currFile]);// , loading]);

    const handleEditorChange = (markdown: string) => {
        setMarkdown(markdown);
        console.log(markdown);
        if (contextObj?.currFile !== null) {
            saveFile(contextObj?.currFile as FileSystemItem, markdown);
        }
    };
    const uiContextObj = useContext(UiContext);
    useEffect(() => {
        uiContextObj?.setSidebarOpen(true);
    }, []);
    
    return (
        <div className="flex flex-row gap-2 w-full h-full bg-background">
            <SideBar />
            <div className="w-full h-full px-12 mt-4">
                <Delayed>
                    
                    <ForwardRefEditor
                        markdown={markdown} onChange={handleEditorChange}
                        ref={ref}
                    />
                    {/* <div className={!loading ? 'block' : 'hidden' }><p className='text-slate-100'></p></div> */}
                    
                </Delayed>
            </div>
        </div>
    );
};

export default Home;
