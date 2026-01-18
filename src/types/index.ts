/**
 * Central export for all CarePilot types
 */

// Re-export all types from individual files
export * from './patient'
export * from './staff'
export * from './visit'
export * from './vitals'
export * from './communication'

// Import types for use in this file
import type { PatientStatus, Priority } from './patient'
import type { AlertPriority, AlertCategory, AlertStatus } from './communication'

// Utility types
export type ID = string
export type ISODateString = string
export type TimeString = string // "HH:mm" format

// Common action result type
export interface ActionResult<T = void> {
  success: boolean
  data?: T
  error?: string
}

// Pagination
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Filter types
export interface PatientFilters {
  status?: PatientStatus[]
  priority?: Priority[]
  teamId?: string
  staffId?: string
  searchQuery?: string
}

export interface AlertFilters {
  priority?: AlertPriority[]
  category?: AlertCategory[]
  status?: AlertStatus[]
  patientId?: string
  dateFrom?: Date
  dateTo?: Date
}
