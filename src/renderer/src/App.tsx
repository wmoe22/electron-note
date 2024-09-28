import { Button, Input } from 'antd'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef, useState } from 'react'
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai'
import Content from './components/Content'
import FloatingNoteTitle from './components/FloatingNoteTitle'
import MarkDownEditor from './components/MarkDownEditor'
import NotePreviewList from './components/NotePreviewList'
import RootLayout from './components/RootLayout'
import { Sidebar } from './components/Sidebar'
import { createEmptyNoteAtom, deleteNoteAtom, notesAtom } from './store'

function App() {
  const [position, setPosition] = useState<'start' | 'end'>('end')
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)
  const notes = useAtomValue(notesAtom)
  const { Search } = Input

  console.log(notes, 'notes')

  const handleCreate = async () => {
    await createEmptyNote()
  }
  const handleDelete = async () => {
    await deleteNote()
  }

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <RootLayout>
        <Sidebar className="p-2">
          <section className="flex justify-between items-center">
            <Button onClick={handleCreate} color="primary" variant="solid">
              <AiFillFileAdd />
            </Button>

            <Button onClick={handleDelete} color="danger" variant="solid">
              <AiFillDelete />
            </Button>
          </section>
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="">
          <FloatingNoteTitle className="pt-2" />
          <MarkDownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
