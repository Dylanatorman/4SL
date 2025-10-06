import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          'bg-brand-primary text-white': variant === 'default',
          'bg-brand-accent/20 text-brand-primary': variant === 'secondary',
          'border border-brand-primary text-brand-primary': variant === 'outline',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-orange-100 text-orange-800': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
