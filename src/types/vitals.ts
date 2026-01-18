/**
 * Vital signs and lab result types for CarePilot
 * Based on PRD section 4.3 and 5.4
 */

export type VitalType = 'spo2' | 'blutdruck' | 'puls' | 'temperatur' | 'gewicht' | 'atemfrequenz' | 'blutzucker'
export type TrendDirection = 'steigend' | 'stabil' | 'fallend'
export type VitalStatus = 'normal' | 'erhöht' | 'erniedrigt' | 'kritisch'

export interface VitalReading {
  id: string
  patientId: string
  type: VitalType

  // Value
  value: number
  unit: string
  secondaryValue?: number // For blood pressure (diastolic)

  // Context
  measuredAt: Date
  measuredBy: 'staff' | 'patient' | 'device'
  staffId?: string
  deviceId?: string

  // Assessment
  status: VitalStatus
  isManualEntry: boolean
  notes?: string
}

export interface VitalRange {
  type: VitalType
  unit: string
  normalMin: number
  normalMax: number
  warningMin: number
  warningMax: number
  criticalMin: number
  criticalMax: number
}

// Current vitals snapshot for a patient
export interface CurrentVitals {
  patientId: string
  lastUpdated: Date

  spo2?: {
    value: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }

  blutdruck?: {
    systolic: number
    diastolic: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }

  puls?: {
    value: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }

  temperatur?: {
    value: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }

  gewicht?: {
    value: number
    trend: TrendDirection
    changeFromYesterday?: number // kg
    status: VitalStatus
    measuredAt: Date
  }

  atemfrequenz?: {
    value: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }

  blutzucker?: {
    value: number
    trend: TrendDirection
    status: VitalStatus
    measuredAt: Date
  }
}

// Lab results
export type LabCategory = 'blutbild' | 'elektrolyte' | 'nierenwerte' | 'leberwerte' | 'gerinnung' | 'entzündung' | 'sonstige'

export interface LabResult {
  id: string
  patientId: string
  orderedAt: Date
  collectedAt?: Date
  resultAt?: Date

  // Test
  testName: string // e.g., "BNP", "Kreatinin"
  category: LabCategory
  value: number
  unit: string
  referenceRange: string // e.g., "< 100 pg/ml"

  // Assessment
  isAbnormal: boolean
  isCritical: boolean
  interpretation?: string

  // Source
  labName: string
  orderedBy: string
}

// For charts/history
export interface VitalHistory {
  patientId: string
  type: VitalType
  readings: {
    timestamp: Date
    value: number
    secondaryValue?: number
    status: VitalStatus
  }[]
  period: '24h' | '7d' | '30d'
}

// Device telemetry (for telemonitoring)
export interface TelemetryDevice {
  id: string
  patientId: string
  type: 'pulsoximeter' | 'blutdruckmessgerät' | 'waage' | 'thermometer' | 'glukometer'
  brand: string
  model: string
  serialNumber: string
  lastSync: Date
  batteryLevel: number
  isConnected: boolean
}
