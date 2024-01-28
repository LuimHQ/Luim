import React from 'react';

const SideBarOption = (props) => {
    const { onClick, toolOption, children } = props;
    return (
        <div
            className={`flex justify-center items-center ${
                toolOption ? 'bg-slate-400 text-primary' : 'bg-transparent'
            } w-8 h-8 hover:bg-primary rounded-[8px] p-1 hover:text-background cursor-pointer transition-all  duration-200`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default SideBarOption;
