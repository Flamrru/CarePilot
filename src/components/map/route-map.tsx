'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, Badge, Avatar } from '@/components/ui'
import type { RouteStop, DailyRoute } from '@/types'

/**
 * Stylized map visualization for route display
 * In production, this would integrate with Leaflet or Google Maps
 */

export interface RouteMapProps {
  /** Daily route data */
  route?: DailyRoute
  /** Stops to display */
  stops: RouteStop[]
  /** Patient names lookup */
  patientNames?: Record<string, string>
  /** Currently selected stop */
  selectedStopIndex?: number
  /** Stop selection handler */
  onSelectStop?: (index: number) => void
  /** Height of the map */
  height?: string
  className?: string
}

/**
 * RouteMap displays an optimized route with stops
 * Shows a stylized representation of the route
 *
 * @example
 * <RouteMap
 *   stops={route.stops}
 *   patientNames={patientNames}
 *   onSelectStop={(i) => setSelected(i)}
 * />
 */
export function RouteMap({
  route,
  stops,
  patientNames = {},
  selectedStopIndex,
  onSelectStop,
  height = '300px',
  className,
}: RouteMapProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'bg-gradient-to-br from-slate-100 to-slate-200',
        'dark:from-slate-800 dark:to-slate-900',
        className
      )}
      style={{ height }}
    >
      {/* Stylized map background */}
      <MapBackground />

      {/* Route line visualization */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Route path - curved line through stops */}
        <path
          d={generateRoutePath(stops.length)}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8,4"
          className="animate-dash"
        />
      </svg>

      {/* Stop markers */}
      <div className="absolute inset-0">
        {stops.map((stop, index) => (
          <StopMarker
            key={stop.visitId}
            stop={stop}
            index={index}
            patientName={patientNames[stop.patientId]}
            isSelected={selectedStopIndex === index}
            isCurrent={route?.currentStopIndex === index}
            isCompleted={stop.isCompleted}
            totalStops={stops.length}
            onClick={() => onSelectStop?.(index)}
          />
        ))}
      </div>

      {/* Route stats overlay */}
      {route && (
        <div className="absolute bottom-3 left-3 right-3">
          <Card padding="sm" className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Distanz</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {route.totalDistance.toFixed(1)} km
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Fahrzeit</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {route.totalTravelTime} Min.
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Patienten</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {route.totalPatients}
                  </p>
                </div>
              </div>
              {route.isOptimized && route.savedDistance && (
                <Badge variant="success" size="sm">
                  {route.savedDistance.toFixed(0)} km gespart
                </Badge>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

/**
 * Generate SVG path for route visualization
 */
function generateRoutePath(stopCount: number): string {
  if (stopCount < 2) return ''

  const points: { x: number; y: number }[] = []
  const padding = 15
  const width = 100 - padding * 2
  const height = 100 - padding * 2

  // Generate points in a serpentine pattern
  for (let i = 0; i < stopCount; i++) {
    const row = Math.floor(i / 2)
    const isEvenRow = row % 2 === 0
    const col = i % 2

    let x: number
    if (isEvenRow) {
      x = col === 0 ? padding + width * 0.2 : padding + width * 0.8
    } else {
      x = col === 0 ? padding + width * 0.8 : padding + width * 0.2
    }

    const y = padding + (height / (stopCount - 1)) * i

    points.push({ x, y })
  }

  // Create smooth curve through points
  if (points.length < 2) return ''

  let path = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midY = (prev.y + curr.y) / 2

    path += ` Q ${prev.x} ${midY} ${curr.x} ${curr.y}`
  }

  return path
}

/**
 * Map background with grid and decoration
 */
function MapBackground() {
  return (
    <>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative roads */}
      <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10">
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#64748b" strokeWidth="8" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#64748b" strokeWidth="6" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#64748b" strokeWidth="4" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#64748b" strokeWidth="4" />
      </svg>

      {/* Laufental region label */}
      <div className="absolute top-3 right-3">
        <Badge variant="outline" size="sm" className="bg-white/50 dark:bg-slate-800/50">
          Laufental, BL
        </Badge>
      </div>
    </>
  )
}

/**
 * Individual stop marker on the map
 */
interface StopMarkerProps {
  stop: RouteStop
  index: number
  patientName?: string
  isSelected?: boolean
  isCurrent?: boolean
  isCompleted?: boolean
  totalStops: number
  onClick?: () => void
}

function StopMarker({
  stop,
  index,
  patientName,
  isSelected,
  isCurrent,
  isCompleted,
  totalStops,
  onClick,
}: StopMarkerProps) {
  // Calculate position based on index
  const padding = 15
  const width = 100 - padding * 2
  const height = 100 - padding * 2

  const row = Math.floor(index / 2)
  const isEvenRow = row % 2 === 0
  const col = index % 2

  let left: number
  if (isEvenRow) {
    left = col === 0 ? padding + width * 0.2 : padding + width * 0.8
  } else {
    left = col === 0 ? padding + width * 0.8 : padding + width * 0.2
  }

  const top = padding + (height / Math.max(totalStops - 1, 1)) * index

  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute -translate-x-1/2 -translate-y-1/2',
        'flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isCompleted
          ? 'bg-success-500 text-white'
          : isCurrent
            ? 'bg-primary-500 text-white ring-4 ring-primary-200 dark:ring-primary-800 animate-pulse'
            : isSelected
              ? 'bg-primary-500 text-white scale-110'
              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-lg',
        stop.hasConflict && !isCompleted && 'ring-2 ring-warning-500'
      )}
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
      title={patientName || `Stop ${index + 1}`}
    >
      {isCompleted ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span className="font-bold text-sm">{stop.order}</span>
      )}
    </button>
  )
}

/**
 * Compact route list view (alternative to map)
 */
export interface RouteListProps {
  stops: RouteStop[]
  patientNames?: Record<string, string>
  currentStopIndex?: number
  onSelectStop?: (index: number) => void
  className?: string
}

export function RouteList({
  stops,
  patientNames = {},
  currentStopIndex,
  onSelectStop,
  className,
}: RouteListProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {stops.map((stop, index) => {
        const isCurrent = currentStopIndex === index
        const isCompleted = stop.isCompleted

        return (
          <button
            key={stop.visitId}
            onClick={() => onSelectStop?.(index)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-xl',
              'transition-all duration-200',
              'text-left',
              isCompleted
                ? 'bg-success-50 dark:bg-success-900/20'
                : isCurrent
                  ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700',
              stop.hasConflict && !isCompleted && 'ring-2 ring-warning-500'
            )}
          >
            {/* Order number */}
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              isCompleted
                ? 'bg-success-500 text-white'
                : isCurrent
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            )}>
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="font-bold text-sm">{stop.order}</span>
              )}
            </div>

            {/* Stop info */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                'font-medium truncate',
                isCompleted
                  ? 'text-success-700 dark:text-success-400'
                  : 'text-slate-900 dark:text-white'
              )}>
                {patientNames[stop.patientId] || `Patient ${stop.patientId}`}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {stop.address.street}, {stop.address.city}
              </p>
            </div>

            {/* Time and travel info */}
            <div className="text-right flex-shrink-0">
              <p className="font-medium text-slate-900 dark:text-white">
                {stop.arrivalTime}
              </p>
              {stop.travelTimeToNext && !isCompleted && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  → {stop.travelTimeToNext} Min.
                </p>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
