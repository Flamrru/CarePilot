'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui'

/**
 * Vital sign types
 */
export type VitalType = 'heartRate' | 'bloodPressure' | 'spO2' | 'temperature' | 'weight' | 'respiratoryRate'

interface VitalConfig {
  label: string
  unit: string
  icon: React.ReactNode
  normalRange: { min: number; max: number }
  dangerLow?: number
  dangerHigh?: number
}

const vitalConfigs: Record<VitalType, VitalConfig> = {
  heartRate: {
    label: 'Puls',
    unit: 'bpm',
    normalRange: { min: 60, max: 100 },
    dangerLow: 50,
    dangerHigh: 120,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  bloodPressure: {
    label: 'Blutdruck',
    unit: 'mmHg',
    normalRange: { min: 90, max: 140 }, // systolic reference
    dangerHigh: 180,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  spO2: {
    label: 'Sauerstoff',
    unit: '%',
    normalRange: { min: 95, max: 100 },
    dangerLow: 90,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  temperature: {
    label: 'Temperatur',
    unit: '°C',
    normalRange: { min: 36.1, max: 37.2 },
    dangerHigh: 38.5,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  weight: {
    label: 'Gewicht',
    unit: 'kg',
    normalRange: { min: 0, max: 999 }, // No standard normal range
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  respiratoryRate: {
    label: 'Atemfrequenz',
    unit: '/min',
    normalRange: { min: 12, max: 20 },
    dangerLow: 8,
    dangerHigh: 30,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
}

export interface VitalCardProps {
  /** Type of vital sign */
  type: VitalType
  /** Current value */
  value: number | string
  /** Previous value for trend comparison */
  previousValue?: number
  /** Timestamp of measurement */
  timestamp?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional click handler */
  onClick?: () => void
  className?: string
}

/**
 * Determine status based on value and thresholds
 */
function getVitalStatus(type: VitalType, value: number): 'normal' | 'warning' | 'critical' {
  const config = vitalConfigs[type]
  if (!config) return 'normal'

  if (config.dangerLow && value < config.dangerLow) return 'critical'
  if (config.dangerHigh && value > config.dangerHigh) return 'critical'
  if (value < config.normalRange.min || value > config.normalRange.max) return 'warning'
  return 'normal'
}

/**
 * Get trend indicator
 */
function getTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const diff = current - previous
  const threshold = Math.abs(previous * 0.02) // 2% threshold
  if (Math.abs(diff) < threshold) return 'stable'
  return diff > 0 ? 'up' : 'down'
}

/**
 * VitalCard component displays a single vital sign measurement
 *
 * @example
 * <VitalCard type="spO2" value={94} previousValue={96} />
 * <VitalCard type="heartRate" value={78} size="lg" />
 */
export function VitalCard({
  type,
  value,
  previousValue,
  timestamp,
  size = 'md',
  onClick,
  className,
}: VitalCardProps) {
  const config = vitalConfigs[type]
  if (!config) return null

  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  const status = getVitalStatus(type, numericValue)
  const trend = previousValue !== undefined ? getTrend(numericValue, previousValue) : null

  const statusColors = {
    normal: {
      bg: 'bg-success-50 dark:bg-success-900/20',
      border: 'border-success-200 dark:border-success-800',
      icon: 'text-success-600 dark:text-success-400',
      value: 'text-success-700 dark:text-success-300',
    },
    warning: {
      bg: 'bg-warning-50 dark:bg-warning-900/20',
      border: 'border-warning-200 dark:border-warning-800',
      icon: 'text-warning-600 dark:text-warning-400',
      value: 'text-warning-700 dark:text-warning-300',
    },
    critical: {
      bg: 'bg-danger-50 dark:bg-danger-900/20',
      border: 'border-danger-200 dark:border-danger-800',
      icon: 'text-danger-600 dark:text-danger-400',
      value: 'text-danger-700 dark:text-danger-300',
    },
  }

  const sizeClasses = {
    sm: {
      card: 'p-3',
      icon: 'w-8 h-8',
      value: 'text-xl',
      label: 'text-xs',
    },
    md: {
      card: 'p-4',
      icon: 'w-10 h-10',
      value: 'text-2xl',
      label: 'text-sm',
    },
    lg: {
      card: 'p-5',
      icon: 'w-12 h-12',
      value: 'text-3xl',
      label: 'text-base',
    },
  }

  const colors = statusColors[status]
  const sizes = sizeClasses[size]

  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      padding="none"
      onClick={onClick}
      className={cn(
        colors.bg,
        colors.border,
        'border',
        status === 'critical' && 'animate-pulse',
        className
      )}
    >
      <div className={sizes.card}>
        <div className="flex items-start justify-between gap-3">
          <div className={cn(
            'rounded-xl flex items-center justify-center',
            sizes.icon,
            'bg-white/60 dark:bg-slate-800/60',
            colors.icon
          )}>
            {config.icon}
          </div>

          {trend && (
            <div className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              trend === 'up' && 'text-danger-500',
              trend === 'down' && 'text-success-500',
              trend === 'stable' && 'text-slate-400'
            )}>
              {trend === 'up' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {trend === 'stable' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                </svg>
              )}
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className={cn('font-bold', sizes.value, colors.value)}>
              {value}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              {config.unit}
            </span>
          </div>
          <p className={cn('text-slate-600 dark:text-slate-400 mt-0.5', sizes.label)}>
            {config.label}
          </p>
          {timestamp && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {timestamp}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

/**
 * VitalsGrid displays multiple vital signs in a responsive grid
 */
interface VitalsGridProps {
  vitals: Array<{
    type: VitalType
    value: number | string
    previousValue?: number
    timestamp?: string
  }>
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function VitalsGrid({ vitals, size = 'md', className }: VitalsGridProps) {
  return (
    <div className={cn(
      'grid gap-3',
      'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
      className
    )}>
      {vitals.map((vital) => (
        <VitalCard
          key={vital.type}
          type={vital.type}
          value={vital.value}
          previousValue={vital.previousValue}
          timestamp={vital.timestamp}
          size={size}
        />
      ))}
    </div>
  )
}
