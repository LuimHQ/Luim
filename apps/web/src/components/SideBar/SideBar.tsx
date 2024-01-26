'use client';
import FileTreeData from '@components/FileTreeData';
import { Input } from '@components/ui/Input';
import { FilesContext } from '@contexts/FilesContext';
import { CiFolderOn, CiSearch } from 'react-icons/ci';
import { BsBoundingBoxCircles } from 'react-icons/bs';
import { LuSearch } from 'react-icons/lu';
import React, { useContext, useEffect, useState } from 'react';
import FileCmp from '@components/FileCmp';
import FileSystemItem from '@models/FileSystemItem';
import { UiContext } from '@contexts/uiContext';
import SideBarOption from './SideBarOption';
import { space_mono } from '../../app/layout';
import SideSpace from './Space/SideSpace';
const recur = async (folder, entries, setFiles) => {
    const children = await folder.getChildren();
    // console.log('Children of ', folder.name, ' ', children);
    for (const entry of children) {
        if (entry.getHandler().kind == 'directory') {
            await recur(entry, entries, setFiles);
        } else {
            entries.push(entry);
        }
    }
};
const SideBar = () => {
    const uiContextObj = useContext(UiContext);
    const fileContextObj = useContext(FilesContext);
    let entries = [];
    const [toolOptions, setToolOptions] = useState([1, 0, 0]);
    const [query, setQuery] = useState('');
    const [files, setFiles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        if (fileContextObj?.rootFolder) {
            const folder = fileContextObj?.rootFolder;
            recur(folder, entries, setFiles).then(() => {
                console.log(entries);
                setFiles([...entries]);
            });
        }
    }, [fileContextObj?.rootFolder]);
    useEffect(() => {
        setFiltered(
            files?.filter((item: FileSystemItem) =>
                item?.getName().toLowerCase().match(query.toLowerCase())
            )
        );
    }, [query]);

    return (
        <div
            className={`flex flex-col gap-4 h-full pt-4 px-4 min-w-3xl bg-secondary/30 resize-x `}
        >
            {fileContextObj?.rootFolder ? (
                <div className="flex flex-col w-full gap-4 h-full">
                    {/* Side bar options: Folder, Search */}
                    <div className="flex flex-row max-w-full gap-2  p-2 bg-secondary/50 border border-dashed border-primary/20 rounded-lg transition-all">
                        {/* Folder */}
                        <SideBarOption
                            onClick={() => setToolOptions([1, 0, 0])}
                            toolOption={toolOptions[0]}
                        >
                            <CiFolderOn className="w-8 h-8" />
                        </SideBarOption>

                        {/* Search */}
                        <SideBarOption
                            onClick={() => setToolOptions([0, 1, 0])}
                            toolOption={toolOptions[1]}
                        >
                            <CiSearch className="w-8 h-8" />
                        </SideBarOption>

                        {/* Public spaces */}
                        <SideBarOption
                            onClick={() => setToolOptions([0, 0, 1])}
                            toolOption={toolOptions[2]}
                        >
                            <BsBoundingBoxCircles className="w-6 h-6" />
                        </SideBarOption>
                    </div>
                    {/* Folder option contents: Files */}
                    <div
                        className={`${
                            toolOptions[0] ? 'flex h-full' : 'hidden'
                        }`}
                    >
                        <FileTreeData />
                    </div>
                    {/* Search option contents: A search box and filtered data after searching */}
                    <div
                        className={`${
                            toolOptions[1]
                                ? 'flex flex-col min-w-full'
                                : 'hidden'
                        }`}
                    >
                        {/* Search box */}
                        <Input
                            type="text"
                            placeholder="Filter notes by title"
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                        />
                        {/* Filtered data */}
                        <div className="mt-4">
                            {filtered.map((item: FileSystemItem, index) => (
                                <div key={index} className="">
                                    <FileCmp file={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*Public space contents */}
                    <div
                        className={`${
                            toolOptions[2] ? 'flex h-full' : 'hidden'
                        }`}
                    >
                        <SideSpace />
                    </div>
                </div>
            ) : (
                <div className="text-primary p-6 flex flex-col gap-4 justify-center items-center text-center h-full">
                    <CiFolderOn className="w-16 h-16 text-primary/40" />
                    No folder selected! Select a folder to start!
                </div>
            )}
        </div>
    );
};

export default SideBar;
