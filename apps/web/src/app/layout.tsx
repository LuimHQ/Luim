import '../styles/globals.css';
import { Metadata } from 'next';
// include styles from the ui package
import 'ui/styles.css';
import Navbar from '@components/Navbar';
import { FilesContextProvider } from '@contexts/FilesContext';

export const metadata: Metadata = {
    title: 'Luim-Knowledge at space',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="">
            <body className="dark w-full h-screen">
                <Navbar></Navbar>
                <FilesContextProvider>{children}</FilesContextProvider>
            </body>
        </html>
    );
}
