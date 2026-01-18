'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge, Avatar } from '@/components/ui'

export interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number | string
  badgeVariant?: 'default' | 'danger' | 'warning' | 'success'
}

export interface SidebarProps {
  /** Navigation links */
  links: SidebarLink[]
  /** User info for footer */
  user?: {
    name: string
    role: string
    avatarUrl?: string
  }
  /** Logo/brand element */
  logo?: React.ReactNode
  /** Collapsed state (for responsive) */
  collapsed?: boolean
  /** Toggle collapsed state */
  onToggleCollapsed?: () => void
  className?: string
}

/**
 * Sidebar navigation for staff interface
 *
 * @example
 * <Sidebar
 *   links={staffLinks}
 *   user={{ name: 'Marco Bianchi', role: 'Pflegefachmann' }}
 * />
 */
export function Sidebar({
  links,
  user,
  logo,
  collapsed = false,
  onToggleCollapsed,
  className,
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-slate-900',
        'border-r border-slate-200 dark:border-slate-800',
        'transition-all duration-300 ease-out',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Header / Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-4',
        'border-b border-slate-100 dark:border-slate-800'
      )}>
        {logo || (
          <>
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-slate-900 dark:text-white">CarePilot</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Spital zuhause</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                    'transition-all duration-200',
                    'group',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  <span className={cn(
                    'flex-shrink-0 w-6 h-6',
                    isActive && 'text-primary-500'
                  )}>
                    {link.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{link.label}</span>

                      {link.badge !== undefined && (
                        <Badge
                          variant={link.badgeVariant || (typeof link.badge === 'number' && link.badge > 0 ? 'danger' : 'default')}
                          size="sm"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </>
                  )}

                  {collapsed && link.badge !== undefined && (
                    <span className={cn(
                      'absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center',
                      'bg-danger-500 text-white'
                    )}>
                      {typeof link.badge === 'number' && link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      {user && (
        <div className={cn(
          'border-t border-slate-100 dark:border-slate-800',
          'p-4'
        )}>
          <div className={cn(
            'flex items-center gap-3',
            collapsed && 'justify-center'
          )}>
            <Avatar
              fallback={user.name}
              src={user.avatarUrl}
              size={collapsed ? 'md' : 'lg'}
              status="online"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {user.role}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      {onToggleCollapsed && (
        <button
          onClick={onToggleCollapsed}
          className={cn(
            'absolute -right-3 top-1/2 -translate-y-1/2',
            'w-6 h-6 rounded-full',
            'bg-white dark:bg-slate-800',
            'border border-slate-200 dark:border-slate-700',
            'flex items-center justify-center',
            'text-slate-400 hover:text-slate-600',
            'transition-colors duration-200',
            'shadow-sm'
          )}
        >
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              collapsed && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </aside>
  )
}

/**
 * Default staff navigation links
 */
export const staffNavLinks: SidebarLink[] = [
  {
    href: '/staff',
    label: 'Dashboard',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/staff/patients',
    label: 'Patienten',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: '/staff/route',
    label: 'Tagesroute',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    href: '/staff/benachrichtigungen',
    label: 'Benachrichtigungen',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    badge: 3,
    badgeVariant: 'danger',
  },
]
