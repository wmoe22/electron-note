import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from '@mdxeditor/editor'
import useMarkdownEditor from '@renderer/hooks/useMarkdownEditor'

const MarkDownEditor = () => {
  const { selectedNote, editorRef, handleBlur, handleAutoSaving } = useMarkdownEditor()
  if (!selectedNote) return null
  return (
    <MDXEditor
      key={selectedNote.title}
      ref={editorRef}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none text-gray-100 min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:text-gray-100 prose-p:leading-relaxed prose-headings:my-4 prose-headings:text-gray-100 prose-blockquote:my-4 prose-blockquote:text-gray-100 prose-ul:my-2 prose-ul:text-gray-100 prose-li:my-0 prose-li:text-gray-100 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] bg-[#1e1e1e]backdrop-blur-lg rounded-tl-md"
    />
  )
}

export default MarkDownEditor
