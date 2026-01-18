/**
 * Patient domain types for CarePilot
 * Based on PRD section 9 - Mock Data Architecture
 */

export type PatientStatus = 'stabil' | 'beobachten' | 'kritisch'
export type Priority = 'dringend' | 'normal' | 'flexibel'
export type Gender = 'männlich' | 'weiblich' | 'divers'

export interface Address {
  street: string
  houseNumber: string
  postalCode: string
  city: string
  canton: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface EmergencyContact {
  name: string
  relationship: string // e.g., "Ehefrau", "Sohn", "Tochter"
  phone: string
  isMainContact: boolean
}

export interface Diagnosis {
  id: string
  name: string // e.g., "Herzinsuffizienz NYHA III"
  icdCode: string
  isPrimary: boolean
  diagnosedAt: Date
  notes?: string
}

export interface Allergy {
  id: string
  substance: string
  severity: 'mild' | 'moderat' | 'schwer'
  reaction?: string
}

export interface Medication {
  id: string
  name: string // e.g., "Torasemid"
  dosage: string // e.g., "20mg"
  frequency: string // e.g., "1-0-0" (morning-noon-evening)
  route: 'oral' | 'iv' | 'sc' | 'im' | 'topisch'
  indication?: string
  startDate: Date
  endDate?: Date
  instructions?: string // e.g., "Mit Wasser einnehmen"
}

export interface PatientPreferences {
  preferredVisitTime?: string // e.g., "Vormittags"
  preferredLanguage: string // e.g., "Deutsch"
  specialNeeds?: string[] // e.g., ["Schwerhörig", "Rollstuhl"]
  notes?: string // e.g., "Klingel defekt, bitte klopfen"
}

export interface InsuranceInfo {
  provider: string // e.g., "CSS Krankenversicherung"
  policyNumber: string
  type: 'Grundversicherung' | 'Halbprivat' | 'Privat'
}

export interface Patient {
  id: string

  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: Gender
  ahvNumber: string // Swiss social security number (format: 756.xxxx.xxxx.xx)

  // Contact
  address: Address
  phone: string
  email?: string
  emergencyContacts: EmergencyContact[]

  // Medical
  diagnoses: Diagnosis[]
  allergies: Allergy[]
  medications: Medication[]

  // Care Program
  programStartDate: Date
  programEndDate: Date
  currentDay: number // Day X of program
  totalDays: number // Total expected days
  status: PatientStatus
  priority: Priority

  // Assignment
  primaryDoctorId: string
  primaryNurseId: string
  teamIds: string[]

  // Other
  insurance: InsuranceInfo
  preferences: PatientPreferences
  photoUrl?: string

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// For displaying patient cards/lists
export interface PatientSummary {
  id: string
  fullName: string
  age: number
  mainDiagnosis: string
  status: PatientStatus
  priority: Priority
  currentDay: number
  totalDays: number
  address: Address
  nextVisitTime?: Date
  lastVitalsAt?: Date
  alertCount: number
}
