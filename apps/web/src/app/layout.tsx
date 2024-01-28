import "@styles/globals.css";
import "@mdxeditor/editor/style.css";
import { Metadata } from "next";
import Navbar from "@components/Navbar";
import { FilesContextProvider } from "@contexts/FilesContext";
import { ThemeProvider } from "@components/ui/ThemeProvider";
import { Space_Mono } from "next/font/google";
import { UiContextProvider } from "@contexts/uiContext";
import { AuthContextProvider } from "@contexts/AuthContext";

// If loading a variable font, you don't need to specify the font weight
export const space_mono = Space_Mono({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

const metadata: Metadata = {
    title: "Luim-Knowledge at space",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="">
            <body
                className={`flex flex-col w-screen h-screen bg-background ${space_mono.className} overflow no-scrollbar`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UiContextProvider>
                        <FilesContextProvider>
                            <AuthContextProvider>
                                <Navbar></Navbar>
                                <div className="flex flex-col w-full h-full">
                                    {children}
                                </div>
                            </AuthContextProvider>
                        </FilesContextProvider>
                    </UiContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
