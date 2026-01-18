import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Card variants with different elevation and interaction styles
 */
const cardVariants = cva(
  [
    'rounded-2xl',
    'bg-white dark:bg-slate-800',
    'border border-slate-200 dark:border-slate-700',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'shadow-sm',
        ],
        elevated: [
          'shadow-md',
          'hover:shadow-lg hover:-translate-y-0.5',
        ],
        interactive: [
          'shadow-sm',
          'hover:shadow-md hover:border-slate-300',
          'dark:hover:border-slate-600',
          'cursor-pointer',
          'active:scale-[0.99]',
        ],
        flat: [
          'shadow-none',
          'border-transparent',
          'bg-slate-50 dark:bg-slate-900',
        ],
        outline: [
          'shadow-none',
          'bg-transparent',
          'border-2',
        ],
      },
      status: {
        none: '',
        success: 'border-l-4 border-l-success-500',
        warning: 'border-l-4 border-l-warning-500',
        danger: 'border-l-4 border-l-danger-500',
        info: 'border-l-4 border-l-primary-500',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      status: 'none',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card container component
 *
 * @example
 * // Basic card
 * <Card>Patient information here</Card>
 *
 * // Interactive card with status indicator
 * <Card variant="interactive" status="warning">
 *   <CardHeader>Wird beobachtet</CardHeader>
 *   <CardContent>SpO2 bei 92%</CardContent>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, status, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, status, padding, className }))}
      {...props}
    />
  )
)
Card.displayName = 'Card'

/**
 * Card header - typically contains title and actions
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5',
      className
    )}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * Card title
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-tight',
      'text-slate-900 dark:text-white',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * Card description - secondary text below title
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-slate-500 dark:text-slate-400',
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Card content - main content area
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-0', className)}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

/**
 * Card footer - typically contains actions
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center pt-4',
      'border-t border-slate-100 dark:border-slate-700',
      className
    )}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
