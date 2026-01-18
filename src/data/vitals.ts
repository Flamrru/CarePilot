/**
 * Mock vital signs data for CarePilot demo
 * 7 days of history per patient with realistic trends
 */

import type { CurrentVitals, VitalHistory, VitalReading } from '@/types'

// Helper to create timestamps
const hoursAgo = (hours: number) => {
  const date = new Date()
  date.setHours(date.getHours() - hours)
  return date
}

// Current vitals for each patient
export const currentVitals: Record<string, CurrentVitals> = {
  'patient-001': {
    // Hans Gerber - Herzinsuffizienz (declining SpO2 for demo scenario)
    patientId: 'patient-001',
    lastUpdated: hoursAgo(2),
    spo2: {
      value: 91, // Borderline low - good for demo
      trend: 'fallend',
      status: 'erniedrigt',
      measuredAt: hoursAgo(2),
    },
    blutdruck: {
      systolic: 145,
      diastolic: 88,
      trend: 'stabil',
      status: 'erhöht',
      measuredAt: hoursAgo(2),
    },
    puls: {
      value: 82,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(2),
    },
    temperatur: {
      value: 36.8,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(2),
    },
    gewicht: {
      value: 89.2,
      trend: 'steigend',
      changeFromYesterday: 0.8, // Weight gain - concerning for heart failure
      status: 'erhöht',
      measuredAt: hoursAgo(8),
    },
  },

  'patient-002': {
    // Maria Meier - Pneumonie (improving)
    patientId: 'patient-002',
    lastUpdated: hoursAgo(4),
    spo2: {
      value: 95,
      trend: 'steigend',
      status: 'normal',
      measuredAt: hoursAgo(4),
    },
    blutdruck: {
      systolic: 128,
      diastolic: 78,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(4),
    },
    puls: {
      value: 76,
      trend: 'fallend',
      status: 'normal',
      measuredAt: hoursAgo(4),
    },
    temperatur: {
      value: 37.2,
      trend: 'fallend',
      status: 'normal',
      measuredAt: hoursAgo(4),
    },
    atemfrequenz: {
      value: 18,
      trend: 'fallend',
      status: 'normal',
      measuredAt: hoursAgo(4),
    },
  },

  'patient-003': {
    // Peter Schmidt - Post-OP (stable)
    patientId: 'patient-003',
    lastUpdated: hoursAgo(6),
    blutdruck: {
      systolic: 132,
      diastolic: 82,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(6),
    },
    puls: {
      value: 72,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(6),
    },
    temperatur: {
      value: 37.0,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(6),
    },
  },

  'patient-004': {
    // Elisabeth Brunner - Palliativ (comfort-focused)
    patientId: 'patient-004',
    lastUpdated: hoursAgo(3),
    spo2: {
      value: 93,
      trend: 'stabil',
      status: 'erniedrigt',
      measuredAt: hoursAgo(3),
    },
    blutdruck: {
      systolic: 110,
      diastolic: 68,
      trend: 'fallend',
      status: 'normal',
      measuredAt: hoursAgo(3),
    },
    puls: {
      value: 88,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(3),
    },
    temperatur: {
      value: 36.5,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(3),
    },
  },

  'patient-005': {
    // Franz Huber - COPD (oxygen-dependent)
    patientId: 'patient-005',
    lastUpdated: hoursAgo(1),
    spo2: {
      value: 92, // On O2
      trend: 'stabil',
      status: 'erniedrigt',
      measuredAt: hoursAgo(1),
    },
    blutdruck: {
      systolic: 138,
      diastolic: 84,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(1),
    },
    puls: {
      value: 78,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(1),
    },
    temperatur: {
      value: 36.9,
      trend: 'stabil',
      status: 'normal',
      measuredAt: hoursAgo(1),
    },
    atemfrequenz: {
      value: 20,
      trend: 'stabil',
      status: 'erhöht',
      measuredAt: hoursAgo(1),
    },
  },
}

// Generate 7-day history for Hans Gerber's SpO2 (declining trend for demo)
export const generateSpO2History = (patientId: string): VitalHistory => {
  const readings: VitalHistory['readings'] = []

  if (patientId === 'patient-001') {
    // Hans Gerber - declining SpO2
    const values = [96, 95, 95, 94, 93, 92, 91]
    for (let day = 6; day >= 0; day--) {
      const date = new Date()
      date.setDate(date.getDate() - day)
      date.setHours(8, 0, 0, 0)

      readings.push({
        timestamp: date,
        value: values[6 - day],
        status: values[6 - day] >= 95 ? 'normal' : values[6 - day] >= 92 ? 'erniedrigt' : 'kritisch',
      })
    }
  } else {
    // Other patients - stable
    for (let day = 6; day >= 0; day--) {
      const date = new Date()
      date.setDate(date.getDate() - day)
      date.setHours(8, 0, 0, 0)

      readings.push({
        timestamp: date,
        value: 95 + Math.floor(Math.random() * 3),
        status: 'normal',
      })
    }
  }

  return {
    patientId,
    type: 'spo2',
    readings,
    period: '7d',
  }
}

// Generate weight history (important for heart failure)
export const generateWeightHistory = (patientId: string): VitalHistory => {
  const readings: VitalHistory['readings'] = []

  if (patientId === 'patient-001') {
    // Hans Gerber - gradual weight gain (fluid retention)
    const baseWeight = 87.5
    const values = [0, 0.3, 0.5, 0.8, 1.2, 1.5, 1.7]
    for (let day = 6; day >= 0; day--) {
      const date = new Date()
      date.setDate(date.getDate() - day)
      date.setHours(7, 0, 0, 0)

      const weight = baseWeight + values[6 - day]
      readings.push({
        timestamp: date,
        value: weight,
        status: values[6 - day] > 1.5 ? 'erhöht' : 'normal',
      })
    }
  }

  return {
    patientId,
    type: 'gewicht',
    readings,
    period: '7d',
  }
}

// Get current vitals for a patient
export const getVitalsForPatient = (patientId: string): CurrentVitals | undefined => {
  return currentVitals[patientId]
}
