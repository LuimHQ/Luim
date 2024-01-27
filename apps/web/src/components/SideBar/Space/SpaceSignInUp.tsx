"use client";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/Input";
import { supabase } from "@lib/supabaseClient";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, FormData } from "@contexts/AuthContext";
import Loading from "@components/ui/Loading";

type PassWordStatus = {
    length: boolean;
    specialCharacters: boolean;
    digits: boolean;
    upperLowerCase: boolean;
};

// List of password rules
const passwordRules = [
    { key: "length", text: "At least 6 characters" },
    { key: "specialCharacters", text: "Contains special characters" },
    { key: "digits", text: "Contains digits" },
    {
        key: "upperLowerCase",
        text: "Contains both upper and lowercase letters",
    },
];

// Supabase auth function to sign up
async function signUpNewUser(formData: FormData) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    userName: formData.userName,
                },
                emailRedirectTo: "http://localhost:3000/home/email_verified",
            },
        });
        if (data) {
            console.log("Signed up Successfully: ", data);
        }
    } catch (error) {
        console.error("Sign up issue: ", error);
    }
}

// Supabase auth function to sign in
async function signInWithEmail(formData: FormData) {
    console.log(formData);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
        if (data) console.log("Signed in Successfully: ", data);
    } catch (error) {
        console.error("Sign in issue: ", error);
    }
}

const SpaceSignInUp = () => {
    const authProvider = useContext(AuthContext);
    // Show password
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    // To know the state of the form
    const [isSignup, setIsSignup] = useState<Boolean>(false);

    // states defining the password rules to check
    const [passwordStatus, setPasswordStatus] = useState<PassWordStatus>({
        length: false,
        upperLowerCase: false,
        digits: false,
        specialCharacters: false,
    });

    // To store form information
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        password: "",
    });

    // Check password status at each change
    useEffect(() => {
        checkPasswordStatus();
    }, [formData.password]);

    // Storing form information in state on change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit for sign in and sign up
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
            const response = await authProvider?.signUpNewUser(formData);
            console.log("Response after auth provider signup: ", response);
        } else {
            const response = await authProvider?.signInWithEmail(formData);
            console.log("Response after auth provider signin: ", response);
        }
    };

    // Will check provided password agiainst the defined rules
    const checkPasswordStatus = () => {
        let password: string = formData.password;
        // Example password-checking logic
        setPasswordStatus((prevData) => ({
            ...prevData,
            length: password.length >= 6,
            specialCharacters: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
                password
            ),
            digits: /\d/.test(password),
            upperLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
        }));
    };
    return (
        <div className="">
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-full max-w-sm gap-3"
            >
                {isSignup ? (
                    <Input
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    ></Input>
                ) : null}
                <Input
                    type="Email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                ></Input>
                <div>
                    <div className="grid grid-cols-7 items-center gap-2">
                        <div className="col-start-1 col-span-6">
                            <Input
                                type={!showPassword ? "password" : "text"}
                                name="password"
                                placeholder="password (at least 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                                className=""
                            ></Input>
                        </div>
                        <div className="w-full h-full">
                            <Button
                                className="w-full h-full"
                                variant="outline"
                                size="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                }}
                            >
                                {showPassword ? (
                                    <AiFillEye className="h-6 w-6 text-primary/70" />
                                ) : (
                                    <AiFillEyeInvisible className="h-6 w-6 text-primary/70" />
                                )}
                            </Button>
                        </div>
                    </div>
                    {formData.password && isSignup ? (
                        <div className="p-4 bg-secondary/40 rounded-lg mt-4 flex flex-col gap-2">
                            <div className="flex flex-row justify-between text-sm">
                                <div>Weak</div>
                                <div>Strong</div>
                            </div>
                            <Loading
                                progress={
                                    Object.values(passwordStatus).filter(
                                        (value) => value
                                    ).length * 25
                                }
                                text=""
                            ></Loading>
                        </div>
                    ) : null}
                </div>
                <Button
                    variant={"default"}
                    size="lg"
                    className="w-fit mt-4 mb-4"
                    disabled={
                        isSignup &&
                        formData.password.length < 6 &&
                        Object.values(passwordStatus).filter((value) => value)
                            .length < 2
                    }
                    type="submit"
                >
                    {isSignup ? "Sign up" : "Sign in"}
                </Button>
            </form>
            <Button
                className="p-0 text-primary/50 hover:text-primary focus:ring-transparent focus-visible:ring-0"
                variant={"link"}
                onClick={() => {
                    setIsSignup(!isSignup);
                }}
            >
                {!isSignup
                    ? "New here? Sign up!"
                    : "Good to see you again! Sign in."}
            </Button>
        </div>
    );
};

export default SpaceSignInUp;
