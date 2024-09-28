import { useNotesList } from '@renderer/hooks/useNotesList'
import { cn } from '@renderer/utils'
import { GetProps, Input } from 'antd'
import React, { ComponentProps, useState } from 'react'
import NotePreview from './NotePreview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })
  const [searchQuery, setSearchQuery] = useState('')

  type SearchProps = GetProps<typeof Input.Search>

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!filteredNotes) return null

  const { Search } = Input

  return (
    <ul className={className} {...props}>
      <Search
        placeholder="input search text"
        size="large"
        value={searchQuery}
        onChange={onChange}
      />
      {filteredNotes.length > 0 ? (
        filteredNotes.map((n, index) => (
          <NotePreview
            {...n}
            key={n.title + n.lastEditTime}
            isActive={selectedNoteIndex === index}
            onClick={handleNoteSelect(index)}
          />
        ))
      ) : (
        <ul className={cn('text-center  pt-4', className)} {...props}>
          <span className="text-white">No Notes Yet!</span>
        </ul>
      )}
    </ul>
  )
}

export default NotePreviewList
