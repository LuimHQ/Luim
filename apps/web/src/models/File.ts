import FileSystemItem from './FileSystemItem';

class File extends FileSystemItem {
    constructor(public name: string, handler: FileSystemFileHandle) {
        super(name, handler);
    }
}

export default File;
