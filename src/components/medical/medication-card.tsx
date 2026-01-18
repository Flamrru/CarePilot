'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, Badge, Button } from '@/components/ui'
import type { Medication } from '@/types'

/**
 * Route labels in German
 */
const routeLabels: Record<Medication['route'], string> = {
  oral: 'Oral',
  iv: 'Intravenös',
  sc: 'Subkutan',
  im: 'Intramuskulär',
  topisch: 'Topisch',
}

export interface MedicationCardProps {
  /** Medication data */
  medication: Medication
  /** Show detailed view */
  detailed?: boolean
  /** Show take action (for patient app) */
  showTakeAction?: boolean
  /** Mark as taken handler */
  onMarkTaken?: (medicationId: string) => void
  /** Show instructions */
  showInstructions?: boolean
  className?: string
}

/**
 * Check if medication is currently active (no end date or end date in future)
 */
function isMedicationActive(medication: Medication): boolean {
  if (!medication.endDate) return true
  const endDate = typeof medication.endDate === 'string' ? new Date(medication.endDate) : medication.endDate
  return endDate > new Date()
}

/**
 * MedicationCard displays medication information
 *
 * @example
 * // Staff view
 * <MedicationCard medication={med} detailed />
 *
 * // Patient view with action
 * <MedicationCard medication={med} showTakeAction onMarkTaken={handleTake} />
 */
export function MedicationCard({
  medication,
  detailed = false,
  showTakeAction = false,
  onMarkTaken,
  showInstructions = false,
  className,
}: MedicationCardProps) {
  const isActive = isMedicationActive(medication)

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'relative',
        !isActive && 'opacity-60',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Medication icon/indicator */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          isActive
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        )}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name and status */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                {medication.name}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {medication.dosage}
              </p>
            </div>
            <Badge
              variant={isActive ? 'success' : 'default'}
              size="sm"
            >
              {isActive ? 'Aktiv' : 'Beendet'}
            </Badge>
          </div>

          {/* Schedule info */}
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{medication.frequency}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{routeLabels[medication.route]}</span>
            </div>
          </div>

          {/* Indication */}
          {medication.indication && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {medication.indication}
            </p>
          )}

          {/* Detailed info */}
          {detailed && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Beginn</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {formatDate(medication.startDate)}
                </span>
              </div>
              {medication.endDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Ende</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {formatDate(medication.endDate)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          {showInstructions && medication.instructions && (
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Hinweis:</span> {medication.instructions}
              </p>
            </div>
          )}

          {/* Take action for patient app */}
          {showTakeAction && isActive && onMarkTaken && (
            <div className="mt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => onMarkTaken(medication.id)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eingenommen
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

/**
 * Format date for display
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * MedicationList displays multiple medications
 */
interface MedicationListProps {
  medications: Medication[]
  detailed?: boolean
  showTakeAction?: boolean
  onMarkTaken?: (medicationId: string) => void
  showInstructions?: boolean
  emptyMessage?: string
  className?: string
}

export function MedicationList({
  medications,
  detailed = false,
  showTakeAction = false,
  onMarkTaken,
  showInstructions = false,
  emptyMessage = 'Keine Medikamente',
  className,
}: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  // Sort active medications first
  const sortedMedications = [...medications].sort((a, b) => {
    const aActive = isMedicationActive(a)
    const bActive = isMedicationActive(b)
    if (aActive && !bActive) return -1
    if (!aActive && bActive) return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className={cn('space-y-3', className)}>
      {sortedMedications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          detailed={detailed}
          showTakeAction={showTakeAction}
          onMarkTaken={onMarkTaken}
          showInstructions={showInstructions}
        />
      ))}
    </div>
  )
}
