'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, glow = false, children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-warmano-orange focus:ring-offset-2 focus:ring-offset-warmano-black
      active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
      relative overflow-hidden
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-warmano-orange to-warmano-orange-dark text-white
        hover:from-warmano-orange-dark hover:to-warmano-orange
        hover:shadow-lg hover:shadow-warmano-orange/30
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
      `,
      secondary: `
        bg-transparent border-2 border-warmano-gray-600 text-warmano-white
        hover:border-warmano-orange hover:text-warmano-orange
        hover:shadow-lg hover:shadow-warmano-orange/10
      `,
      ghost: `
        bg-transparent text-warmano-gray-300
        hover:text-warmano-orange hover:bg-warmano-gray-800/50
      `,
    }

    const sizes = {
      sm: 'px-4 py-2.5 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2',
    }

    const glowStyles = glow
      ? 'shadow-glow-orange hover:shadow-glow-orange-lg'
      : ''

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Laden...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
