/**
 * Route planning state management with Zustand
 */

import { create } from 'zustand'
import type { DailyRoute, RouteStop, Visit } from '@/types'
import { todaysRoute as initialRoute, todaysVisits as initialVisits } from '@/data/visits'

interface RouteState {
  // Data
  currentRoute: DailyRoute
  visits: Visit[]
  isNavigating: boolean
  currentStopIndex: number

  // Actions
  startNavigation: () => void
  stopNavigation: () => void
  advanceToNextStop: () => void
  goToStop: (index: number) => void
  completeStop: (stopIndex: number) => void
  reorderStops: (fromIndex: number, toIndex: number) => void
  recalculateRoute: () => void

  // Visit actions
  completeTask: (visitId: string, taskId: string) => void
  skipTask: (visitId: string, taskId: string, reason: string) => void
  updateVisitStatus: (visitId: string, status: Visit['status']) => void

  // Computed
  getCurrentStop: () => RouteStop | undefined
  getNextStop: () => RouteStop | undefined
  getProgress: () => { completed: number; total: number; percentage: number }
  getVisitForStop: (patientId: string) => Visit | undefined

  // Reset
  reset: () => void
}

export const useRouteStore = create<RouteState>()((set, get) => ({
  currentRoute: initialRoute,
  visits: initialVisits,
  isNavigating: false,
  currentStopIndex: 0,

  startNavigation: () =>
    set((state) => ({
      isNavigating: true,
      currentRoute: { ...state.currentRoute, status: 'aktiv' },
    })),

  stopNavigation: () =>
    set((state) => ({
      isNavigating: false,
      currentRoute: { ...state.currentRoute, status: 'geplant' },
    })),

  advanceToNextStop: () =>
    set((state) => {
      const nextIndex = state.currentStopIndex + 1
      if (nextIndex >= state.currentRoute.stops.length) {
        return {
          isNavigating: false,
          currentRoute: { ...state.currentRoute, status: 'abgeschlossen' },
        }
      }
      return { currentStopIndex: nextIndex }
    }),

  goToStop: (index) =>
    set({ currentStopIndex: Math.max(0, Math.min(index, get().currentRoute.stops.length - 1)) }),

  completeStop: (stopIndex) =>
    set((state) => ({
      currentRoute: {
        ...state.currentRoute,
        stops: state.currentRoute.stops.map((stop, i) =>
          i === stopIndex ? { ...stop, isCompleted: true } : stop
        ),
      },
    })),

  reorderStops: (fromIndex, toIndex) =>
    set((state) => {
      const stops = [...state.currentRoute.stops]
      const [removed] = stops.splice(fromIndex, 1)
      stops.splice(toIndex, 0, removed)
      // Re-assign order numbers
      const reorderedStops = stops.map((stop, i) => ({ ...stop, order: i + 1 }))
      return {
        currentRoute: { ...state.currentRoute, stops: reorderedStops },
      }
    }),

  recalculateRoute: () => {
    // In a real app, this would call an optimization API
    // For the demo, we just mark it as optimized
    set((state) => ({
      currentRoute: {
        ...state.currentRoute,
        isOptimized: true,
        updatedAt: new Date(),
      },
    }))
  },

  completeTask: (visitId, taskId) =>
    set((state) => ({
      visits: state.visits.map((visit) =>
        visit.id === visitId
          ? {
              ...visit,
              tasks: visit.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, status: 'erledigt', completedAt: new Date() }
                  : task
              ),
              completedTaskCount: visit.completedTaskCount + 1,
            }
          : visit
      ),
    })),

  skipTask: (visitId, taskId, reason) =>
    set((state) => ({
      visits: state.visits.map((visit) =>
        visit.id === visitId
          ? {
              ...visit,
              tasks: visit.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, status: 'übersprungen', skippedReason: reason }
                  : task
              ),
            }
          : visit
      ),
    })),

  updateVisitStatus: (visitId, status) =>
    set((state) => ({
      visits: state.visits.map((visit) =>
        visit.id === visitId ? { ...visit, status } : visit
      ),
    })),

  // Computed
  getCurrentStop: () => {
    const { currentRoute, currentStopIndex } = get()
    return currentRoute.stops[currentStopIndex]
  },

  getNextStop: () => {
    const { currentRoute, currentStopIndex } = get()
    return currentRoute.stops[currentStopIndex + 1]
  },

  getProgress: () => {
    const { currentRoute } = get()
    const completed = currentRoute.stops.filter((s) => s.isCompleted).length
    const total = currentRoute.stops.length
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    }
  },

  getVisitForStop: (patientId) => {
    return get().visits.find((v) => v.patientId === patientId)
  },

  reset: () =>
    set({
      currentRoute: initialRoute,
      visits: initialVisits,
      isNavigating: false,
      currentStopIndex: 0,
    }),
}))
