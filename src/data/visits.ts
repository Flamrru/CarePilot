/**
 * Mock visit and route data for CarePilot demo
 */

import type { Visit, DailyRoute, VisitPreparation } from '@/types'

// Helper to create timestamps
const today = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

const todayAt = (hour: number, minute: number = 0) => {
  const date = today()
  date.setHours(hour, minute, 0, 0)
  return date
}

export const todaysVisits: Visit[] = [
  {
    id: 'visit-001',
    patientId: 'patient-001', // Hans Gerber
    scheduledDate: today(),
    scheduledTime: '08:30',
    estimatedDuration: 45,
    assignedStaffIds: ['staff-002'],
    primaryStaffId: 'staff-002',
    status: 'geplant',
    tasks: [
      {
        id: 'task-001',
        visitId: 'visit-001',
        title: 'Vitalzeichen messen',
        description: 'SpO2, RR, Puls, Temperatur',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Pulsoximeter', 'Blutdruckmessgerät', 'Fieberthermometer'],
        estimatedMinutes: 10,
      },
      {
        id: 'task-002',
        visitId: 'visit-001',
        title: 'Gewichtskontrolle',
        description: 'Tägliche Gewichtskontrolle wegen Herzinsuffizienz',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Personenwaage'],
        estimatedMinutes: 5,
      },
      {
        id: 'task-003',
        visitId: 'visit-001',
        title: 'Medikamentenkontrolle',
        description: 'Überprüfen ob Medikamente korrekt eingenommen',
        category: 'medikation',
        status: 'offen',
        estimatedMinutes: 10,
      },
      {
        id: 'task-004',
        visitId: 'visit-001',
        title: 'Ödeme beurteilen',
        description: 'Beinödeme prüfen und dokumentieren',
        category: 'pflege',
        status: 'offen',
        estimatedMinutes: 5,
      },
    ],
    completedTaskCount: 0,
    travelTimeFromPrevious: 0,
    preVisitNotes: 'SpO2 gestern leicht erniedrigt - besondere Aufmerksamkeit',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'visit-002',
    patientId: 'patient-005', // Franz Huber
    scheduledDate: today(),
    scheduledTime: '09:30',
    estimatedDuration: 40,
    assignedStaffIds: ['staff-002'],
    primaryStaffId: 'staff-002',
    status: 'geplant',
    tasks: [
      {
        id: 'task-005',
        visitId: 'visit-002',
        title: 'Vitalzeichen messen',
        description: 'SpO2 mit und ohne O2, RR, Puls',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Pulsoximeter', 'Blutdruckmessgerät'],
        estimatedMinutes: 15,
      },
      {
        id: 'task-006',
        visitId: 'visit-002',
        title: 'Sauerstoffgerät prüfen',
        description: 'Füllstand und Funktion kontrollieren',
        category: 'pflege',
        status: 'offen',
        estimatedMinutes: 10,
      },
      {
        id: 'task-007',
        visitId: 'visit-002',
        title: 'Inhalation begleiten',
        description: 'Korrekte Inhalationstechnik überprüfen',
        category: 'medikation',
        status: 'offen',
        estimatedMinutes: 10,
      },
    ],
    completedTaskCount: 0,
    travelTimeFromPrevious: 15,
    distanceFromPrevious: 8.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'visit-003',
    patientId: 'patient-002', // Maria Meier
    scheduledDate: today(),
    scheduledTime: '10:30',
    estimatedDuration: 35,
    assignedStaffIds: ['staff-002'],
    primaryStaffId: 'staff-002',
    status: 'geplant',
    tasks: [
      {
        id: 'task-008',
        visitId: 'visit-003',
        title: 'Vitalzeichen messen',
        description: 'SpO2, RR, Puls, Temperatur',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Pulsoximeter', 'Blutdruckmessgerät', 'Fieberthermometer'],
        estimatedMinutes: 10,
      },
      {
        id: 'task-009',
        visitId: 'visit-003',
        title: 'Lungenauskulatation',
        description: 'Atemgeräusche beurteilen',
        category: 'pflege',
        status: 'offen',
        requiredMaterials: ['Stethoskop'],
        estimatedMinutes: 10,
      },
      {
        id: 'task-010',
        visitId: 'visit-003',
        title: 'Antibiotika-Einnahme besprechen',
        description: 'Restdauer und Wichtigkeit erklären',
        category: 'beratung',
        status: 'offen',
        estimatedMinutes: 10,
      },
    ],
    completedTaskCount: 0,
    travelTimeFromPrevious: 12,
    distanceFromPrevious: 6.2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'visit-004',
    patientId: 'patient-004', // Elisabeth Brunner
    scheduledDate: today(),
    scheduledTime: '14:00',
    estimatedDuration: 60,
    assignedStaffIds: ['staff-002', 'staff-003'],
    primaryStaffId: 'staff-002',
    status: 'geplant',
    tasks: [
      {
        id: 'task-011',
        visitId: 'visit-004',
        title: 'Schmerzsituation erfassen',
        description: 'Schmerzintensität, Lokalisation, Durchbruchschmerzen',
        category: 'pflege',
        status: 'offen',
        estimatedMinutes: 15,
      },
      {
        id: 'task-012',
        visitId: 'visit-004',
        title: 'Vitalzeichen messen',
        description: 'SpO2, RR, Puls',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Pulsoximeter', 'Blutdruckmessgerät'],
        estimatedMinutes: 10,
      },
      {
        id: 'task-013',
        visitId: 'visit-004',
        title: 'Körperpflege unterstützen',
        description: 'Hilfe bei der Körperpflege nach Wunsch',
        category: 'pflege',
        status: 'offen',
        estimatedMinutes: 20,
      },
      {
        id: 'task-014',
        visitId: 'visit-004',
        title: 'Gespräch mit Angehörigen',
        description: 'Tochter ist anwesend, Austausch über Situation',
        category: 'beratung',
        status: 'offen',
        estimatedMinutes: 15,
      },
    ],
    completedTaskCount: 0,
    travelTimeFromPrevious: 18,
    distanceFromPrevious: 9.8,
    preVisitNotes: 'Palliative Situation. Schmerzeinstellung überprüfen.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'visit-005',
    patientId: 'patient-003', // Peter Schmidt
    scheduledDate: today(),
    scheduledTime: '15:30',
    estimatedDuration: 45,
    assignedStaffIds: ['staff-003'],
    primaryStaffId: 'staff-003',
    status: 'geplant',
    tasks: [
      {
        id: 'task-015',
        visitId: 'visit-005',
        title: 'Wundkontrolle',
        description: 'OP-Narbe kontrollieren, Verbandwechsel wenn nötig',
        category: 'pflege',
        status: 'offen',
        requiredMaterials: ['Verbandmaterial', 'Sterile Handschuhe', 'Desinfektionsmittel'],
        estimatedMinutes: 15,
      },
      {
        id: 'task-016',
        visitId: 'visit-005',
        title: 'Thromboseprophylaxe verabreichen',
        description: 'Enoxaparin s.c. injizieren',
        category: 'medikation',
        status: 'offen',
        requiredMaterials: ['Enoxaparin Fertigspritze'],
        estimatedMinutes: 5,
      },
      {
        id: 'task-017',
        visitId: 'visit-005',
        title: 'Mobilisation überprüfen',
        description: 'Gehstrecke und Belastung dokumentieren',
        category: 'pflege',
        status: 'offen',
        requiredMaterials: ['Gehhilfen'],
        estimatedMinutes: 15,
      },
      {
        id: 'task-018',
        visitId: 'visit-005',
        title: 'Vitalzeichen messen',
        description: 'RR, Puls, Temperatur',
        category: 'vital',
        status: 'offen',
        requiredMaterials: ['Blutdruckmessgerät', 'Fieberthermometer'],
        estimatedMinutes: 10,
      },
    ],
    completedTaskCount: 0,
    travelTimeFromPrevious: 20,
    distanceFromPrevious: 12.4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Today's optimized route
export const todaysRoute: DailyRoute = {
  id: 'route-today',
  staffId: 'staff-002',
  date: today(),

  stops: [
    {
      patientId: 'patient-001',
      visitId: 'visit-001',
      order: 1,
      address: {
        street: 'Bahnhofstrasse 12',
        city: 'Laufen',
        coordinates: { lat: 47.4225, lng: 7.5019 },
      },
      arrivalTime: '08:30',
      departureTime: '09:15',
      dwellTime: 45,
      travelTimeToNext: 15,
      distanceToNext: 8.5,
      isCompleted: false,
      hasConflict: false,
    },
    {
      patientId: 'patient-005',
      visitId: 'visit-002',
      order: 2,
      address: {
        street: 'Mühleweg 5',
        city: 'Wahlen',
        coordinates: { lat: 47.3989, lng: 7.5234 },
      },
      arrivalTime: '09:30',
      departureTime: '10:10',
      dwellTime: 40,
      travelTimeToNext: 12,
      distanceToNext: 6.2,
      isCompleted: false,
      hasConflict: false,
    },
    {
      patientId: 'patient-002',
      visitId: 'visit-003',
      order: 3,
      address: {
        street: 'Röschenzstrasse 45',
        city: 'Laufen',
        coordinates: { lat: 47.4198, lng: 7.4987 },
      },
      arrivalTime: '10:30',
      departureTime: '11:05',
      dwellTime: 35,
      travelTimeToNext: 18,
      distanceToNext: 9.8,
      isCompleted: false,
      hasConflict: false,
    },
    {
      patientId: 'patient-004',
      visitId: 'visit-004',
      order: 4,
      address: {
        street: 'Dorfstrasse 23',
        city: 'Röschenz',
        coordinates: { lat: 47.4456, lng: 7.4623 },
      },
      arrivalTime: '14:00',
      departureTime: '15:00',
      dwellTime: 60,
      travelTimeToNext: 20,
      distanceToNext: 12.4,
      isCompleted: false,
      hasConflict: false,
    },
    {
      patientId: 'patient-003',
      visitId: 'visit-005',
      order: 5,
      address: {
        street: 'Hauptstrasse 78',
        city: 'Kleinlützel',
        coordinates: { lat: 47.4312, lng: 7.4156 },
      },
      arrivalTime: '15:30',
      departureTime: '16:15',
      dwellTime: 45,
      isCompleted: false,
      hasConflict: false,
    },
  ],

  totalPatients: 5,
  totalDistance: 67,
  totalTravelTime: 65,
  totalCareTime: 225,

  isOptimized: true,
  savedDistance: 27, // 94km naive vs 67km optimized
  savedTime: 35,

  vehicleType: 'auto',
  startLocation: { lat: 47.4225, lng: 7.4987 }, // KSBL Laufen
  endLocation: { lat: 47.4225, lng: 7.4987 },

  status: 'geplant',

  createdAt: new Date(),
  updatedAt: new Date(),
}

// Visit preparation for today
export const todaysPreparations: VisitPreparation[] = [
  {
    visitId: 'visit-001',
    patientId: 'patient-001',
    patientName: 'Hans Gerber',
    materials: [
      {
        category: 'Vitalzeichen',
        items: [
          { name: 'Pulsoximeter', isPacked: false },
          { name: 'Blutdruckmessgerät', isPacked: false },
          { name: 'Fieberthermometer', isPacked: false },
          { name: 'Personenwaage', isPacked: false },
        ],
      },
      {
        category: 'Dokumentation',
        items: [
          { name: 'Tablet/Dokumentation', isPacked: false },
        ],
      },
    ],
    specialNotes: [
      'SpO2 gestern erniedrigt - genau beobachten',
      'Klingel defekt - klopfen',
      'Hund im Haus (freundlich)',
    ],
  },
  // Add more preparations as needed
]

// Helper functions
export const getVisitById = (id: string): Visit | undefined => {
  return todaysVisits.find((v) => v.id === id)
}

export const getVisitsForPatient = (patientId: string): Visit[] => {
  return todaysVisits.filter((v) => v.patientId === patientId)
}

export const getTodaysVisitsForStaff = (staffId: string): Visit[] => {
  return todaysVisits.filter((v) => v.assignedStaffIds.includes(staffId))
}
