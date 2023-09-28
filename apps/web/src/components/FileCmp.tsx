import React, { useContext, useEffect, useState } from 'react';
import File from '@models/File';
import { BsPencil, BsTrash } from 'react-icons/bs';
import FileService from '@models/FileService';
import { FilesContext } from '@contexts/FilesContext';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@components/ui/context-menu';
import { ContextMenuSeparator } from '@radix-ui/react-context-menu';
import { AiOutlineAlignLeft } from 'react-icons/ai';

interface fileCmpProps {
    file: File;
    matched?: string;
}


const FileCmp: React.FC<fileCmpProps> = ({ file, matched }) => {
    const contextObject = useContext(FilesContext);
    const setCurrFile = () => {
        contextObject?.setCurrFile(file);
    }
    const fileOptions = [
        {
            displayText: 'Open file',
            icon: AiOutlineAlignLeft,
            handler: setCurrFile,
        },
        {
            displayText: 'Rename file',
            icon: BsPencil,
        },
        {
            displayText: 'Delete file',
            icon: BsTrash,
            style: 'destructive',
        },
    ];
    const [onContext, setonContext] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
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

    const name: string =
        file.getName().length > 40
            ? file.getName().slice(0, 35) + ' ...'
            : file.getName();
    let prefix: string, match: string, suffix: string;
    let matchIndex =
        matched != undefined
            ? matched.toLowerCase().indexOf(matched?.toLowerCase())
            : -1;
    if (matchIndex >= 0 && matched != undefined) {
        prefix = name.substring(0, matchIndex);
        match = name.substring(matchIndex, matchIndex + matched?.length);
        suffix = name.substring(matchIndex + matched?.length);
        console.log(suffix, ' ', match, ' ', prefix);
        return (
            <div
                onContextMenu={() => {
                    setonContext(!onContext);
                }}
                className={`w-full ml-8 text-base py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer ${
                    onContext ? 'bg-secondary' : 'bg-transparent'
                }`}
                draggable={true}
            >
                {prefix}
                <span className="text-red-200">{match}</span>
                {suffix}
            </div>
        );
    } else
        return (
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        ref={ref}
                        onContextMenu={async () => {
                            setonContext(!onContext);
                        }}
                        onClick={() => {
                            setCurrFile();
                        }}
                        className={`w-full ml-8 text-base py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer ${
                            onContext ? 'bg-secondary' : 'bg-transparent'
                        }`}
                    >
                        {name}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="p-2 bg-muted-foreground text-background">
                    {fileOptions.map((item, index) => (
                        <ContextMenuItem
                            onClick={item.handler}
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
        );
};

export default FileCmp;
