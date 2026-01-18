import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Input variants
 */
const inputVariants = cva(
  [
    'flex w-full',
    'rounded-xl',
    'text-sm',
    'transition-all duration-200 ease-out',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Remove native styling
    'appearance-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-700',
          'text-slate-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
          'hover:border-slate-300 dark:hover:border-slate-600',
        ],
        filled: [
          'bg-slate-100 dark:bg-slate-800',
          'border border-transparent',
          'text-slate-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-slate-900',
          'hover:bg-slate-200/70 dark:hover:bg-slate-700/70',
        ],
        ghost: [
          'bg-transparent',
          'border border-transparent',
          'text-slate-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
        ],
      },
      inputSize: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-5 text-lg', // For elderly-friendly touch targets
      },
      state: {
        default: '',
        error: [
          'border-danger-500 dark:border-danger-500',
          'focus:ring-danger-500/20 focus:border-danger-500',
          'text-danger-900 dark:text-danger-400',
        ],
        success: [
          'border-success-500 dark:border-success-500',
          'focus:ring-success-500/20 focus:border-success-500',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display at the start */
  leftIcon?: React.ReactNode
  /** Icon or button to display at the end */
  rightIcon?: React.ReactNode
  /** Error message to display */
  error?: string
  /** Helper text below input */
  helperText?: string
}

/**
 * Input component with icon support and validation states
 *
 * @example
 * // Basic input
 * <Input placeholder="Name eingeben" />
 *
 * // With icon and error state
 * <Input
 *   leftIcon={<SearchIcon />}
 *   state="error"
 *   error="Ungültige Eingabe"
 * />
 *
 * // Large touch-friendly input for patient app
 * <Input inputSize="xl" placeholder="Ihr Blutdruck" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      state,
      leftIcon,
      rightIcon,
      error,
      helperText,
      type,
      ...props
    },
    ref
  ) => {
    const hasError = state === 'error' || !!error

    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({
                variant,
                inputSize,
                state: hasError ? 'error' : state,
                className,
              }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              hasError
                ? 'text-danger-600 dark:text-danger-400'
                : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

/**
 * Textarea variant for multi-line input
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Variant style */
  variant?: 'default' | 'filled' | 'ghost'
  /** Error state */
  error?: string
  /** Helper text */
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, helperText, ...props }, ref) => {
    const hasError = !!error

    const variantClasses = {
      default: [
        'bg-white dark:bg-slate-900',
        'border border-slate-200 dark:border-slate-700',
        'focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
        'hover:border-slate-300 dark:hover:border-slate-600',
      ],
      filled: [
        'bg-slate-100 dark:bg-slate-800',
        'border border-transparent',
        'focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-slate-900',
      ],
      ghost: [
        'bg-transparent',
        'border border-transparent',
        'focus:ring-2 focus:ring-primary-500/20',
        'hover:bg-slate-100 dark:hover:bg-slate-800',
      ],
    }

    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex w-full min-h-[120px] px-4 py-3',
            'rounded-xl',
            'text-sm text-slate-900 dark:text-white',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'transition-all duration-200 ease-out',
            'focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-none',
            variantClasses[variant],
            hasError && 'border-danger-500 focus:ring-danger-500/20 focus:border-danger-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              hasError
                ? 'text-danger-600 dark:text-danger-400'
                : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea, inputVariants }
