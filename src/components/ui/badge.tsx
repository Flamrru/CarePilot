import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge variants for status indicators
 * Uses semantic colors aligned with medical terminology:
 * - stabil (stable) = green/success
 * - beobachten (monitoring) = yellow/warning
 * - kritisch (critical) = red/danger
 */
const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'font-medium',
    'rounded-full',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-slate-100 text-slate-700',
          'dark:bg-slate-700 dark:text-slate-300',
        ],
        // Medical status variants (German labels)
        stabil: [
          'bg-success-100 text-success-700',
          'dark:bg-success-900/30 dark:text-success-400',
        ],
        beobachten: [
          'bg-warning-100 text-warning-700',
          'dark:bg-warning-900/30 dark:text-warning-400',
        ],
        kritisch: [
          'bg-danger-100 text-danger-700',
          'dark:bg-danger-900/30 dark:text-danger-400',
        ],
        // Generic status variants
        success: [
          'bg-success-100 text-success-700',
          'dark:bg-success-900/30 dark:text-success-400',
        ],
        warning: [
          'bg-warning-100 text-warning-700',
          'dark:bg-warning-900/30 dark:text-warning-400',
        ],
        danger: [
          'bg-danger-100 text-danger-700',
          'dark:bg-danger-900/30 dark:text-danger-400',
        ],
        info: [
          'bg-primary-100 text-primary-700',
          'dark:bg-primary-900/30 dark:text-primary-400',
        ],
        // Outline variants for subtle appearance
        outline: [
          'bg-transparent border border-slate-300 text-slate-700',
          'dark:border-slate-600 dark:text-slate-300',
        ],
        'outline-success': [
          'bg-transparent border border-success-300 text-success-700',
          'dark:border-success-700 dark:text-success-400',
        ],
        'outline-warning': [
          'bg-transparent border border-warning-300 text-warning-700',
          'dark:border-warning-700 dark:text-warning-400',
        ],
        'outline-danger': [
          'bg-transparent border border-danger-300 text-danger-700',
          'dark:border-danger-700 dark:text-danger-400',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator before text */
  dot?: boolean
  /** Icon to display */
  icon?: React.ReactNode
}

/**
 * Badge component for status indicators and labels
 *
 * @example
 * // Patient status
 * <Badge variant="stabil">Stabil</Badge>
 * <Badge variant="beobachten" dot>Wird beobachtet</Badge>
 * <Badge variant="kritisch" pulse>Kritisch</Badge>
 *
 * // Priority badge
 * <Badge variant="danger" size="sm">Hoch</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pulse, dot, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, pulse, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              variant === 'stabil' || variant === 'success' ? 'bg-success-500' :
              variant === 'beobachten' || variant === 'warning' ? 'bg-warning-500' :
              variant === 'kritisch' || variant === 'danger' ? 'bg-danger-500' :
              variant === 'info' ? 'bg-primary-500' :
              'bg-slate-400'
            )}
          />
        )}
        {icon}
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

/**
 * Status dot - standalone indicator without text
 */
const StatusDot = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    status: 'stabil' | 'beobachten' | 'kritisch' | 'offline'
    pulse?: boolean
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, status, pulse = false, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const statusClasses = {
    stabil: 'bg-success-500',
    beobachten: 'bg-warning-500',
    kritisch: 'bg-danger-500',
    offline: 'bg-slate-400',
  }

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block rounded-full',
        sizeClasses[size],
        statusClasses[status],
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    />
  )
})
StatusDot.displayName = 'StatusDot'

export { Badge, StatusDot, badgeVariants }
