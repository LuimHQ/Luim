import React, { useContext, useEffect, useState } from 'react';
import File from '@models/File';
import { BsPencil, BsTrash } from 'react-icons/bs';
import FileService from '@models/FileService';
import { FilesContext } from '@contexts/FilesContext';
import { FaPlusCircle } from 'react-icons/fa';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@components/ui/context-menu';
import { ContextMenuSeparator } from '@radix-ui/react-context-menu';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { supabase } from '@lib/supabaseClient';
import { AuthContext } from '@contexts/AuthContext';

interface fileCmpProps {
    file: File;
    matched?: string;
}

const FileCmp: React.FC<fileCmpProps> = ({ file, matched }) => {
    const [JoinedSpaceloading, setJoinedSpaceLoading] = useState(false);
    // load the joined spaces
    const loadJoined = async () => {};

    const [renameFileState, setRenameFileState] = useState<boolean>(false);
    const contextObject = useContext(FilesContext);
    const setCurrFile = () => {
        contextObject?.setCurrFile(file);
    };

    const renameFile = () => {
        setRenameFileState(true);
        if (ref.current) {
            const range = document.createRange();
            range.selectNodeContents(ref.current);
            const selection = window.getSelection();
            if (selection) {
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
    };
    const fileOptions = [
        {
            displayText: 'Open file',
            icon: AiOutlineAlignLeft,
            handler: setCurrFile,
        },
        {
            displayText: 'Rename file',
            icon: BsPencil,
            handler: renameFile,
        },
        {
            displayText: 'Delete file',
            icon: BsTrash,
            style: 'destructive',
        },
        {
            displayText: 'Add to a space',
            type: 'dropdown',
            icon: FaPlusCircle,
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

    const authProvider = useContext(AuthContext);
    const [joinedSpaces, setJoinedSpaces] = useState<Array<any>>([]);
    const getJoinedSpaces = async () => {
        try {
            setJoinedSpaceLoading(false);
            const { data, error, status } = await supabase
                .from('users_in_spaces')
                .select(
                    `
                        space_id, spaces(id, title)
                        `
                )
                .eq('user_id', authProvider?.user?.id);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data);
                setJoinedSpaces(data);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setJoinedSpaceLoading(false);
        }
    };

    const insertNote = async (spaceInfo: any) => {
        const fileContent = await contextObject?.openFile(file);
        console.log('spaceinfo here: ', spaceInfo);
        try {
            const { data, error } = await supabase
                .from('notes')
                .insert([
                    {
                        title: file.name,
                        content: fileContent,
                        space_id: spaceInfo.id,
                        user_id: authProvider?.user?.id,
                    },
                ])
                .select();
        } catch (error) {
            alert('Error inserting notes');
        }
    };

    const name: string =
        file.getName().length > 40
            ? file.getName().slice(0, 35) + ' ...'
            : file.getName();

    const formatFileName = (file: File) => {
        return file?.name?.length > 40
            ? file?.name.slice(0, 35) + ' ...'
            : file?.name;
    };
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
                className={`w-full ml-8 py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer ${
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
                        onBlur={() => {
                            if (renameFileState) {
                                if (ref.current?.textContent != null)
                                    FileService.renameFile(
                                        file,
                                        ref.current?.textContent
                                    );
                                setRenameFileState(false);
                            }
                        }}
                        className={`w-full  text-sm py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer break-words ${
                            onContext ||
                            formatFileName(contextObject?.currFile as File) ==
                                name
                                ? 'bg-secondary'
                                : 'bg-transparent'
                        }`}
                        contentEditable={renameFileState}
                    >
                        {name}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="p-3 bg-background/90 text-foreground backdrop-blur-lg border-foreground/50 shadow-xl">
                    {fileOptions.map((item, index) => (
                        <ContextMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                item.handler;
                            }}
                            className={`cursor-pointer px-4 ${
                                item.style == 'destructive'
                                    ? 'text-destructive'
                                    : 'bg-transparent'
                            }`}
                            key={index}
                        >
                            {item?.type == 'dropdown' ? (
                                <DropdownMenu
                                    onOpenChange={async (open) => {
                                        if (open) {
                                            await getJoinedSpaces();
                                        }
                                    }}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex flex-flow gap-2">
                                            <div>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>{item.displayText}</div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>
                                            Connected Spaces
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {joinedSpaces.map((item, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                className="cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    insertNote(item.spaces);
                                                }}
                                            >
                                                <div>{item.spaces.title}</div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex flex-flow gap-2">
                                    <div>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>{item.displayText}</div>
                                </div>
                            )}
                        </ContextMenuItem>
                    ))}
                </ContextMenuContent>
            </ContextMenu>
        );
};

export default FileCmp;
