import '../styles/globals.css';
// include styles from the ui package
import 'ui/styles.css';
import Navbar from '../components/Navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="">
            <body className="dark w-full h-screen">
                <Navbar></Navbar>
                {children}
            </body>
        </html>
    );
}
