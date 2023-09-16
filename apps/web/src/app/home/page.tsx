'use client';
import { Input } from '@components/ui/Input';
import { FilesContext } from '@contexts/FilesContext';
import { FileContextValues } from '@contexts/FilesContext';
import React, { useContext, useEffect, useState } from 'react';
const Home = () => {
    const [searchKey, setSearchKey] = useState('');
    const fileObj = useContext(FilesContext);
    const [filtered, setFiltered] = useState(fileObj?.files);
    useEffect(() => {
        console.log('FileObj here: ', fileObj);
        setFiltered(
            fileObj?.files?.filter((item) =>
                item?.webkitRelativePath?.toLowerCase().match(searchKey)
            )
        );
    }, [searchKey]);
    return (
        <div className="flex flex-row">
            <div className="mt-16 flex flex-col gap-2 cursor-pointer w-96 h-full">
                <div>
                    <Input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                            console.log(e.target.value);
                            setSearchKey(e.target.value);
                        }}
                    ></Input>
                </div>
                <div className="bg-primary-foreground px-3 py-2 rounded-sm">
                    File count: {filtered ? filtered.length : 0}
                </div>
                {filtered &&
                    filtered.map((item) => (
                        <div
                            key={item.webkitRelativePath}
                            className="w-full p-4 bg-white bg-opacity-20 flex flex-col overflow-x-scroll no-scrollbar"
                        >
                            <div className="h-full">
                                {item.webkitRelativePath}
                            </div>
                            <div>Size: {item.size}</div>
                        </div>
                    ))}
            </div>
            <div></div>
        </div>
    );
};

export default Home;
