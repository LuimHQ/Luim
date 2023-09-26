import FileSystemItem from './FileSystemItem';

class Folder extends FileSystemItem {
    private children: FileSystemItem[] = [];
    constructor(public name: string, handler: FileSystemDirectoryHandle) {
        super(name, handler);
    }

    addChild(item: FileSystemItem): void {
        this.children.push(item);
    }

    removeChild(item: FileSystemItem): void {
        // implement later
    }

    getChildren(): FileSystemItem[] {
        return this.children;
    }
}

export default Folder;
