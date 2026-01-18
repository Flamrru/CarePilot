/**
 * Central export for all mock data
 */

// Patients
export { patients, getPatientById, calculateAge } from './patients'

// Staff
export { staff, careTeams, getStaffById, getStaffByRole, getOnDutyStaff } from './staff'

// Vitals
export {
  currentVitals,
  generateSpO2History,
  generateWeightHistory,
  getVitalsForPatient,
} from './vitals'

// Visits & Routes
export {
  todaysVisits,
  todaysRoute,
  todaysPreparations,
  getVisitById,
  getVisitsForPatient,
  getTodaysVisitsForStaff,
} from './visits'

// Alerts
export {
  alerts,
  quickMessages,
  getAlertsByPriority,
  getUnreadAlerts,
  getAlertsForPatient,
  getAlertCounts,
} from './alerts'

// AI Features
export {
  aiHints,
  aiChatResponses,
  smartActions,
  getHintsForPatient,
  getActionsForPatient,
  findChatResponse,
} from './ai-responses'

export {
  scribeExamples,
  simulatedTranscripts,
  getScribeExampleForPatient,
  defaultScribeExample,
} from './scribe-examples'
