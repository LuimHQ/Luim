import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="bg-muted z-10 h-14 w-full fixed top-0">
            <div className="flex justify-center items-center h-full w-min pl-8 text-xl text-primary">
                <Link href="/">Luim</Link>
            </div>
        </div>
    );
};

export default Navbar;
