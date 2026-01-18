/**
 * CarePilot Medical Components
 *
 * Domain-specific components for the Hospital at Home application.
 * These components handle healthcare-specific UI patterns like
 * vital signs, patient cards, alerts, medications, and visits.
 */

// Vital Signs
export { VitalCard, VitalsGrid } from './vital-card'
export type { VitalCardProps, VitalType } from './vital-card'

// Patient
export { PatientCard, PatientList } from './patient-card'
export type { PatientCardProps } from './patient-card'

// Alerts
export { AlertCard, AlertList } from './alert-card'
export type { AlertCardProps } from './alert-card'

// Medications
export { MedicationCard, MedicationList } from './medication-card'
export type { MedicationCardProps } from './medication-card'

// Visits
export { VisitCard, VisitTimeline } from './visit-card'
export type { VisitCardProps } from './visit-card'
