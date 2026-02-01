import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'orange' | 'success' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-warmano-gray-800 text-warmano-gray-300',
    orange: 'bg-warmano-orange/10 text-warmano-orange border border-warmano-orange/20',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    outline: 'bg-transparent border border-warmano-gray-700 text-warmano-gray-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
