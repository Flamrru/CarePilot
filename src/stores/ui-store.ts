/**
 * UI state management with Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'
type SidebarState = 'expanded' | 'collapsed'
type ActiveInterface = 'staff' | 'patient' | 'family'

interface UIState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Sidebar
  sidebarState: SidebarState
  toggleSidebar: () => void
  setSidebarState: (state: SidebarState) => void

  // Active interface tracking
  activeInterface: ActiveInterface
  setActiveInterface: (iface: ActiveInterface) => void

  // Modals
  activeModal: string | null
  modalData: Record<string, unknown> | null
  openModal: (modalId: string, data?: Record<string, unknown>) => void
  closeModal: () => void

  // AI Sidebar
  isAISidebarOpen: boolean
  toggleAISidebar: () => void
  setAISidebarOpen: (open: boolean) => void

  // Demo mode
  isDemoMode: boolean
  toggleDemoMode: () => void
  showDemoPanel: boolean
  setShowDemoPanel: (show: boolean) => void

  // Loading states
  isLoading: boolean
  loadingMessage: string | null
  setLoading: (loading: boolean, message?: string) => void

  // Toast notifications
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[]
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void
  removeToast: (id: string) => void

  // Reset
  reset: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      setTheme: (theme) => {
        set({ theme })
        // Update document class for Tailwind dark mode
        if (typeof document !== 'undefined') {
          const root = document.documentElement
          if (theme === 'dark') {
            root.classList.add('dark')
          } else if (theme === 'light') {
            root.classList.remove('dark')
          } else {
            // System preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            root.classList.toggle('dark', prefersDark)
          }
        }
      },

      // Sidebar
      sidebarState: 'expanded',
      toggleSidebar: () =>
        set((state) => ({
          sidebarState: state.sidebarState === 'expanded' ? 'collapsed' : 'expanded',
        })),
      setSidebarState: (sidebarState) => set({ sidebarState }),

      // Active interface
      activeInterface: 'staff',
      setActiveInterface: (activeInterface) => set({ activeInterface }),

      // Modals
      activeModal: null,
      modalData: null,
      openModal: (modalId, data) => set({ activeModal: modalId, modalData: data || null }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // AI Sidebar
      isAISidebarOpen: false,
      toggleAISidebar: () => set((state) => ({ isAISidebarOpen: !state.isAISidebarOpen })),
      setAISidebarOpen: (open) => set({ isAISidebarOpen: open }),

      // Demo mode
      isDemoMode: true, // Start in demo mode for the mockup
      toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
      showDemoPanel: false,
      setShowDemoPanel: (show) => set({ showDemoPanel: show }),

      // Loading
      isLoading: false,
      loadingMessage: null,
      setLoading: (loading, message) =>
        set({ isLoading: loading, loadingMessage: message || null }),

      // Toasts
      toasts: [],
      addToast: (message, type = 'info') => {
        const id = `toast-${Date.now()}`
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }))
        // Auto-remove after 5 seconds
        setTimeout(() => {
          get().removeToast(id)
        }, 5000)
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      // Reset
      reset: () =>
        set({
          sidebarState: 'expanded',
          activeModal: null,
          modalData: null,
          isAISidebarOpen: false,
          showDemoPanel: false,
          isLoading: false,
          loadingMessage: null,
          toasts: [],
        }),
    }),
    {
      name: 'carepilot-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarState: state.sidebarState,
        isDemoMode: state.isDemoMode,
      }),
    }
  )
)
