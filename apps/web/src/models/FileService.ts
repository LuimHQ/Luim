import File from '@models/File';

class FileService {
    static async openFile(file: File): Promise<string> {
        let fileHandle = file.getHandler() as FileSystemFileHandle;
        let currentFile = await fileHandle.getFile();
        const contents = await currentFile.text();
        // console.log(contents);
        return contents;
    }
    static async saveFile(file: File, contents: string) {
        let fileHandle = file.getHandler() as any;
        const writeable = await fileHandle.createWritable();
        await writeable.write(contents);
        await writeable.close();
    }
    static async renameFile(file: File, new_name: string) {
        let fileHandle = file.getHandler() as any;
        await fileHandle.move(new_name);
    }
}

export default FileService;

