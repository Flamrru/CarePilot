'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, Badge, Button, Avatar, AvatarGroup } from '@/components/ui'
import type { Visit, VisitStatus, VisitTask } from '@/types'

/**
 * Visit status styles and labels (German)
 */
const statusConfig: Record<VisitStatus, {
  label: string
  variant: 'default' | 'info' | 'success' | 'warning'
  dotColor: string
}> = {
  geplant: {
    label: 'Geplant',
    variant: 'default',
    dotColor: 'bg-slate-400',
  },
  unterwegs: {
    label: 'Unterwegs',
    variant: 'info',
    dotColor: 'bg-primary-500',
  },
  aktiv: {
    label: 'Vor Ort',
    variant: 'warning',
    dotColor: 'bg-warning-500',
  },
  abgeschlossen: {
    label: 'Abgeschlossen',
    variant: 'success',
    dotColor: 'bg-success-500',
  },
  abgesagt: {
    label: 'Abgesagt',
    variant: 'default',
    dotColor: 'bg-slate-400',
  },
}

export interface VisitCardProps {
  /** Visit data */
  visit: Visit
  /** Patient name */
  patientName?: string
  /** Patient address */
  patientAddress?: string
  /** Staff member names */
  staffNames?: string[]
  /** Show detailed view */
  detailed?: boolean
  /** Show tasks list */
  showTasks?: boolean
  /** Show navigation action */
  showNavigation?: boolean
  /** Start navigation handler */
  onStartNavigation?: () => void
  /** Mark as arrived handler */
  onMarkArrived?: () => void
  /** Complete visit handler */
  onComplete?: () => void
  /** View details handler */
  onViewDetails?: () => void
  className?: string
}

/**
 * VisitCard displays visit information with status and actions
 *
 * @example
 * // Staff route view
 * <VisitCard
 *   visit={visit}
 *   patientName="Hans Gerber"
 *   showNavigation
 *   onStartNavigation={() => {}}
 * />
 */
export function VisitCard({
  visit,
  patientName,
  patientAddress,
  staffNames,
  detailed = false,
  showTasks = false,
  showNavigation = false,
  onStartNavigation,
  onMarkArrived,
  onComplete,
  onViewDetails,
  className,
}: VisitCardProps) {
  const status = statusConfig[visit.status]
  const isActive = visit.status === 'unterwegs' || visit.status === 'aktiv'
  const isUpcoming = visit.status === 'geplant'

  return (
    <Card
      variant={isActive ? 'elevated' : 'default'}
      padding="md"
      status={isActive ? 'info' : visit.status === 'abgeschlossen' ? 'success' : 'none'}
      className={cn(
        'relative',
        isActive && 'ring-1 ring-primary-200 dark:ring-primary-800',
        className
      )}
    >
      {/* Status indicator line */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-1 rounded-t-2xl',
        status.dotColor
      )} />

      <div className="pt-2">
        {/* Header with time and status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Time block */}
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {visit.scheduledTime}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {visit.estimatedDuration} Min.
              </p>
            </div>

            {/* Visit indicator */}
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              'bg-slate-100 dark:bg-slate-800'
            )}>
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <Badge variant={status.variant} size="sm" dot>
            {status.label}
          </Badge>
        </div>

        {/* Patient/Staff info */}
        <div className="mt-4">
          {patientName && (
            <h4 className="font-semibold text-slate-900 dark:text-white">
              {patientName}
            </h4>
          )}

          {staffNames && staffNames.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <AvatarGroup size="sm" max={3}>
                {staffNames.map((name, i) => (
                  <Avatar key={i} fallback={name} />
                ))}
              </AvatarGroup>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {staffNames.join(', ')}
              </span>
            </div>
          )}

          {patientAddress && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {patientAddress}
            </p>
          )}
        </div>

        {/* Tasks list */}
        {showTasks && visit.tasks && visit.tasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Aufgaben
              </h5>
              <span className="text-xs text-slate-500">
                {visit.completedTaskCount}/{visit.tasks.length}
              </span>
            </div>
            <ul className="space-y-1.5">
              {visit.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </div>
        )}

        {/* Detailed info */}
        {detailed && visit.preVisitNotes && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">Notizen:</span> {visit.preVisitNotes}
            </p>
          </div>
        )}

        {/* Actions */}
        {(showNavigation || onComplete || onViewDetails) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            {showNavigation && isUpcoming && onStartNavigation && (
              <Button
                variant="primary"
                size="sm"
                onClick={onStartNavigation}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                }
              >
                Navigation starten
              </Button>
            )}

            {visit.status === 'unterwegs' && onMarkArrived && (
              <Button
                variant="success"
                size="sm"
                onClick={onMarkArrived}
              >
                Angekommen
              </Button>
            )}

            {visit.status === 'aktiv' && onComplete && (
              <Button
                variant="success"
                size="sm"
                onClick={onComplete}
              >
                Besuch abschliessen
              </Button>
            )}

            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewDetails}
              >
                Details
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

/**
 * Task item component
 */
function TaskItem({ task }: { task: VisitTask }) {
  const isCompleted = task.status === 'erledigt'
  const isSkipped = task.status === 'übersprungen'

  return (
    <li className="flex items-center gap-2">
      <div className={cn(
        'w-4 h-4 rounded border flex items-center justify-center flex-shrink-0',
        isCompleted
          ? 'bg-success-500 border-success-500 text-white'
          : isSkipped
            ? 'bg-slate-300 border-slate-300 text-white'
            : 'border-slate-300 dark:border-slate-600'
      )}>
        {isCompleted && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isSkipped && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <span className={cn(
        'text-sm',
        isCompleted || isSkipped
          ? 'text-slate-400 dark:text-slate-500 line-through'
          : 'text-slate-700 dark:text-slate-300'
      )}>
        {task.title}
      </span>
    </li>
  )
}

/**
 * VisitTimeline shows visits in a timeline format
 */
interface VisitTimelineProps {
  visits: Visit[]
  patientNames?: Record<string, string>
  patientAddresses?: Record<string, string>
  showNavigation?: boolean
  onStartNavigation?: (visitId: string) => void
  className?: string
}

export function VisitTimeline({
  visits,
  patientNames = {},
  patientAddresses = {},
  showNavigation = false,
  onStartNavigation,
  className,
}: VisitTimelineProps) {
  // Sort visits by scheduled time
  const sortedVisits = [...visits].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime)
  )

  return (
    <div className={cn('space-y-4', className)}>
      {sortedVisits.map((visit, index) => (
        <div key={visit.id} className="relative">
          {/* Timeline connector */}
          {index < sortedVisits.length - 1 && (
            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
          )}

          <VisitCard
            visit={visit}
            patientName={patientNames[visit.patientId]}
            patientAddress={patientAddresses[visit.patientId]}
            showNavigation={showNavigation}
            onStartNavigation={onStartNavigation ? () => onStartNavigation(visit.id) : undefined}
          />
        </div>
      ))}
    </div>
  )
}
