import React, { useEffect } from 'react';
import File from '@models/File';

interface fileCmpProps {
    file: File;
    matched?: string;
}
const FileCmp: React.FC<fileCmpProps> = ({ file, matched }) => {
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
                className="w-full ml-8 text-base py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer"
                draggable={true}
            >
                {prefix}
                <span className="text-red-200">{match}</span>
                {suffix}
            </div>
        );
    } else
        return (
            <div className="w-full ml-8 text-base py-2 hover:bg-secondary duration-100 px-1.5 rounded-sm cursor-pointer">
                {name}
            </div>
        );
};

export default FileCmp;
