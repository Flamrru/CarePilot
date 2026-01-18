import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants using class-variance-authority
 * Designed with subtle depth and smooth transitions
 */
const buttonVariants = cva(
  // Base styles - shared across all variants
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm',
    'rounded-xl',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'shadow-md shadow-primary-500/25',
          'hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30',
          'focus-visible:ring-primary-500',
        ],
        secondary: [
          'bg-slate-100 text-slate-900',
          'dark:bg-slate-800 dark:text-slate-100',
          'shadow-sm',
          'hover:bg-slate-200 hover:shadow-md',
          'dark:hover:bg-slate-700',
          'focus-visible:ring-slate-400',
        ],
        danger: [
          'bg-danger-500 text-white',
          'shadow-md shadow-danger-500/25',
          'hover:bg-danger-600 hover:shadow-lg hover:shadow-danger-500/30',
          'focus-visible:ring-danger-500',
        ],
        ghost: [
          'bg-transparent text-slate-600',
          'dark:text-slate-400',
          'hover:bg-slate-100 hover:text-slate-900',
          'dark:hover:bg-slate-800 dark:hover:text-slate-100',
          'focus-visible:ring-slate-400',
        ],
        success: [
          'bg-success-500 text-white',
          'shadow-md shadow-success-500/25',
          'hover:bg-success-600 hover:shadow-lg hover:shadow-success-500/30',
          'focus-visible:ring-success-500',
        ],
        warning: [
          'bg-warning-500 text-white',
          'shadow-md shadow-warning-500/25',
          'hover:bg-warning-600 hover:shadow-lg hover:shadow-warning-500/30',
          'focus-visible:ring-warning-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg', // For elderly-friendly touch targets
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner */
  isLoading?: boolean
  /** Icon to display before text */
  leftIcon?: React.ReactNode
  /** Icon to display after text */
  rightIcon?: React.ReactNode
}

/**
 * Primary button component for CarePilot
 *
 * @example
 * // Primary action
 * <Button variant="primary">Besuch starten</Button>
 *
 * // Danger action with icon
 * <Button variant="danger" leftIcon={<AlertIcon />}>Notfall melden</Button>
 *
 * // Large touch-friendly button for patient app
 * <Button size="xl">Ich brauche Hilfe</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
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
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
