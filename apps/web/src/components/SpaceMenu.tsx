'use client';
import React, { useContext } from 'react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaFolderPlus, FaFolderOpen } from 'react-icons/fa';
import { FilesContext } from '@contexts/FilesContext';
const iconStyle = 'w-24 h-24 text-muted-foreground';
const menuOptions = [
    {
        title: 'Open or create a new space',
        subTitle: "We'll store all your thoughts here",
        icon: <FaFolderPlus className={iconStyle} />,
    },
];

const SpaceMenu = () => {
    const { files, setFiles } = useContext(FilesContext);
    const ref = useRef(null); // To ref the input element
    const router = useRouter();

    // Setting webKitDirectory and directory property
    useEffect(() => {
        if (ref.current != null) {
            ref.current.setAttribute('directory', '');
            ref.current.setAttribute('webKitDirectory', '');
        }
    }, [ref]);

    // on clicking the select folder div, the input element will be clicked
    // also
    const handleSelectFolder = async () => {
        ref.current.click();
    };

    // e.target.files is an object of type FileList
    const listFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesArray = [...e.target.files];
        setFiles([...filesArray]);
        router.push('/home');
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                {menuOptions.map((item) => (
                    <button
                        onClick={handleSelectFolder}
                        key={item.title}
                        className="duration-100 ease-linear cursor-pointer  hover:bg-slate-900 rounded-3xl p-8 bg-secondary flex flex-row justify-center items-center gap-8"
                    >
                        <input
                            className="hidden"
                            type="file"
                            ref={ref}
                            onChange={(e) => {
                                // If user choose folder, allows to upload it
                                // we'll list files
                                listFiles(e);
                            }}
                        />
                        <div>{item.icon}</div>
                        <div className="text-left">
                            <h1 className="text-xl text-primary font-bold">
                                {item.title}
                            </h1>
                            <h4 className="text-base text-muted-foreground">
                                {item.subTitle}
                            </h4>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpaceMenu;
