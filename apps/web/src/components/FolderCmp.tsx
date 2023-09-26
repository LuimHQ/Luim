import FileSystemItem from '@models/FileSystemItem';
import Folder from '@models/Folder';
import React, { useEffect, useRef, useState } from 'react';
import FileTree from './FileTree';
import { GoChevronRight } from 'react-icons/go';
import {
    BsFolderPlus,
    BsFilePlus,
    BsFile,
    BsPencil,
    BsTrash,
} from 'react-icons/bs';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@components/ui/context-menu';

interface folderCmpProps {
    folder: Folder;
}

const folderOptions = [
    {
        displayText: 'Create a new folder',
        icon: BsFolderPlus,
    },
    {
        displayText: 'Create a new file',
        icon: BsFilePlus,
    },
    {
        displayText: 'Rename',
        icon: BsPencil,
    },
    {
        displayText: 'Delete folder',
        icon: BsTrash,
        style: 'destructive',
    },
];

const FolderCmp: React.FC<folderCmpProps> = ({ folder }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    const [onContext, setonContext] = useState(false);
    useEffect(() => {
        const listenOutside = (event) => {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                onContext
            ) {
                setonContext(false);
            }
            return () => {
                document.removeEventListener('mousedown', listenOutside);
            };
        };
        document.addEventListener('mousedown', listenOutside);
    });
    return (
        <div className="cursor-pointer ml-8">
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        ref={ref}
                        onClick={() => {
                            console.log(opened);
                            setOpened(!opened);
                        }}
                        onContextMenu={() => {
                            setonContext(!onContext);
                        }}
                        className={`flex flex-row gap-1 items-center text-base pt-1.5 pb-1.5 hover:bg-secondary duration-100 pl-1.5 rounded-sm ${
                            onContext ? 'bg-secondary' : 'bg-transparent'
                        }`}
                    >
                        <div>
                            <GoChevronRight
                                className={`w-7 z-0 h-7 text-primary duration-100 ${
                                    opened ? 'rotate-90' : 'rotate-0'
                                }`}
                            />
                        </div>
                        <div>{folder.getName()}</div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="p-2 bg-muted-foreground text-background">
                    {folderOptions.map((item, index) => (
                        <ContextMenuItem
                            className={`cursor-pointer px-4 ${
                                item.style == 'destructive'
                                    ? 'text-destructive'
                                    : 'bg-transparent'
                            }`}
                            key={index}
                        >
                            <div className="flex flex-flow gap-2">
                                <div>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>{item.displayText}</div>
                            </div>
                        </ContextMenuItem>
                    ))}
                </ContextMenuContent>
            </ContextMenu>
            <div>
                <div
                    className={`${
                        opened ? 'flex' : 'hidden'
                    } border-l border-l-secondary`}
                >
                    <FileTree entry={folder} />
                </div>
            </div>
        </div>
    );
};

export default FolderCmp;
