import FileSystemItem from '@models/FileSystemItem';
import Folder from '@models/Folder';
import React, { useState } from 'react';
import FileTree from './FileTree';
import { GoChevronRight } from 'react-icons/go';

interface folderCmpProps {
    folder: Folder;
}

const FolderCmp: React.FC<folderCmpProps> = ({ folder }) => {
    const [opened, setOpened] = useState(false);
    return (
        <div className="cursor-pointer ml-8">
            <div
                onClick={() => {
                    console.log(opened);
                    setOpened(!opened);
                }}
                className=" flex flex-row gap-1 items-center text-base pt-1.5 pb-1.5 hover:bg-secondary duration-100 pl-1.5 rounded-sm"
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
