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
import MarkdownEditor from '@components/MarkdownEditor';
import SideBar from '@components/SideBar';
import { UiContext } from '@contexts/uiContext';

const Home = () => {
    const uiContextObj = useContext(UiContext);
    useEffect(() => {
        uiContextObj?.setSidebarOpen(true);
    }, []);
    return (
        <div className="flex flex-row gap-2 w-full h-full bg-background">
            <SideBar />
            <div className="w-full h-full px-12">
                <MarkdownEditor />
            </div>
        </div>
    );
};

export default Home;
