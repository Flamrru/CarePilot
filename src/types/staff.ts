/**
 * Staff/Team member types for CarePilot
 * Based on PRD section 3 - User Personas
 */

export type StaffRole = 'arzt' | 'pflegefachkraft' | 'koordinator' | 'admin'
export type Specialization =
  | 'Allgemeinmedizin'
  | 'Innere Medizin'
  | 'Kardiologie'
  | 'Pneumologie'
  | 'Geriatrie'
  | 'Palliativmedizin'
  | 'Onkologie'
  | 'Wundpflege'

export interface StaffMember {
  id: string

  // Personal
  firstName: string
  lastName: string
  title?: string // e.g., "Dr. med."
  role: StaffRole
  specializations: Specialization[]

  // Contact
  email: string
  phone: string

  // Work
  employeeId: string
  department: string
  isOnDuty: boolean
  workingDays: ('Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So')[]
  workingHours: {
    start: string // e.g., "08:00"
    end: string // e.g., "17:00"
  }

  // Assignment
  assignedPatientIds: string[]
  maxPatients: number

  // Profile
  photoUrl?: string
  bio?: string

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// Doctor-specific type
export interface Doctor extends StaffMember {
  role: 'arzt'
  medicalLicense: string
  canPrescribe: boolean
  canDischarge: boolean
}

// Nurse-specific type
export interface Nurse extends StaffMember {
  role: 'pflegefachkraft'
  nursingLicense: string
  certifications: string[] // e.g., ["Wundmanagement", "IV-Therapie"]
  canAdministerIV: boolean
}

// Coordinator-specific type
export interface Coordinator extends StaffMember {
  role: 'koordinator'
  managedTeamIds: string[]
  canSchedule: boolean
  canAssignPatients: boolean
}

// For display in UI
export interface StaffSummary {
  id: string
  fullName: string
  role: StaffRole
  title?: string
  isOnDuty: boolean
  photoUrl?: string
  patientCount: number
  phone: string
}

// Team grouping
export interface CareTeam {
  id: string
  name: string // e.g., "Team Laufen Süd"
  leaderId: string
  memberIds: string[]
  region: string
  color: string // For map display
}
