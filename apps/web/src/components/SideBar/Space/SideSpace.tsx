import React, { useState } from 'react';
import SpaceSignInUp from './SpaceSignInUp';

const SideSpace = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    return (
        <div className="flex flex-col justify-start w-full py-8">
            {signedIn ? (
                <div>Public space</div>
            ) : (
                <div className="flex flex-col justify-start">
                    <SpaceSignInUp></SpaceSignInUp>
                </div>
            )}
        </div>
    );
};

export default SideSpace;
