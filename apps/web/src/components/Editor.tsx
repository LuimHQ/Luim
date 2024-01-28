'use client'
import '@mdxeditor/editor/style.css';
import { useContext, type ForwardedRef } from 'react'; 

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
	linkPlugin, 
	tablePlugin, 
	InsertTable, 
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
	frontmatterPlugin,
	InsertFrontmatter,
    BlockTypeSelect,
    imagePlugin, 
    InsertImage

} from '@mdxeditor/editor'
import FileSystemItem from '@models/FileSystemItem';
import { FilesContext, FilesContextProvider } from '@contexts/FilesContext';

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
			initialSnippetContent: ''
		},
	]
}



export default function InitializedMDXEditor({
	editorRef,
	...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
	const contextObj = useContext(FilesContext);
	
	return (
		<MDXEditor
			className="dark-theme"
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				
				linkPlugin(),
				linkDialogPlugin({
					
				}), 
				tablePlugin(), 
				frontmatterPlugin(), 
				imagePlugin({
					imageUploadHandler: (image: File) => {
						return Promise.resolve(image.name);
					},
				}), 
				codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
				sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
				codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', cpp: 'c++', python: 'python'} }), 
				diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }), 
				toolbarPlugin({
					toolbarContents: () => (
						<>
							
							<BoldItalicUnderlineToggles />
                            <CreateLink />
                            <InsertImage />
							<CodeToggle />
							<InsertTable />
							<InsertThematicBreak /> 
							<ListsToggle />
							<InsertFrontmatter />
							<BlockTypeSelect />
							<ConditionalContents
								options={[
									{ when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
									{ when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
									{
										fallback: () => (<>
											<InsertCodeBlock />
											<InsertSandpack />
										</>)
									}
								]}
							/>
							<DiffSourceToggleWrapper>
								<UndoRedo />
							</DiffSourceToggleWrapper>
						</>
					)
				})
			]}
			{...props}
			ref={editorRef}
		/>
	)
}