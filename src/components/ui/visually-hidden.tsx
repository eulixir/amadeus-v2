import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function VisuallyHidden({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        className
      )}
      {...props}
    />
  )
}

export { VisuallyHidden }
