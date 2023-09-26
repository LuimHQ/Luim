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
    getName(): string {
        return this.name;
    }
}

export default FileSystemItem;
