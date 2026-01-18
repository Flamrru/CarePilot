/**
 * Mock alerts data for CarePilot demo
 * Based on PRD section 4.7 and demo scenarios
 */

import type { Alert, QuickMessage } from '@/types'

const hoursAgo = (hours: number) => {
  const date = new Date()
  date.setHours(date.getHours() - hours)
  return date
}

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    patientId: 'patient-001',
    title: 'SpO2 unter Grenzwert',
    message: 'Hans Gerber: SpO2 bei 91% (Grenzwert: 92%). Trend fallend über 3 Tage.',
    category: 'vital',
    priority: 'dringend',
    status: 'neu',
    suggestedActions: [
      { label: 'Patient anrufen', action: 'call' },
      { label: 'Visite vorziehen', action: 'visit' },
      { label: 'Details ansehen', action: 'view', targetUrl: '/staff/patients/patient-001' },
    ],
    aiTriaged: true,
    aiRationale: 'SpO2-Abfall bei Patient mit Herzinsuffizienz ist potentiell kritisch. Empfehle zeitnahe Evaluation.',
    source: 'telemetry',
    sourceId: 'vital-reading-123',
    createdAt: hoursAgo(2),
  },

  {
    id: 'alert-002',
    patientId: 'patient-001',
    title: 'Gewichtszunahme beachten',
    message: 'Hans Gerber: +1.7kg in 7 Tagen. Bei Herzinsuffizienz auf Flüssigkeitsretention achten.',
    category: 'vital',
    priority: 'wichtig',
    status: 'neu',
    suggestedActions: [
      { label: 'Diuretika anpassen?', action: 'view' },
      { label: 'Details ansehen', action: 'view', targetUrl: '/staff/patients/patient-001' },
    ],
    aiTriaged: true,
    aiRationale: 'Gewichtszunahme >1.5kg/Woche bei Herzinsuffizienz kann auf Dekompensation hinweisen.',
    source: 'telemetry',
    createdAt: hoursAgo(8),
  },

  {
    id: 'alert-003',
    patientId: 'patient-004',
    title: 'Schmerzmedikation überprüfen',
    message: 'Elisabeth Brunner: Hat gestern 4x Reserve-Morphin benötigt. Eventuell Basismedikation erhöhen.',
    category: 'medikation',
    priority: 'wichtig',
    status: 'neu',
    suggestedActions: [
      { label: 'Arzt informieren', action: 'message' },
      { label: 'Details ansehen', action: 'view', targetUrl: '/staff/patients/patient-004' },
    ],
    aiTriaged: true,
    aiRationale: 'Häufiger Reservebedarf kann auf inadäquate Basisschmerztherapie hinweisen.',
    source: 'questionnaire',
    createdAt: hoursAgo(12),
  },

  {
    id: 'alert-004',
    patientId: 'patient-002',
    title: 'Antibiotika-Ende naht',
    message: 'Maria Meier: Antibiotikum endet in 3 Tagen. Abschlussbesprechung planen.',
    category: 'medikation',
    priority: 'information',
    status: 'neu',
    suggestedActions: [
      { label: 'Termin planen', action: 'visit' },
    ],
    aiTriaged: true,
    aiRationale: 'Erinnerung an Therapieende zur Nachsorgeplanung.',
    source: 'system',
    createdAt: hoursAgo(24),
  },

  {
    id: 'alert-005',
    patientId: 'patient-003',
    title: 'Physiotherapie-Termin',
    message: 'Peter Schmidt: Physio kommt heute um 10:00 Uhr. Besuch eventuell koordinieren.',
    category: 'termin',
    priority: 'information',
    status: 'gelesen',
    readAt: hoursAgo(1),
    readBy: 'staff-002',
    aiTriaged: false,
    source: 'system',
    createdAt: hoursAgo(48),
  },

  {
    id: 'alert-006',
    patientId: undefined,
    title: 'Route optimiert',
    message: 'Heutige Route wurde neu berechnet. 27km eingespart gegenüber manueller Planung.',
    category: 'system',
    priority: 'information',
    status: 'gelesen',
    readAt: hoursAgo(6),
    readBy: 'staff-002',
    aiTriaged: false,
    source: 'system',
    createdAt: hoursAgo(8),
  },
]

// Quick messages for patient app
export const quickMessages: QuickMessage[] = [
  {
    id: 'qm-001',
    text: 'Mir geht es schlechter',
    category: 'status',
    icon: 'AlertCircle',
    triggersAlert: true,
    alertPriority: 'wichtig',
  },
  {
    id: 'qm-002',
    text: 'Ich habe Fragen zu meinen Medikamenten',
    category: 'medication',
    icon: 'Pill',
    triggersAlert: false,
  },
  {
    id: 'qm-003',
    text: 'Ich brauche einen früheren Termin',
    category: 'appointment',
    icon: 'Calendar',
    triggersAlert: false,
  },
  {
    id: 'qm-004',
    text: 'Wann kommt das Team heute?',
    category: 'question',
    icon: 'Clock',
    triggersAlert: false,
  },
  {
    id: 'qm-005',
    text: 'Ich habe Schmerzen',
    category: 'status',
    icon: 'Activity',
    triggersAlert: true,
    alertPriority: 'wichtig',
  },
  {
    id: 'qm-006',
    text: 'Alles in Ordnung, danke!',
    category: 'status',
    icon: 'ThumbsUp',
    triggersAlert: false,
  },
]

// Helper functions
export const getAlertsByPriority = (priority: Alert['priority']): Alert[] => {
  return alerts.filter((a) => a.priority === priority && a.status !== 'ignoriert')
}

export const getUnreadAlerts = (): Alert[] => {
  return alerts.filter((a) => a.status === 'neu')
}

export const getAlertsForPatient = (patientId: string): Alert[] => {
  return alerts.filter((a) => a.patientId === patientId)
}

export const getAlertCounts = () => {
  const unread = alerts.filter((a) => a.status === 'neu')
  return {
    total: unread.length,
    dringend: unread.filter((a) => a.priority === 'dringend').length,
    wichtig: unread.filter((a) => a.priority === 'wichtig').length,
    information: unread.filter((a) => a.priority === 'information').length,
  }
}
