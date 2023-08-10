import { useState } from 'react';
import { Button, Card } from 'ui';
import SpaceMenu from '@components/SpaceMenu';

export default function Home() {
    return (
        <div className="flex h-full flex-col items-center justify-center py-2">
            <SpaceMenu></SpaceMenu>
        </div>
    );
}
