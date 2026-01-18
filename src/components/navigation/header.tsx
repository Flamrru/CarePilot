'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, Badge } from '@/components/ui'

export interface HeaderProps {
  /** Page title */
  title?: string
  /** Subtitle or breadcrumb */
  subtitle?: string
  /** Show back button */
  showBack?: boolean
  /** Back button href (defaults to browser back) */
  backHref?: string
  /** Right side actions */
  actions?: React.ReactNode
  /** Color theme */
  theme?: 'primary' | 'warning' | 'success'
  /** Notification count */
  notificationCount?: number
  className?: string
}

/**
 * Header component for mobile app pages
 *
 * @example
 * <Header
 *   title="Patienten"
 *   subtitle="5 aktive Patienten"
 *   actions={<Button size="icon-sm">...</Button>}
 * />
 */
export function Header({
  title,
  subtitle,
  showBack = false,
  backHref,
  actions,
  theme = 'primary',
  notificationCount,
  className,
}: HeaderProps) {
  const themeColors = {
    primary: 'bg-primary-500',
    warning: 'bg-warning-500',
    success: 'bg-success-500',
  }

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-white dark:bg-slate-800',
        'border-b border-slate-200 dark:border-slate-700',
        'px-4 py-3',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left side: back button + title */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            backHref ? (
              <Link
                href={backHref}
                className={cn(
                  'flex items-center justify-center',
                  'w-10 h-10 rounded-xl',
                  'text-slate-600 dark:text-slate-400',
                  'hover:bg-slate-100 dark:hover:bg-slate-700',
                  'transition-colors duration-200'
                )}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            ) : (
              <button
                onClick={handleBack}
                className={cn(
                  'flex items-center justify-center',
                  'w-10 h-10 rounded-xl',
                  'text-slate-600 dark:text-slate-400',
                  'hover:bg-slate-100 dark:hover:bg-slate-700',
                  'transition-colors duration-200'
                )}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )
          )}

          <div className="min-w-0">
            {title && (
              <h1 className="font-semibold text-slate-900 dark:text-white truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}

          {notificationCount !== undefined && (
            <Link
              href="/staff/benachrichtigungen"
              className={cn(
                'relative flex items-center justify-center',
                'w-10 h-10 rounded-xl',
                'text-slate-600 dark:text-slate-400',
                'hover:bg-slate-100 dark:hover:bg-slate-700',
                'transition-colors duration-200'
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notificationCount > 0 && (
                <span className={cn(
                  'absolute -top-0.5 -right-0.5',
                  'min-w-[18px] h-[18px] rounded-full',
                  'bg-danger-500 text-white',
                  'text-[10px] font-bold',
                  'flex items-center justify-center px-1'
                )}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * App bar for mobile with logo
 */
export interface AppBarProps {
  /** App name */
  appName?: string
  /** App subtitle */
  appSubtitle?: string
  /** Logo color theme */
  theme?: 'primary' | 'warning' | 'success'
  /** Right side actions */
  actions?: React.ReactNode
  className?: string
}

export function AppBar({
  appName = 'CarePilot',
  appSubtitle,
  theme = 'primary',
  actions,
  className,
}: AppBarProps) {
  const themeColors = {
    primary: 'bg-primary-500',
    warning: 'bg-warning-500',
    success: 'bg-success-500',
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-white dark:bg-slate-800',
        'border-b border-slate-200 dark:border-slate-700',
        'px-4 py-3',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            themeColors[theme]
          )}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">{appName}</span>
            {appSubtitle && (
              <span className="text-xs text-slate-500 dark:text-slate-400 block">{appSubtitle}</span>
            )}
          </div>
        </Link>

        {actions}
      </div>
    </header>
  )
}
