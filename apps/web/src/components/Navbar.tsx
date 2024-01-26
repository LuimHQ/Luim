'use client';
import Link from 'next/link';
import { ModeToggle } from '@components/ui/ModeToggle';
import { RiMenu2Fill } from 'react-icons/ri';
import { Button } from '@components/ui/button';
import { useContext } from 'react';
import { UiContext } from '@contexts/uiContext';
import { FilesContext } from '@contexts/FilesContext';

const Navbar = () => {
    const contextObj = useContext(UiContext);
    const fileContextObj = useContext(FilesContext);
    return (
        <div className="flex flex-row justify-between items-center px-4 bg-background z-10 h-12 py-1 max-w-full sticky top-0">
            <div className="flex flex-row gap-4 justify-center items-center h-full w-min text-xl text-primary">
                <Button
                    variant="ghost"
                    onClick={() => {
                        contextObj?.setSidebarOpen(!contextObj?.sidebarOpen);
                    }}
                >
                    <RiMenu2Fill className="w-4 h-4 text-primary" />
                </Button>
                <Link href="/" className="no-underline text-primary">
                    Luim
                </Link>
            </div>
            <div className="text-primary">
                {fileContextObj?.currFile?.getName()}
            </div>
            <div>
                <ModeToggle></ModeToggle>
            </div>
        </div>
    );
};

export default Navbar;
