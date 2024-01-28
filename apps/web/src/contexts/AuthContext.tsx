'use client';
import { SupabaseClient, User, UserResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { createContext, ReactNode, useEffect, useState } from 'react';
import React from 'react';

export type FormData = {
    userName: string;
    email: string;
    password: string;
};

export interface AuthContextType {
    user: User | null;
    signInWithEmail: (
        formData: FormData
    ) => Promise<{ user: User | null; error: Error | null }>;
    signUpNewUser: (
        formData: FormData
    ) => Promise<{ user: User | null; error: Error | null }>;
    signOut: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const checkAuthStatus = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);

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
                    emailRedirectTo:
                        'http://localhost:3000/home/email_verified',
                },
            });
            if (error) {
                console.error('Error signing in:', error.message);
                return { user: null, error };
            }
            if (!data.user?.confirmed_at) {
                return {
                    user: null,
                    error: new Error('Please verify your email address!'),
                };
            }
            return { user: data.user, error: null };
        } catch (error) {
            console.error('Error signing up:', error.message);
            return { user: null, error };
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
            if (error) {
                console.error('Error signing in:', error.message);
                return { user: null, error };
            }
            setUser(data.user);
            return { user: data.user, error: null };
        } catch (error) {
            console.error('Error signing in:', error.message);
            return { user: null, error };
        }
    }

    // Sign out user
    async function signOut() {
        try {
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }
    const value: AuthContextType = {
        user,
        signInWithEmail,
        signUpNewUser,
        signOut,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signInWithEmail,
                signUpNewUser,
                signOut,
                checkAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
