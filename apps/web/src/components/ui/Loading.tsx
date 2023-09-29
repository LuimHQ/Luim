'use-client';
import React, { useEffect, useState } from 'react';
import { Progress } from '@components/ui/progress';

const Loading = ({ progress, text = 'Loading' }) => {
    console.log('Progress here: ', progress);
    return (
        <div>
            <Progress value={progress} className="w-[60%]"></Progress>
            <div>{text}</div>
        </div>
    );
};

export default Loading;
