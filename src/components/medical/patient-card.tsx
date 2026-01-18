'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, Badge, Avatar, StatusDot } from '@/components/ui'
import type { Patient, PatientStatus, Priority } from '@/types'

/**
 * Map patient status to badge variant
 * German status: 'stabil' | 'beobachten' | 'kritisch'
 */
const statusVariantMap: Record<PatientStatus, 'stabil' | 'beobachten' | 'kritisch'> = {
  stabil: 'stabil',
  beobachten: 'beobachten',
  kritisch: 'kritisch',
}

/**
 * Map patient status to German labels
 */
const statusLabelMap: Record<PatientStatus, string> = {
  stabil: 'Stabil',
  beobachten: 'Wird beobachtet',
  kritisch: 'Kritisch',
}

/**
 * Map priority to colors
 * German priority: 'dringend' | 'normal' | 'flexibel'
 */
const priorityColorMap: Record<Priority, string> = {
  flexibel: 'bg-slate-400',
  normal: 'bg-warning-500',
  dringend: 'bg-danger-500',
}

export interface PatientCardProps {
  /** Patient data */
  patient: Patient
  /** Show condensed version */
  compact?: boolean
  /** Additional info to display */
  subtitle?: React.ReactNode
  /** Click handler (if not using as link) */
  onClick?: () => void
  /** Custom link href */
  href?: string
  className?: string
}

/**
 * PatientCard displays patient overview with status indicators
 *
 * @example
 * // In patient list
 * <PatientCard patient={patient} />
 *
 * // Compact version for quick selection
 * <PatientCard patient={patient} compact />
 */
export function PatientCard({
  patient,
  compact = false,
  subtitle,
  onClick,
  href,
  className,
}: PatientCardProps) {
  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`
  const fullName = `${patient.firstName} ${patient.lastName}`
  const age = calculateAge(patient.dateOfBirth)

  const content = (
    <Card
      variant="interactive"
      padding={compact ? 'sm' : 'md'}
      status={patient.status === 'kritisch' ? 'danger' : patient.status === 'beobachten' ? 'warning' : 'none'}
      className={cn(
        'relative',
        patient.status === 'kritisch' && 'ring-1 ring-danger-300 dark:ring-danger-700',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar with status indicator */}
        <div className="relative flex-shrink-0">
          <Avatar
            fallback={fullName}
            size={compact ? 'md' : 'lg'}
            ring={patient.status === 'kritisch' ? 'danger' : patient.status === 'beobachten' ? 'warning' : 'none'}
          />
          <div className="absolute -bottom-0.5 -right-0.5">
            <StatusDot
              status={patient.status}
              size="md"
              pulse={patient.status === 'kritisch'}
            />
          </div>
        </div>

        {/* Patient info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={cn(
                'font-semibold text-slate-900 dark:text-white truncate',
                compact ? 'text-sm' : 'text-base'
              )}>
                {fullName}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {age} Jahre{subtitle ? <> • {subtitle}</> : null}
              </p>
            </div>

            {/* Priority indicator */}
            {patient.priority !== 'flexibel' && (
              <div className={cn(
                'w-2 h-2 rounded-full flex-shrink-0 mt-2',
                priorityColorMap[patient.priority]
              )} />
            )}
          </div>

          {!compact && (
            <>
              {/* Primary diagnosis */}
              {patient.diagnoses.length > 0 && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                  {patient.diagnoses[0].name}
                </p>
              )}

              {/* Status badge */}
              <div className="flex items-center gap-2 mt-3">
                <Badge variant={statusVariantMap[patient.status]} size="sm" dot>
                  {statusLabelMap[patient.status]}
                </Badge>
              </div>

              {/* Address (for route context) */}
              {patient.address && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 truncate">
                  {patient.address.street}, {patient.address.city}
                </p>
              )}
            </>
          )}

          {compact && (
            <Badge variant={statusVariantMap[patient.status]} size="sm" className="mt-2">
              {statusLabelMap[patient.status]}
            </Badge>
          )}
        </div>

        {/* Chevron for navigation hint */}
        {(href || onClick) && (
          <div className="flex-shrink-0 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: Date | string): number {
  const today = new Date()
  const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

/**
 * PatientList displays multiple patient cards
 */
interface PatientListProps {
  patients: Patient[]
  compact?: boolean
  emptyMessage?: string
  className?: string
}

export function PatientList({
  patients,
  compact = false,
  emptyMessage = 'Keine Patienten gefunden',
  className,
}: PatientListProps) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          compact={compact}
          href={`/staff/patients/${patient.id}`}
        />
      ))}
    </div>
  )
}
