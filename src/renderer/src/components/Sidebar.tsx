import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      {...props}
      className={cn('w-[250px] bg-[#1e1e1e]  h-[100vh + 10px] overflow-auto', className)}
    >
      {children}
    </aside>
  )
}
