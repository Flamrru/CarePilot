/**
 * Alert/Notification state management with Zustand
 */

import { create } from 'zustand'
import type { Alert, AlertPriority, AlertStatus, AlertCategory } from '@/types'
import { alerts as initialAlerts } from '@/data/alerts'

interface AlertState {
  // Data
  alerts: Alert[]

  // Actions
  markAsRead: (id: string, userId: string) => void
  markAsHandled: (id: string, userId: string) => void
  dismissAlert: (id: string, reason: string) => void
  addAlert: (alert: Alert) => void

  // Computed
  getUnreadCount: () => number
  getUnreadByPriority: () => Record<AlertPriority, number>
  getAlertsByPriority: (priority: AlertPriority) => Alert[]
  getAlertsForPatient: (patientId: string) => Alert[]
  getGroupedAlerts: () => { priority: AlertPriority; alerts: Alert[] }[]

  // Reset
  reset: () => void
}

export const useAlertStore = create<AlertState>()((set, get) => ({
  alerts: initialAlerts,

  markAsRead: (id, userId) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? { ...a, status: 'gelesen' as AlertStatus, readAt: new Date(), readBy: userId }
          : a
      ),
    })),

  markAsHandled: (id, userId) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? { ...a, status: 'bearbeitet' as AlertStatus, handledAt: new Date(), handledBy: userId }
          : a
      ),
    })),

  dismissAlert: (id, reason) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? { ...a, status: 'ignoriert' as AlertStatus, ignoredReason: reason }
          : a
      ),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  // Computed
  getUnreadCount: () => {
    return get().alerts.filter((a) => a.status === 'neu').length
  },

  getUnreadByPriority: () => {
    const unread = get().alerts.filter((a) => a.status === 'neu')
    return {
      dringend: unread.filter((a) => a.priority === 'dringend').length,
      wichtig: unread.filter((a) => a.priority === 'wichtig').length,
      information: unread.filter((a) => a.priority === 'information').length,
    }
  },

  getAlertsByPriority: (priority) => {
    return get().alerts.filter((a) => a.priority === priority && a.status !== 'ignoriert')
  },

  getAlertsForPatient: (patientId) => {
    return get().alerts.filter((a) => a.patientId === patientId)
  },

  getGroupedAlerts: () => {
    const alerts = get().alerts.filter((a) => a.status !== 'ignoriert')
    const priorities: AlertPriority[] = ['dringend', 'wichtig', 'information']

    return priorities.map((priority) => ({
      priority,
      alerts: alerts.filter((a) => a.priority === priority),
    }))
  },

  reset: () => set({ alerts: initialAlerts }),
}))
