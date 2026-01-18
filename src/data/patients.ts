/**
 * Mock patient data for CarePilot demo
 * Based on PRD section 9.1 - 5 patients in Laufental region
 */

import type { Patient } from '@/types'

// Helper to create relative dates
const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

const daysFromNow = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export const patients: Patient[] = [
  {
    id: 'patient-001',
    firstName: 'Hans',
    lastName: 'Gerber',
    dateOfBirth: new Date('1948-03-15'),
    gender: 'männlich',
    ahvNumber: '756.1234.5678.90',

    address: {
      street: 'Bahnhofstrasse',
      houseNumber: '12',
      postalCode: '4242',
      city: 'Laufen',
      canton: 'BL',
      coordinates: { lat: 47.4225, lng: 7.5019 },
    },
    phone: '+41 61 761 12 34',
    email: 'hans.gerber@bluewin.ch',
    emergencyContacts: [
      {
        name: 'Ursula Gerber',
        relationship: 'Ehefrau',
        phone: '+41 79 123 45 67',
        isMainContact: true,
      },
      {
        name: 'Thomas Gerber',
        relationship: 'Sohn',
        phone: '+41 79 234 56 78',
        isMainContact: false,
      },
    ],

    diagnoses: [
      {
        id: 'diag-001',
        name: 'Herzinsuffizienz NYHA III',
        icdCode: 'I50.9',
        isPrimary: true,
        diagnosedAt: daysAgo(180),
        notes: 'Dekompensation vor 2 Wochen, seither Rekompensation',
      },
      {
        id: 'diag-002',
        name: 'Arterielle Hypertonie',
        icdCode: 'I10',
        isPrimary: false,
        diagnosedAt: daysAgo(3650),
      },
      {
        id: 'diag-003',
        name: 'Diabetes mellitus Typ 2',
        icdCode: 'E11',
        isPrimary: false,
        diagnosedAt: daysAgo(2000),
      },
    ],

    allergies: [
      {
        id: 'allergy-001',
        substance: 'Penicillin',
        severity: 'schwer',
        reaction: 'Anaphylaxie',
      },
    ],

    medications: [
      {
        id: 'med-001',
        name: 'Torasemid',
        dosage: '20mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Diurese',
        startDate: daysAgo(14),
        instructions: 'Morgens vor dem Frühstück',
      },
      {
        id: 'med-002',
        name: 'Ramipril',
        dosage: '5mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Herzinsuffizienz',
        startDate: daysAgo(180),
      },
      {
        id: 'med-003',
        name: 'Metformin',
        dosage: '500mg',
        frequency: '1-0-1',
        route: 'oral',
        indication: 'Diabetes',
        startDate: daysAgo(2000),
        instructions: 'Zu den Mahlzeiten',
      },
      {
        id: 'med-004',
        name: 'Metoprolol',
        dosage: '47.5mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Herzfrequenzkontrolle',
        startDate: daysAgo(180),
      },
    ],

    programStartDate: daysAgo(5),
    programEndDate: daysFromNow(9),
    currentDay: 6,
    totalDays: 14,
    status: 'beobachten',
    priority: 'dringend',

    primaryDoctorId: 'staff-001',
    primaryNurseId: 'staff-002',
    teamIds: ['team-001'],

    insurance: {
      provider: 'CSS Krankenversicherung',
      policyNumber: 'CSS-123456789',
      type: 'Grundversicherung',
    },

    preferences: {
      preferredVisitTime: 'Vormittags (8-12 Uhr)',
      preferredLanguage: 'Deutsch',
      specialNeeds: ['Schwerhörig rechts'],
      notes: 'Klingel defekt, bitte klopfen. Hund (freundlich) im Haus.',
    },

    createdAt: daysAgo(5),
    updatedAt: new Date(),
  },

  {
    id: 'patient-002',
    firstName: 'Maria',
    lastName: 'Meier',
    dateOfBirth: new Date('1955-08-22'),
    gender: 'weiblich',
    ahvNumber: '756.2345.6789.01',

    address: {
      street: 'Röschenzstrasse',
      houseNumber: '45',
      postalCode: '4242',
      city: 'Laufen',
      canton: 'BL',
      coordinates: { lat: 47.4198, lng: 7.4987 },
    },
    phone: '+41 61 761 23 45',
    email: 'maria.meier@sunrise.ch',
    emergencyContacts: [
      {
        name: 'Peter Meier',
        relationship: 'Ehemann',
        phone: '+41 79 345 67 89',
        isMainContact: true,
      },
    ],

    diagnoses: [
      {
        id: 'diag-004',
        name: 'Ambulant erworbene Pneumonie',
        icdCode: 'J18.9',
        isPrimary: true,
        diagnosedAt: daysAgo(7),
        notes: 'Rechter Unterlappen, gute Rückbildung unter Antibiotika',
      },
      {
        id: 'diag-005',
        name: 'COPD GOLD II',
        icdCode: 'J44.1',
        isPrimary: false,
        diagnosedAt: daysAgo(1800),
      },
    ],

    allergies: [],

    medications: [
      {
        id: 'med-005',
        name: 'Amoxicillin/Clavulansäure',
        dosage: '1g',
        frequency: '1-0-1',
        route: 'oral',
        indication: 'Pneumonie',
        startDate: daysAgo(7),
        endDate: daysFromNow(3),
        instructions: 'Antibiotikum unbedingt zu Ende nehmen',
      },
      {
        id: 'med-006',
        name: 'Salbutamol DA',
        dosage: '100mcg',
        frequency: 'bei Bedarf',
        route: 'oral',
        indication: 'Bronchodilatation',
        startDate: daysAgo(1800),
        instructions: 'Max 4x täglich',
      },
    ],

    programStartDate: daysAgo(7),
    programEndDate: daysFromNow(3),
    currentDay: 8,
    totalDays: 10,
    status: 'stabil',
    priority: 'normal',

    primaryDoctorId: 'staff-001',
    primaryNurseId: 'staff-002',
    teamIds: ['team-001'],

    insurance: {
      provider: 'Helsana',
      policyNumber: 'HEL-987654321',
      type: 'Halbprivat',
    },

    preferences: {
      preferredVisitTime: 'Nachmittags (14-17 Uhr)',
      preferredLanguage: 'Deutsch',
      notes: 'Ehemann ist tagsüber arbeiten, Schlüssel unter Fussmatte',
    },

    createdAt: daysAgo(7),
    updatedAt: new Date(),
  },

  {
    id: 'patient-003',
    firstName: 'Peter',
    lastName: 'Schmidt',
    dateOfBirth: new Date('1962-11-30'),
    gender: 'männlich',
    ahvNumber: '756.3456.7890.12',

    address: {
      street: 'Hauptstrasse',
      houseNumber: '78',
      postalCode: '4245',
      city: 'Kleinlützel',
      canton: 'SO',
      coordinates: { lat: 47.4312, lng: 7.4156 },
    },
    phone: '+41 61 771 34 56',
    emergencyContacts: [
      {
        name: 'Sandra Schmidt',
        relationship: 'Ehefrau',
        phone: '+41 79 456 78 90',
        isMainContact: true,
      },
      {
        name: 'Markus Schmidt',
        relationship: 'Bruder',
        phone: '+41 79 567 89 01',
        isMainContact: false,
      },
    ],

    diagnoses: [
      {
        id: 'diag-006',
        name: 'Z.n. elektiver Hüft-TEP rechts',
        icdCode: 'Z96.64',
        isPrimary: true,
        diagnosedAt: daysAgo(4),
        notes: 'Komplikationsloser Verlauf, Mobilisation nach Plan',
      },
      {
        id: 'diag-007',
        name: 'Coxarthrose rechts',
        icdCode: 'M16.1',
        isPrimary: false,
        diagnosedAt: daysAgo(730),
      },
    ],

    allergies: [
      {
        id: 'allergy-002',
        substance: 'Ibuprofen',
        severity: 'moderat',
        reaction: 'Magenbeschwerden',
      },
    ],

    medications: [
      {
        id: 'med-007',
        name: 'Enoxaparin',
        dosage: '40mg',
        frequency: '0-0-1',
        route: 'sc',
        indication: 'Thromboseprophylaxe',
        startDate: daysAgo(4),
        endDate: daysFromNow(24),
        instructions: 'Subkutan in Bauchdecke',
      },
      {
        id: 'med-008',
        name: 'Paracetamol',
        dosage: '1g',
        frequency: '1-1-1-1',
        route: 'oral',
        indication: 'Schmerztherapie',
        startDate: daysAgo(4),
        instructions: 'Bei Bedarf, max 4g/Tag',
      },
      {
        id: 'med-009',
        name: 'Pantoprazol',
        dosage: '40mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Magenschutz',
        startDate: daysAgo(4),
      },
    ],

    programStartDate: daysAgo(4),
    programEndDate: daysFromNow(24),
    currentDay: 5,
    totalDays: 28,
    status: 'stabil',
    priority: 'normal',

    primaryDoctorId: 'staff-001',
    primaryNurseId: 'staff-003',
    teamIds: ['team-001'],

    insurance: {
      provider: 'Swica',
      policyNumber: 'SWI-456789123',
      type: 'Grundversicherung',
    },

    preferences: {
      preferredVisitTime: 'Vormittags (9-11 Uhr)',
      preferredLanguage: 'Deutsch',
      specialNeeds: ['Gehhilfen bereitstellen'],
      notes: 'Physio kommt Di/Do/Sa um 10 Uhr',
    },

    createdAt: daysAgo(4),
    updatedAt: new Date(),
  },

  {
    id: 'patient-004',
    firstName: 'Elisabeth',
    lastName: 'Brunner',
    dateOfBirth: new Date('1940-05-08'),
    gender: 'weiblich',
    ahvNumber: '756.4567.8901.23',

    address: {
      street: 'Dorfstrasse',
      houseNumber: '23',
      postalCode: '4244',
      city: 'Röschenz',
      canton: 'BL',
      coordinates: { lat: 47.4456, lng: 7.4623 },
    },
    phone: '+41 61 761 45 67',
    emergencyContacts: [
      {
        name: 'Anna Brunner',
        relationship: 'Tochter',
        phone: '+41 79 678 90 12',
        isMainContact: true,
      },
      {
        name: 'Karl Brunner',
        relationship: 'Sohn',
        phone: '+41 79 789 01 23',
        isMainContact: false,
      },
    ],

    diagnoses: [
      {
        id: 'diag-008',
        name: 'Metastasiertes Mammakarzinom',
        icdCode: 'C50.9',
        isPrimary: true,
        diagnosedAt: daysAgo(365),
        notes: 'Palliative Situation, Fokus auf Symptomkontrolle',
      },
      {
        id: 'diag-009',
        name: 'Knochenmetastasen LWS',
        icdCode: 'C79.51',
        isPrimary: false,
        diagnosedAt: daysAgo(180),
      },
      {
        id: 'diag-010',
        name: 'Chronische Schmerzen',
        icdCode: 'G89.29',
        isPrimary: false,
        diagnosedAt: daysAgo(180),
      },
    ],

    allergies: [],

    medications: [
      {
        id: 'med-010',
        name: 'Morphin retard',
        dosage: '30mg',
        frequency: '1-0-1',
        route: 'oral',
        indication: 'Schmerztherapie',
        startDate: daysAgo(90),
        instructions: 'Regelmässig, nicht auslassen',
      },
      {
        id: 'med-011',
        name: 'Morphin Tropfen',
        dosage: '10mg',
        frequency: 'bei Bedarf',
        route: 'oral',
        indication: 'Durchbruchschmerzen',
        startDate: daysAgo(90),
        instructions: 'Max 6x täglich als Reservemedikation',
      },
      {
        id: 'med-012',
        name: 'Macrogol',
        dosage: '1 Beutel',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Obstipationsprophylaxe',
        startDate: daysAgo(90),
      },
      {
        id: 'med-013',
        name: 'Dexamethason',
        dosage: '4mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Antiödematös',
        startDate: daysAgo(30),
      },
    ],

    programStartDate: daysAgo(21),
    programEndDate: daysFromNow(7),
    currentDay: 22,
    totalDays: 28,
    status: 'beobachten',
    priority: 'dringend',

    primaryDoctorId: 'staff-001',
    primaryNurseId: 'staff-002',
    teamIds: ['team-001'],

    insurance: {
      provider: 'Visana',
      policyNumber: 'VIS-234567890',
      type: 'Privat',
    },

    preferences: {
      preferredVisitTime: 'Flexibel',
      preferredLanguage: 'Deutsch',
      specialNeeds: ['Pflegebett vorhanden', 'Sauerstoff bereit'],
      notes: 'Tochter ist oft anwesend. Patientin wünscht keine Reanimation (Patientenverfügung).',
    },

    createdAt: daysAgo(21),
    updatedAt: new Date(),
  },

  {
    id: 'patient-005',
    firstName: 'Franz',
    lastName: 'Huber',
    dateOfBirth: new Date('1952-09-12'),
    gender: 'männlich',
    ahvNumber: '756.5678.9012.34',

    address: {
      street: 'Mühleweg',
      houseNumber: '5',
      postalCode: '4246',
      city: 'Wahlen',
      canton: 'BL',
      coordinates: { lat: 47.3989, lng: 7.5234 },
    },
    phone: '+41 61 761 56 78',
    email: 'franz.huber@gmx.ch',
    emergencyContacts: [
      {
        name: 'Heidi Huber',
        relationship: 'Ehefrau',
        phone: '+41 79 890 12 34',
        isMainContact: true,
      },
    ],

    diagnoses: [
      {
        id: 'diag-011',
        name: 'COPD GOLD III mit Exazerbation',
        icdCode: 'J44.1',
        isPrimary: true,
        diagnosedAt: daysAgo(10),
        notes: 'Akute Exazerbation, unter Therapie gebessert',
      },
      {
        id: 'diag-012',
        name: 'Respiratorische Insuffizienz',
        icdCode: 'J96.10',
        isPrimary: false,
        diagnosedAt: daysAgo(10),
      },
    ],

    allergies: [
      {
        id: 'allergy-003',
        substance: 'Sulfonamide',
        severity: 'moderat',
        reaction: 'Hautausschlag',
      },
    ],

    medications: [
      {
        id: 'med-014',
        name: 'Prednisolon',
        dosage: '20mg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'Exazerbation',
        startDate: daysAgo(10),
        endDate: daysFromNow(4),
        instructions: 'Ausschleichen ab Tag 10',
      },
      {
        id: 'med-015',
        name: 'Formoterol/Budesonid',
        dosage: '12/400mcg',
        frequency: '1-0-1',
        route: 'oral',
        indication: 'COPD',
        startDate: daysAgo(1800),
      },
      {
        id: 'med-016',
        name: 'Tiotropium',
        dosage: '18mcg',
        frequency: '1-0-0',
        route: 'oral',
        indication: 'COPD',
        startDate: daysAgo(1800),
      },
      {
        id: 'med-017',
        name: 'Sauerstoff',
        dosage: '2L/min',
        frequency: 'kontinuierlich',
        route: 'oral',
        indication: 'Hypoxämie',
        startDate: daysAgo(10),
        instructions: 'Über Nasenbrille, nachts und bei Belastung',
      },
    ],

    programStartDate: daysAgo(10),
    programEndDate: daysFromNow(4),
    currentDay: 11,
    totalDays: 14,
    status: 'beobachten',
    priority: 'normal',

    primaryDoctorId: 'staff-001',
    primaryNurseId: 'staff-003',
    teamIds: ['team-001'],

    insurance: {
      provider: 'Concordia',
      policyNumber: 'CON-345678901',
      type: 'Grundversicherung',
    },

    preferences: {
      preferredVisitTime: 'Morgens (8-10 Uhr)',
      preferredLanguage: 'Deutsch',
      specialNeeds: ['Sauerstoffgerät vorhanden'],
      notes: 'Raucher (aufgehört seit Hospitalisation). Atemnot bei Anstrengung.',
    },

    createdAt: daysAgo(10),
    updatedAt: new Date(),
  },
]

// Helper to get patient by ID
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

// Helper to calculate age
export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDiff = today.getMonth() - dateOfBirth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }
  return age
}
