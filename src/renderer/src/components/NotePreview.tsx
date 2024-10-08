import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/types'
import { ComponentProps } from 'react'
import { AiFillPushpin } from 'react-icons/ai'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  return (
    <div
      className={cn(
        'cursor-pointer  px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-blue-500 transition-colors': isActive,
          'hover:bg-blue-400/30': !isActive
        },
        className
      )}
      {...props}
    >
      <div className="flex items-center bg-green-400 rounded-xl px-2 w-fit gap-1 ml-auto">
        <small className="text-white">Pinned</small>
        <AiFillPushpin size={14} className="text-white" />
      </div>
      <h3 className="mb-1 truncate font-light text-white ">{title}</h3>
      <span className="inline-block text-white  w-full mb-2 text-xs font-light text-left">
        {date}
      </span>
    </div>
  )
}

export default NotePreview
