import { supabase } from '@lib/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';
import SpaceSignInUp from './SpaceSignInUp';
import { AuthContext } from '@contexts/AuthContext';
import SpaceHome from './SpaceHome';

const SideSpace = (props) => {
    const authProvider = useContext(AuthContext);
    useEffect(() => {
        if (authProvider?.user) {
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }, [authProvider?.user]);
    const [signedIn, setSignedIn] = useState(false);
    return (
        <div className="flex flex-col justify-start w-full py-8">
            {signedIn ? (
                <SpaceHome></SpaceHome>
            ) : (
                <div className="flex flex-col justify-start">
                    <SpaceSignInUp></SpaceSignInUp>
                </div>
            )}
        </div>
    );
};

export default SideSpace;
