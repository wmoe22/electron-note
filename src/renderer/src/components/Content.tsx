import { cn } from '@renderer/utils'
import { ComponentProps, forwardRef } from 'react'

const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn('flex-1 border border-l-gray-600 overflow-auto', className)}
      {...rest}
    >
      {children}
    </div>
  )
})

export default Content
Content.displayName = 'Content'
