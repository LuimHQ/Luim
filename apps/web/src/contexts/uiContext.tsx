'use client';
import { createContext, useState } from 'react';
import React from 'react';

export type UiContextValues = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export const UiContext = createContext<UiContextValues | null>(null);
export const UiContextProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <UiContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </UiContext.Provider>
    );
};
