import { selectedNoteAtom } from '@renderer/store'
import { cn } from '@renderer/utils'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'

const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null
  return (
    <div className={cn(`flex justify-center bg-blue-500  p-1.5`, className)} {...props}>
      <p className="text-white ">{selectedNote.title}</p>
    </div>
  )
}

export default FloatingNoteTitle
