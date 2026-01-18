/**
 * Patient state management with Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Patient, PatientStatus, Priority, CurrentVitals } from '@/types'
import { patients as initialPatients, getPatientById as getInitialPatient } from '@/data/patients'
import { currentVitals as initialVitals } from '@/data/vitals'

interface PatientFilters {
  status?: PatientStatus[]
  priority?: Priority[]
  searchQuery?: string
  teamId?: string
}

interface PatientState {
  // Data
  patients: Patient[]
  vitals: Record<string, CurrentVitals>
  selectedPatientId: string | null

  // Filters
  filters: PatientFilters
  viewMode: 'list' | 'map'

  // Actions
  setSelectedPatient: (id: string | null) => void
  setFilters: (filters: Partial<PatientFilters>) => void
  setViewMode: (mode: 'list' | 'map') => void

  // Patient mutations (for demo scenarios)
  updatePatientStatus: (id: string, status: PatientStatus) => void
  updatePatientPriority: (id: string, priority: Priority) => void
  addPatient: (patient: Patient) => void

  // Vitals mutations
  updateVitals: (patientId: string, vitals: Partial<CurrentVitals>) => void

  // Computed
  getPatientById: (id: string) => Patient | undefined
  getFilteredPatients: () => Patient[]
  getPatientVitals: (id: string) => CurrentVitals | undefined

  // Reset
  reset: () => void
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      // Initial data
      patients: initialPatients,
      vitals: initialVitals,
      selectedPatientId: null,

      // Default filters
      filters: {},
      viewMode: 'list',

      // Actions
      setSelectedPatient: (id) => set({ selectedPatientId: id }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setViewMode: (mode) => set({ viewMode: mode }),

      updatePatientStatus: (id, status) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, status, updatedAt: new Date() } : p
          ),
        })),

      updatePatientPriority: (id, priority) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, priority, updatedAt: new Date() } : p
          ),
        })),

      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, patient],
        })),

      updateVitals: (patientId, newVitals) =>
        set((state) => ({
          vitals: {
            ...state.vitals,
            [patientId]: {
              ...state.vitals[patientId],
              ...newVitals,
              patientId,
              lastUpdated: new Date(),
            } as CurrentVitals,
          },
        })),

      // Computed getters
      getPatientById: (id) => {
        return get().patients.find((p) => p.id === id)
      },

      getFilteredPatients: () => {
        const { patients, filters } = get()
        let result = [...patients]

        if (filters.status?.length) {
          result = result.filter((p) => filters.status!.includes(p.status))
        }

        if (filters.priority?.length) {
          result = result.filter((p) => filters.priority!.includes(p.priority))
        }

        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase()
          result = result.filter(
            (p) =>
              p.firstName.toLowerCase().includes(query) ||
              p.lastName.toLowerCase().includes(query) ||
              p.diagnoses.some((d) => d.name.toLowerCase().includes(query))
          )
        }

        if (filters.teamId) {
          result = result.filter((p) => p.teamIds.includes(filters.teamId!))
        }

        return result
      },

      getPatientVitals: (id) => {
        return get().vitals[id]
      },

      // Reset to initial state
      reset: () =>
        set({
          patients: initialPatients,
          vitals: initialVitals,
          selectedPatientId: null,
          filters: {},
          viewMode: 'list',
        }),
    }),
    {
      name: 'carepilot-patients',
      partialize: (state) => ({
        // Only persist user preferences, not data
        filters: state.filters,
        viewMode: state.viewMode,
        selectedPatientId: state.selectedPatientId,
      }),
    }
  )
)
