'use client';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/Input';
import React, { useState } from 'react';

const SpaceSignInUp = () => {
    const handleFormSubmit = () => {};
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '',
        userName: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div className="">
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-full max-w-sm gap-3"
            >
                {isSignup ? (
                    <div className="flex flex-col gap-3">
                        <Input
                            type="text"
                            placeholder="Username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        ></Input>
                        <Input
                            type="Email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        ></Input>
                    </div>
                ) : (
                    <Input
                        type="text"
                        placeholder="Username or Email"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                    ></Input>
                )}
                <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                ></Input>
                <Button
                    variant="default"
                    size="lg"
                    className="w-fit mt-4 mb-4"
                    type="submit"
                >
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Button>
            </form>
            <Button
                className="p-0 text-primary/50 hover:text-primary focus:ring-transparent focus-visible:ring-0"
                variant={'link'}
                onClick={() => {
                    setIsSignup(!isSignup);
                }}
            >
                {!isSignup
                    ? 'New here? Sign up!'
                    : 'Good to see you again! Sign in.'}
            </Button>
        </div>
    );
};

export default SpaceSignInUp;
