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
const Home = () => {
    const contextObj = useContext(FilesContext);

    const [toolOptions, setToolOptions] = useState([1, 0]);
    const [query, setQuery] = useState('');
    let entries = [];
    const [files, setFiles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        const folder = contextObj?.rootFolder;
        recur(folder, entries, setFiles).then(() => {
            console.log(entries);
            setFiles([...entries]);
        });
    }, [contextObj?.rootFolder]);

    useEffect(() => {
        setFiltered(
            files?.filter((item: FileSystemItem) =>
                item?.getName().toLowerCase().match(query.toLowerCase())
            )
        );
    }, [query]);
    return (
        <div className="flex flex-col mt-20 w-72 gap-4">
            <div className="flex flex-row ml-8 gap-2 bg-muted p-2 rounded-sm transition-all">
                <div
                    className={`bg-transparent flex justify-center items-center w-8 h-8 hover:bg-slate-200 rounded-[8px] p-1 hover:text-background cursor-pointer  duration-100 ${
                        toolOptions[0]
                            ? 'bg-slate-400 text-background'
                            : 'bg-transparent'
                    }`}
                    onClick={() => {
                        setToolOptions([1, 0]);
                    }}
                >
                    <CiFolderOn className="w-8 h-8" />
                </div>
                <div
                    className={`flex justify-center items-center ${
                        toolOptions[1]
                            ? 'bg-slate-400 text-background'
                            : 'bg-transparent'
                    } w-8 h-8 hover:bg-slate-200 rounded-[8px] p-1 hover:text-background cursor-pointer  duration-100`}
                    onClick={() => {
                        setToolOptions([0, 1]);
                    }}
                >
                    <CiSearch className="w-8 h-8" />
                </div>
            </div>
            <div
                className={`ml-8 ${
                    toolOptions[1] ? 'flex flex-col' : 'hidden'
                }`}
            >
                <div>
                    <Input
                        type="text"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                <div className="mt-4">
                    {filtered.map((item: FileSystemItem, index) => (
                        <div key={index} className="">
                            <FileCmp file={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${toolOptions[0] ? 'flex' : 'hidden'}`}>
                <FileTreeData />
            </div>
            <div></div>
        </div>
    );
};

export default Home;
