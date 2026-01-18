import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Avatar variants
 */
const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'overflow-hidden',
    'bg-slate-200 dark:bg-slate-700',
    'text-slate-600 dark:text-slate-300',
    'font-medium',
    'select-none',
    'flex-shrink-0',
  ],
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-[10px]',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
        '2xl': 'w-20 h-20 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-xl',
      },
      ring: {
        none: '',
        default: 'ring-2 ring-white dark:ring-slate-800',
        primary: 'ring-2 ring-primary-500',
        success: 'ring-2 ring-success-500',
        warning: 'ring-2 ring-warning-500',
        danger: 'ring-2 ring-danger-500',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      ring: 'none',
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string
  /** Alt text for image */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Online status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away'
}

/**
 * Get initials from a name string
 */
function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Avatar component for user/patient display
 *
 * @example
 * // With image
 * <Avatar src="/avatar.jpg" alt="Hans Gerber" />
 *
 * // With fallback initials
 * <Avatar fallback="Hans Gerber" size="lg" />
 *
 * // With status indicator
 * <Avatar fallback="MB" status="online" />
 *
 * // Staff avatar with role ring
 * <Avatar fallback="Dr. SM" ring="primary" />
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      shape,
      ring,
      src,
      alt,
      fallback,
      status,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const initials = fallback ? getInitials(fallback) : '?'

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(avatarVariants({ size, shape, ring, className }))}
          {...props}
        >
          {src && !imageError ? (
            <img
              src={src}
              alt={alt || fallback || 'Avatar'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        {status && (
          <AvatarStatus status={status} size={size} />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

/**
 * Status indicator for Avatar
 */
interface AvatarStatusProps {
  status: 'online' | 'offline' | 'busy' | 'away'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null
}

function AvatarStatus({ status, size }: AvatarStatusProps) {
  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-slate-400',
    busy: 'bg-danger-500',
    away: 'bg-warning-500',
  }

  const sizeClasses = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-3.5 h-3.5 border-2',
    '2xl': 'w-4 h-4 border-2',
  }

  return (
    <span
      className={cn(
        'absolute bottom-0 right-0',
        'rounded-full',
        'border-white dark:border-slate-800',
        statusColors[status],
        sizeClasses[size || 'md']
      )}
    />
  )
}

/**
 * Avatar group for showing multiple avatars
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar fallback="HG" />
 *   <Avatar fallback="MM" />
 *   <Avatar fallback="PS" />
 *   <Avatar fallback="EB" />
 * </AvatarGroup>
 */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before "+N" */
  max?: number
  /** Size of avatars in group */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleAvatars = childArray.slice(0, max)
    const remainingCount = childArray.length - max

    const overlapClasses = {
      xs: '-ml-1.5',
      sm: '-ml-2',
      md: '-ml-2.5',
      lg: '-ml-3',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
      >
        {visibleAvatars.map((child, index) => (
          <div
            key={index}
            className={cn(
              index > 0 && overlapClasses[size],
              'relative'
            )}
            style={{ zIndex: visibleAvatars.length - index }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                  size,
                  ring: 'default',
                })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              overlapClasses[size],
              avatarVariants({ size, shape: 'circle', ring: 'default' }),
              'bg-slate-300 dark:bg-slate-600',
              'text-slate-700 dark:text-slate-200'
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
