'use client';
import { FilesContext } from '@contexts/FilesContext';
import React, { useContext, useEffect, useState } from 'react';
const Home = () => {
    const { files } = useContext(FilesContext);
    return (
        <div className="mt-16 flex flex-col gap-2 cursor-pointer">
            <div className="bg-primary-foreground px-3 py-2 rounded-sm w-fit">
                File count: {files ? files.length : 0}
            </div>
            {files &&
                files.map((item) => (
                    <div
                        key={item.webkitRelativePath}
                        className="p-4 bg-white bg-opacity-20 flex flex-col"
                    >
                        <div>Relative path: {item.webkitRelativePath}</div>
                        <div>Size: {item.size}</div>
                    </div>
                ))}
        </div>
    );
};

export default Home;
