'use client';
import { useState, useEffect, useContext } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { FilesContext } from '@contexts/FilesContext';
import FileService from '@models/FileService';
import FileSystemItem from '@models/FileSystemItem';

const MarkdownEditor: React.FC = () => {
    const contextObj = useContext(FilesContext);
    const openFile = async (file: FileSystemItem): Promise<string> => {
        let contents = await FileService.openFile(file);
        return contents;
        // console.log(contents);
    };
    const saveFile = async (file: FileSystemItem, contents: string) => {
        await FileService.saveFile(file, contents);
    };
    const contextObject = useContext(FilesContext);
    const [markdown, setMarkdown] = useState<string>('');
    useEffect(() => {
        if (
            contextObject?.currFile != null &&
            contextObj?.currFile != undefined
        ) {
            openFile(contextObj?.currFile).then((contents) => {
                setMarkdown(contents);
            });
        } else {
            setMarkdown('');
        }
    }, [contextObject?.currFile]);

    const handleEditorChange = ({ text }: { text: string }) => {
        setMarkdown(text);
        if (contextObj?.currFile !== null) {
            saveFile(contextObj?.currFile as FileSystemItem, text);
        }

        // FileService.saveFile()
    };

    const mdParser = new MarkdownIt();

    return (
        <div className="markdown-editor h-full bg-background">
            <MdEditor
                value={markdown}
                style={{ height: '100%' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default MarkdownEditor;
