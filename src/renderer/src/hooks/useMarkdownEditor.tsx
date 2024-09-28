import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { NoteContent } from '@shared/types'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.log(`Auto saving:`, selectedNote.title)

      await saveNote(content)
    },
    2500,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    if (content != null) {
      await saveNote(content)
    }
  }
  return {
    editorRef,
    handleAutoSaving,
    handleBlur,
    selectedNote
  }
}

export default useMarkdownEditor
