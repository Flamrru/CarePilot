/**
 * Demo state management for presentation scenarios
 */

import { create } from 'zustand'

export type ScenarioId =
  | 'critical-alert'
  | 'new-patient'
  | 'route-conflict'
  | 'patient-feedback'

export type ScenarioStatus = 'idle' | 'running' | 'completed'

interface ScenarioState {
  id: ScenarioId
  status: ScenarioStatus
  triggeredAt?: Date
  completedAt?: Date
}

interface DemoState {
  // Scenario tracking
  scenarios: Record<ScenarioId, ScenarioState>
  activeScenario: ScenarioId | null

  // Actions
  triggerScenario: (id: ScenarioId) => void
  completeScenario: (id: ScenarioId) => void
  resetScenario: (id: ScenarioId) => void
  resetAllScenarios: () => void

  // Computed
  getScenarioStatus: (id: ScenarioId) => ScenarioStatus
  hasActiveScenario: () => boolean
}

const initialScenarios: Record<ScenarioId, ScenarioState> = {
  'critical-alert': { id: 'critical-alert', status: 'idle' },
  'new-patient': { id: 'new-patient', status: 'idle' },
  'route-conflict': { id: 'route-conflict', status: 'idle' },
  'patient-feedback': { id: 'patient-feedback', status: 'idle' },
}

export const useDemoStore = create<DemoState>()((set, get) => ({
  scenarios: { ...initialScenarios },
  activeScenario: null,

  triggerScenario: (id) =>
    set((state) => ({
      scenarios: {
        ...state.scenarios,
        [id]: { ...state.scenarios[id], status: 'running', triggeredAt: new Date() },
      },
      activeScenario: id,
    })),

  completeScenario: (id) =>
    set((state) => ({
      scenarios: {
        ...state.scenarios,
        [id]: { ...state.scenarios[id], status: 'completed', completedAt: new Date() },
      },
      activeScenario: state.activeScenario === id ? null : state.activeScenario,
    })),

  resetScenario: (id) =>
    set((state) => ({
      scenarios: {
        ...state.scenarios,
        [id]: { id, status: 'idle' },
      },
    })),

  resetAllScenarios: () =>
    set({
      scenarios: { ...initialScenarios },
      activeScenario: null,
    }),

  getScenarioStatus: (id) => get().scenarios[id].status,

  hasActiveScenario: () => get().activeScenario !== null,
}))

// Scenario metadata for UI
export const scenarioMetadata: Record<ScenarioId, {
  title: string
  description: string
  icon: 'alert' | 'user-plus' | 'route' | 'clipboard'
  patientName?: string
}> = {
  'critical-alert': {
    title: 'SpO2-Abfall simulieren',
    description: 'Hans Gerbers SpO2 fällt auf 88%, löst kritische Warnung aus',
    icon: 'alert',
    patientName: 'Hans Gerber',
  },
  'new-patient': {
    title: 'Neuen Patienten aufnehmen',
    description: 'Schnellaufnahme eines neuen Patienten mit Route-Update',
    icon: 'user-plus',
  },
  'route-conflict': {
    title: 'Routenkonflikt auslösen',
    description: 'Dringende Visite kollidiert mit Zeitpräferenz von Fr. Meier',
    icon: 'route',
    patientName: 'Maria Meier',
  },
  'patient-feedback': {
    title: 'Besorgniserregendes Feedback',
    description: 'Patient meldet Verschlechterung im Fragebogen',
    icon: 'clipboard',
  },
}
