/**
 * Mock staff data for CarePilot demo
 * Based on PRD section 3 - User Personas
 */

import type { StaffMember, CareTeam } from '@/types'

export const staff: StaffMember[] = [
  {
    id: 'staff-001',
    firstName: 'Sarah',
    lastName: 'Müller',
    title: 'Dr. med.',
    role: 'arzt',
    specializations: ['Innere Medizin', 'Kardiologie'],

    email: 'sarah.mueller@ksbl.ch',
    phone: '+41 61 925 21 21',

    employeeId: 'KSBL-A-001',
    department: 'Spital zuhause',
    isOnDuty: true,
    workingDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    workingHours: { start: '08:00', end: '17:00' },

    assignedPatientIds: ['patient-001', 'patient-002', 'patient-003', 'patient-004', 'patient-005'],
    maxPatients: 15,

    photoUrl: '/avatars/sarah-mueller.jpg',
    bio: 'Fachärztin für Innere Medizin mit Schwerpunkt Kardiologie. Seit 2020 Leiterin des Spital-zuhause-Programms.',

    createdAt: new Date('2020-01-15'),
    updatedAt: new Date(),
  },

  {
    id: 'staff-002',
    firstName: 'Marco',
    lastName: 'Bianchi',
    role: 'pflegefachkraft',
    specializations: ['Wundpflege'],

    email: 'marco.bianchi@ksbl.ch',
    phone: '+41 61 925 21 22',

    employeeId: 'KSBL-P-002',
    department: 'Spital zuhause',
    isOnDuty: true,
    workingDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    workingHours: { start: '07:00', end: '16:00' },

    assignedPatientIds: ['patient-001', 'patient-002', 'patient-004'],
    maxPatients: 8,

    photoUrl: '/avatars/marco-bianchi.jpg',
    bio: 'Diplomierter Pflegefachmann mit Zusatzausbildung in Wundmanagement. 8 Jahre Erfahrung in der Akutpflege.',

    createdAt: new Date('2021-03-01'),
    updatedAt: new Date(),
  },

  {
    id: 'staff-003',
    firstName: 'Anna',
    lastName: 'Weber',
    role: 'pflegefachkraft',
    specializations: ['Palliativmedizin', 'Geriatrie'],

    email: 'anna.weber@ksbl.ch',
    phone: '+41 61 925 21 23',

    employeeId: 'KSBL-P-003',
    department: 'Spital zuhause',
    isOnDuty: true,
    workingDays: ['Mo', 'Di', 'Mi', 'Fr', 'Sa'],
    workingHours: { start: '08:00', end: '17:00' },

    assignedPatientIds: ['patient-003', 'patient-005'],
    maxPatients: 8,

    photoUrl: '/avatars/anna-weber.jpg',
    bio: 'Pflegefachfrau mit CAS in Palliative Care. Spezialisiert auf die Betreuung von Patienten in komplexen Situationen.',

    createdAt: new Date('2019-06-15'),
    updatedAt: new Date(),
  },

  {
    id: 'staff-004',
    firstName: 'Claudia',
    lastName: 'Frei',
    role: 'koordinator',
    specializations: [],

    email: 'claudia.frei@ksbl.ch',
    phone: '+41 61 925 21 20',

    employeeId: 'KSBL-K-004',
    department: 'Spital zuhause',
    isOnDuty: true,
    workingDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    workingHours: { start: '07:30', end: '16:30' },

    assignedPatientIds: [],
    maxPatients: 0,

    photoUrl: '/avatars/claudia-frei.jpg',
    bio: 'Koordinatorin und Ansprechperson für Patientenaufnahmen und Routenplanung.',

    createdAt: new Date('2020-08-01'),
    updatedAt: new Date(),
  },
]

export const careTeams: CareTeam[] = [
  {
    id: 'team-001',
    name: 'Team Laufental',
    leaderId: 'staff-001',
    memberIds: ['staff-001', 'staff-002', 'staff-003', 'staff-004'],
    region: 'Laufental',
    color: '#2563EB',
  },
]

// Helper functions
export const getStaffById = (id: string): StaffMember | undefined => {
  return staff.find((s) => s.id === id)
}

export const getStaffByRole = (role: StaffMember['role']): StaffMember[] => {
  return staff.filter((s) => s.role === role)
}

export const getOnDutyStaff = (): StaffMember[] => {
  return staff.filter((s) => s.isOnDuty)
}
