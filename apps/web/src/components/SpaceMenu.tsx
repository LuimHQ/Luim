import { FaFolderPlus, FaFolderOpen } from 'react-icons/fa';
type SpaceMenu = {
    text: string;
};

const iconStyle = 'w-24 h-24 text-muted-foreground';
const menuOptions = [
    {
        title: 'Create new space',
        subTitle: "We'll store all your thoughts here",
        icon: <FaFolderPlus className={iconStyle} />,
    },
    {
        title: 'Open space',
        subTitle: 'Open an already existing space.',
        icon: <FaFolderOpen className={iconStyle} />,
    },
];
const SpaceMenu = () => {
    return (
        <div>
            <div className="flex gap-8">
                {menuOptions.map((item) => (
                    <div
                        key={item.title}
                        className="cursor-pointer rounded-3xl p-8 bg-secondary flex flex-col justify-center items-center"
                    >
                        <div>{item.icon}</div>
                        <h1 className="text-2xl text-primary font-bold">
                            {item.title}
                        </h1>
                        <h4 className="text-base text-muted-foreground">
                            {item.subTitle}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpaceMenu;
