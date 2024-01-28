import { Button } from "@components/ui/button";
import React from "react";
import { GoVerified } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
const Email_verified = () => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-4">
            <GoVerified className="w-16 h-16 text-primary/80" />
            Your email is successfully verified!
            <Link href="/home">
                <Button className="flex flex-row gap-4">
                    Go back to app
                    <BsArrowRight className="w-8 h-8"></BsArrowRight>
                </Button>
            </Link>
        </div>
    );
};

export default Email_verified;
