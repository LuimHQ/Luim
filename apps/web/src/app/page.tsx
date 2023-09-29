'use client';
import { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'ui';
import SpaceMenu from '@components/SpaceMenu';
import { Space_Mono } from 'next/font/google';
import SideBar from '@components/SideBar';
import { UiContext } from '@contexts/uiContext';
import { FilesContext } from '@contexts/FilesContext';
const space_mono = Space_Mono({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});
export default function Home() {
    const uiContextObj = useContext(UiContext);
    const fileContextObj = useContext(FilesContext);
    useEffect(() => {
        fileContextObj?.setRootFolder(null);
        uiContextObj?.setSidebarOpen(false);
    }, []);
    return (
        <div
            className={`bg-background w-full  flex h-full flex-row items-center justify-between py-2 ${space_mono.className}`}
        >
            <SideBar />
            <div className="w-full flex flex-row justify-center items-center">
                <SpaceMenu></SpaceMenu>
            </div>
        </div>
    );
}
