"use client";
import Link from "next/link";
import { ModeToggle } from "@components/ui/ModeToggle";
import { RiMenu2Fill } from "react-icons/ri";
import { Button } from "@components/ui/button";
import { useContext, useEffect, useState } from "react";
import { UiContext } from "@contexts/uiContext";
import { FilesContext } from "@contexts/FilesContext";
import { FaUser } from "react-icons/fa";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { supabase } from "@lib/supabaseClient";
import { UserResponse } from "@supabase/supabase-js";
import { AuthContext } from "@contexts/AuthContext";

const Navbar = () => {
    const [signedInUser, setSignedInUser] = useState<UserResponse>();
    const authProvider = useContext(AuthContext);
    // Sign out user
    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }
    useEffect(() => {
        const getUserInfo = async () => {
            authProvider?.checkAuthStatus();
        };
        getUserInfo();
    }, []);
    const contextObj = useContext(UiContext);
    const fileContextObj = useContext(FilesContext);
    return (
        <div className="flex flex-row justify-between items-center px-4 bg-secondary/30 z-10 h-12 py-1 max-w-full sticky top-0 border-b-2 border-b-secondary">
            <div className="flex flex-row gap-4 justify-center items-center h-full w-min text-xl text-primary">
                <Button
                    variant="ghost"
                    onClick={() => {
                        contextObj?.setSidebarOpen(!contextObj?.sidebarOpen);
                    }}
                >
                    <RiMenu2Fill className="w-4 h-4 text-primary" />
                </Button>
                <Link href="/" className="no-underline text-primary">
                    Luim
                </Link>
            </div>
            <div className="text-primary">
                {fileContextObj?.currFile?.getName()}
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
                {authProvider?.user ? (
                    <div className="">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="w-6 h-6 p-2 flex justify-center items-center overflow-hidden cursor-pointer">
                                    <FaUser className="w-10 h-10 text-primary/70" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="border-primary/60">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            {"Hi, " +
                                                authProvider?.user
                                                    ?.user_metadata?.userName}
                                        </div>
                                        <div>{authProvider?.user?.email}</div>
                                    </div>
                                    <Button
                                        onClick={async () => {
                                            await authProvider?.signOut();
                                        }}
                                        variant={"destructive"}
                                        className="gap-4 w-full"
                                    >
                                        <FaSignOutAlt className="w-6 h-6" />
                                        Sign out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : null}
                <ModeToggle></ModeToggle>
            </div>
        </div>
    );
};

export default Navbar;
