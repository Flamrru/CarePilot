'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, Badge, Button } from '@/components/ui'
import type { Alert, AlertPriority, AlertCategory } from '@/types'

/**
 * Map priority to visual styles
 * German priorities: 'dringend' | 'wichtig' | 'information'
 */
const priorityStyles: Record<AlertPriority, {
  bg: string
  border: string
  icon: string
  badge: 'danger' | 'warning' | 'info'
}> = {
  dringend: {
    bg: 'bg-danger-50 dark:bg-danger-900/20',
    border: 'border-danger-200 dark:border-danger-800',
    icon: 'text-danger-500',
    badge: 'danger',
  },
  wichtig: {
    bg: 'bg-warning-50 dark:bg-warning-900/20',
    border: 'border-warning-200 dark:border-warning-800',
    icon: 'text-warning-500',
    badge: 'warning',
  },
  information: {
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    border: 'border-primary-200 dark:border-primary-800',
    icon: 'text-primary-500',
    badge: 'info',
  },
}

/**
 * Map category to icon
 * German categories: 'vital' | 'medikation' | 'fragebogen' | 'termin' | 'system' | 'labor' | 'kommunikation'
 */
const categoryIcons: Record<AlertCategory, React.ReactNode> = {
  vital: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  medikation: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  fragebogen: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  termin: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  system: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  labor: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  kommunikation: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
}

/**
 * Priority labels in German
 */
const priorityLabels: Record<AlertPriority, string> = {
  dringend: 'Dringend',
  wichtig: 'Wichtig',
  information: 'Info',
}

export interface AlertCardProps {
  /** Alert data */
  alert: Alert
  /** Show compact version */
  compact?: boolean
  /** Show patient info */
  showPatient?: boolean
  /** Patient name (if showPatient) */
  patientName?: string
  /** Acknowledge handler */
  onAcknowledge?: (alertId: string) => void
  /** View details handler */
  onViewDetails?: (alertId: string) => void
  className?: string
}

/**
 * AlertCard displays an alert/notification with priority indicators
 *
 * @example
 * <AlertCard alert={alert} onAcknowledge={handleAck} />
 */
export function AlertCard({
  alert,
  compact = false,
  showPatient = true,
  patientName,
  onAcknowledge,
  onViewDetails,
  className,
}: AlertCardProps) {
  const styles = priorityStyles[alert.priority]
  const icon = categoryIcons[alert.category]
  const isUnread = alert.status === 'neu'

  return (
    <Card
      padding={compact ? 'sm' : 'md'}
      className={cn(
        'relative border',
        styles.bg,
        styles.border,
        isUnread && 'ring-1 ring-primary-300 dark:ring-primary-700',
        alert.priority === 'dringend' && 'animate-pulse',
        className
      )}
    >
      {/* Unread indicator */}
      {isUnread && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-500" />
      )}

      <div className="flex items-start gap-3">
        {/* Category icon */}
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          'bg-white/60 dark:bg-slate-800/60',
          styles.icon
        )}>
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header with priority badge */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">
                {alert.title}
              </h4>
              {showPatient && (alert.patientId || patientName) && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {patientName || `Patient ${alert.patientId}`}
                </p>
              )}
            </div>
            <Badge variant={styles.badge} size="sm">
              {priorityLabels[alert.priority]}
            </Badge>
          </div>

          {/* Message */}
          {!compact && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
              {alert.message}
            </p>
          )}

          {/* Timestamp and actions */}
          <div className="flex items-center justify-between gap-3 mt-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {formatTimeAgo(alert.createdAt)}
            </span>

            {!compact && (onAcknowledge || onViewDetails) && (
              <div className="flex items-center gap-2">
                {onViewDetails && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(alert.id)}
                  >
                    Details
                  </Button>
                )}
                {onAcknowledge && alert.status !== 'bearbeitet' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onAcknowledge(alert.id)}
                  >
                    Bestätigen
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * Format timestamp as relative time
 */
function formatTimeAgo(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Gerade eben'
  if (diffMins < 60) return `Vor ${diffMins} Min.`
  if (diffHours < 24) return `Vor ${diffHours} Std.`
  if (diffDays === 1) return 'Gestern'
  return `Vor ${diffDays} Tagen`
}

/**
 * AlertList displays grouped alerts by priority
 */
interface AlertListProps {
  alerts: Alert[]
  compact?: boolean
  showPatient?: boolean
  patientNames?: Record<string, string>
  onAcknowledge?: (alertId: string) => void
  onViewDetails?: (alertId: string) => void
  emptyMessage?: string
  className?: string
}

export function AlertList({
  alerts,
  compact = false,
  showPatient = true,
  patientNames = {},
  onAcknowledge,
  onViewDetails,
  emptyMessage = 'Keine Benachrichtigungen',
  className,
}: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  // Sort by priority then by timestamp
  const priorityOrder: Record<AlertPriority, number> = {
    dringend: 0,
    wichtig: 1,
    information: 2,
  }

  const sortedAlerts = [...alerts].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className={cn('space-y-3', className)}>
      {sortedAlerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          compact={compact}
          showPatient={showPatient}
          patientName={alert.patientId ? patientNames[alert.patientId] : undefined}
          onAcknowledge={onAcknowledge}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}
