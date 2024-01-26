'use client';
import '@mdxeditor/editor/style.css';
import type { ForwardedRef } from 'react';
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    linkDialogPlugin,
    CreateLink,
    CodeToggle,
    MDXEditor,
    InsertThematicBreak,
    ListsToggle,
    // links
    linkPlugin,
    // For Table
    tablePlugin,
    InsertTable,
    // custom
    // image
    InsertImage,
    imagePlugin,
    type MDXEditorMethods,
    type MDXEditorProps,
    ConditionalContents,
    InsertCodeBlock,
    InsertSandpack,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo,
    codeBlockPlugin,
    codeMirrorPlugin,
    sandpackPlugin,
    SandpackConfig,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    directivesPlugin,
    // Admotions
    AdmonitionDirectiveDescriptor,
    InsertAdmonition,
    // Frontmatter
    frontmatterPlugin,
    InsertFrontmatter,
    BlockTypeSelect,
    // Youtube
} from '@mdxeditor/editor';

const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'dark',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: '',
        },
    ],
};

export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            className="dark: dark-theme dark-editor h-max max-w-5xl"
            plugins={[
                directivesPlugin({
                    directiveDescriptors: [AdmonitionDirectiveDescriptor],
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                linkPlugin(),
                linkDialogPlugin({}),
                tablePlugin(),
                frontmatterPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        js: 'JavaScript',
                        css: 'CSS',
                        cpp: 'c++',
                        python: 'python',
                    },
                }),
                diffSourcePlugin({
                    diffMarkdown: 'An older version',
                    viewMode: 'rich-text',
                }),
                toolbarPlugin({
                    toolbarContents: () => (
                        <div className="flex flex-row p-1">
                            <BoldItalicUnderlineToggles />
                            <CreateLink />
                            <CodeToggle />
                            <InsertTable />
                            <InsertThematicBreak />
                            <ListsToggle />
                            <InsertAdmonition />
                            <InsertFrontmatter />
                            <BlockTypeSelect />
                            <ConditionalContents
                                options={[
                                    {
                                        when: (editor) =>
                                            editor?.editorType === 'codeblock',
                                        contents: () => (
                                            <ChangeCodeMirrorLanguage />
                                        ),
                                    },
                                    {
                                        when: (editor) =>
                                            editor?.editorType === 'sandpack',
                                        contents: () => <ShowSandpackInfo />,
                                    },
                                    {
                                        fallback: () => (
                                            <>
                                                <InsertCodeBlock />
                                                <InsertSandpack />
                                            </>
                                        ),
                                    },
                                ]}
                            />
                            <DiffSourceToggleWrapper>
                                <UndoRedo />
                            </DiffSourceToggleWrapper>
                        </div>
                    ),
                }),
            ]}
            {...props}
            ref={editorRef}
        />
    );
}
