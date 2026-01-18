'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'

export interface BottomNavLink {
  href: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number
}

export interface BottomNavProps {
  /** Navigation links */
  links: BottomNavLink[]
  /** Color theme */
  theme?: 'primary' | 'warning' | 'success'
  className?: string
}

/**
 * Bottom navigation for mobile interfaces (Patient and Family)
 *
 * @example
 * <BottomNav links={patientNavLinks} theme="primary" />
 */
export function BottomNav({
  links,
  theme = 'primary',
  className,
}: BottomNavProps) {
  const pathname = usePathname()

  const themeColors = {
    primary: {
      active: 'text-primary-600 dark:text-primary-400',
      indicator: 'bg-primary-500',
    },
    warning: {
      active: 'text-warning-600 dark:text-warning-400',
      indicator: 'bg-warning-500',
    },
    success: {
      active: 'text-success-600 dark:text-success-400',
      indicator: 'bg-success-500',
    },
  }

  const colors = themeColors[theme]

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white dark:bg-slate-800',
        'border-t border-slate-200 dark:border-slate-700',
        'px-2 py-2 safe-area-bottom',
        className
      )}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'min-w-[64px] py-2 px-3 rounded-xl',
                'transition-all duration-200',
                isActive
                  ? colors.active
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              )}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className={cn(
                  'absolute -top-1 left-1/2 -translate-x-1/2',
                  'w-1 h-1 rounded-full',
                  colors.indicator
                )} />
              )}

              {/* Icon */}
              <span className={cn(
                'w-6 h-6',
                isActive && 'scale-110'
              )}>
                {isActive && link.activeIcon ? link.activeIcon : link.icon}
              </span>

              {/* Label */}
              <span className={cn(
                'text-[11px] font-medium mt-1',
                isActive && 'font-semibold'
              )}>
                {link.label}
              </span>

              {/* Badge */}
              {link.badge !== undefined && link.badge > 0 && (
                <span className={cn(
                  'absolute -top-0.5 right-2',
                  'min-w-[18px] h-[18px] rounded-full',
                  'bg-danger-500 text-white',
                  'text-[10px] font-bold',
                  'flex items-center justify-center px-1'
                )}>
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * Patient app navigation links
 */
export const patientNavLinks: BottomNavLink[] = [
  {
    href: '/patient',
    label: 'Start',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/patient/medikamente',
    label: 'Medikamente',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    href: '/patient/fragebogen',
    label: 'Check-in',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: '/patient/nachricht',
    label: 'Nachricht',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    badge: 1,
  },
]

/**
 * Family portal navigation links
 */
export const familyNavLinks: BottomNavLink[] = [
  {
    href: '/family',
    label: 'Übersicht',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/family/nachricht',
    label: 'Nachricht',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
]
