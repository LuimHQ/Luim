import { Metadata } from 'next';
import { Button, Card } from 'ui';
import SpaceMenu from '../components/SpaceMenu';

const CARD_CONTENT = [
    {
        title: 'Setup personal space',
        href: 'https://turbo.build/repo/docs/core-concepts/caching',
        cta: 'Read More',
    },
    {
        title: 'Open an existing space',
        href: 'https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks',
        cta: 'Read More',
    },
];

export const metadata: Metadata = {
    title: 'Luim-Knowledge at space',
};

export default function Home() {
    return (
        <div className="flex h-full flex-col items-center justify-center py-2">
            <SpaceMenu></SpaceMenu>
        </div>
    );
}
