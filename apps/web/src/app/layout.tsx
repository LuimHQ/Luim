import '@styles/globals.css';
import { Metadata } from 'next';
// include styles from the ui package
import 'ui/styles.css';
import Navbar from '@components/Navbar';
import { FilesContextProvider } from '@contexts/FilesContext';
import { ThemeProvider } from '@components/ui/ThemeProvider';
import { Space_Mono } from 'next/font/google';
import { UiContextProvider } from '@contexts/uiContext';

// If loading a variable font, you don't need to specify the font weight
const space_mono = Space_Mono({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

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
            <body
                className={`flex flex-col dark w-full ${space_mono.className} no-scrollbar overflow-hidden h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UiContextProvider>
                        <Navbar></Navbar>
                        <div className="pt-12 w-full h-full">
                            <FilesContextProvider>
                                {children}
                            </FilesContextProvider>
                        </div>
                    </UiContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
