import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main {...props} className={cn('flex flex-row h-screen', className)}>
      {children}
    </main>
  )
}

export default RootLayout
