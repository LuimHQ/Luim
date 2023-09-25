class FileSystemItem {
    constructor(
        public name: string,
        public handler: FileSystemFileHandle | FileSystemDirectoryHandle
    ) {
        this.name = name;
        this.handler = handler;
    }
    getHandler(): FileSystemFileHandle | FileSystemDirectoryHandle {
        return this.handler;
    }
}

export default FileSystemItem;
