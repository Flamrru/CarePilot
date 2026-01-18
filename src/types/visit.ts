/**
 * Visit, Task, and Route types for CarePilot
 * Based on PRD sections 4.4 and 4.5
 */

export type VisitStatus = 'geplant' | 'unterwegs' | 'aktiv' | 'abgeschlossen' | 'abgesagt'
export type TaskStatus = 'offen' | 'erledigt' | 'übersprungen'
export type TaskCategory = 'vital' | 'medikation' | 'labor' | 'pflege' | 'dokumentation' | 'beratung'

export interface VisitTask {
  id: string
  visitId: string

  // Task details
  title: string // e.g., "Blutdruck messen"
  description?: string
  category: TaskCategory

  // Status
  status: TaskStatus
  completedAt?: Date
  completedBy?: string
  skippedReason?: string

  // Requirements
  requiredMaterials?: string[] // e.g., ["Blutdruckmessgerät", "Handschuhe"]
  estimatedMinutes: number

  // Results
  result?: string // Free text or structured data
  notes?: string
}

export interface Visit {
  id: string
  patientId: string

  // Scheduling
  scheduledDate: Date
  scheduledTime: string // e.g., "09:00"
  estimatedDuration: number // minutes
  actualStartTime?: Date
  actualEndTime?: Date

  // Assignment
  assignedStaffIds: string[]
  primaryStaffId: string

  // Status
  status: VisitStatus

  // Tasks
  tasks: VisitTask[]
  completedTaskCount: number

  // Travel
  travelTimeFromPrevious?: number // minutes
  distanceFromPrevious?: number // km

  // Notes
  preVisitNotes?: string
  postVisitNotes?: string

  // Documentation
  documentationId?: string // Link to generated report
  ambientScribeId?: string // Link to voice recording

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// Route planning types
export interface RouteStop {
  patientId: string
  visitId: string
  order: number

  // Location
  address: {
    street: string
    city: string
    coordinates: { lat: number; lng: number }
  }

  // Timing
  arrivalTime: string // e.g., "09:00"
  departureTime: string // e.g., "09:45"
  dwellTime: number // minutes at patient

  // Travel to next
  travelTimeToNext?: number // minutes
  distanceToNext?: number // km

  // Status
  isCompleted: boolean
  hasConflict: boolean
  conflictReason?: string // e.g., "Patient bevorzugt Nachmittag"
}

export interface DailyRoute {
  id: string
  staffId: string
  date: Date

  // Stops
  stops: RouteStop[]

  // Stats
  totalPatients: number
  totalDistance: number // km
  totalTravelTime: number // minutes
  totalCareTime: number // minutes

  // Optimization
  isOptimized: boolean
  savedDistance?: number // km saved vs naive order
  savedTime?: number // minutes saved

  // Vehicle
  vehicleType: 'auto' | 'ebike' | 'zu_fuss'
  startLocation: { lat: number; lng: number }
  endLocation: { lat: number; lng: number }

  // Status
  status: 'geplant' | 'aktiv' | 'abgeschlossen'
  currentStopIndex?: number

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// For preparation/inventory view
export interface VisitPreparation {
  visitId: string
  patientId: string
  patientName: string

  materials: {
    category: string // "Medikamente", "Labor", "Pflege", "Dokumente"
    items: {
      name: string
      quantity?: number
      isPacked: boolean
    }[]
  }[]

  specialNotes: string[]
}
