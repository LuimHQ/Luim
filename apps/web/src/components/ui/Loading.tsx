"use-client";
import React, { useEffect, useState } from "react";
import { Progress } from "@components/ui/progress";

const Loading = ({
    progress,
    text = "Loading",
    className,
}: {
    progress: number;
    text: string;
    className?: string;
}) => {
    return (
        <div>
            <Progress
                value={progress}
                className={"w-full" + className}
            ></Progress>
            <div>{text}</div>
        </div>
    );
};

export default Loading;
