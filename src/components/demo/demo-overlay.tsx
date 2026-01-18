'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useUIStore,
  useDemoStore,
  usePatientStore,
  useAlertStore,
  scenarioMetadata,
  resetAllStores,
  type ScenarioId,
} from '@/stores'
import type { Alert } from '@/types'

export function DemoOverlay() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isExecuting, setIsExecuting] = useState<ScenarioId | null>(null)

  const { scenarios, triggerScenario, completeScenario, resetAllScenarios } = useDemoStore()
  const updateVitals = usePatientStore((state) => state.updateVitals)
  const updatePatientStatus = usePatientStore((state) => state.updatePatientStatus)
  const addAlert = useAlertStore((state) => state.addAlert)
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)

  // Global keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D or Cmd+Shift+D
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Execute scenario logic
  const executeScenario = async (id: ScenarioId) => {
    setIsExecuting(id)
    triggerScenario(id)

    switch (id) {
      case 'critical-alert': {
        // Hans Gerber's SpO2 drops to 88%
        updateVitals('patient-001', {
          spo2: { value: 88, trend: 'fallend', status: 'kritisch', measuredAt: new Date() },
        })
        updatePatientStatus('patient-001', 'kritisch')

        // Create critical alert
        const alert: Alert = {
          id: `alert-demo-${Date.now()}`,
          patientId: 'patient-001',
          priority: 'dringend',
          category: 'vital',
          title: 'Kritischer SpO2-Abfall',
          message: 'SpO2 auf 88% gefallen. Sofortige Überprüfung erforderlich.',
          status: 'neu',
          createdAt: new Date(),
          source: 'telemetry',
          aiTriaged: true,
          aiRationale: 'Basierend auf dem Gewichtstrend (+2.1kg in 3 Tagen) und jetzt SpO2-Abfall: Mögliche kardiale Dekompensation. Empfehlung: Erhöhung Diuretika und Arzt-Rücksprache.',
          suggestedActions: [
            { label: 'Anrufen', action: 'call' },
            { label: 'Visite planen', action: 'visit', targetUrl: '/staff/patients/patient-001' },
          ],
        }
        addAlert(alert)

        setTimeout(() => {
          completeScenario(id)
          setIsExecuting(null)
          router.push('/staff/benachrichtigungen')
        }, 800)
        break
      }

      case 'new-patient': {
        // This would open an intake modal - for now, navigate to patients
        setTimeout(() => {
          completeScenario(id)
          setIsExecuting(null)
          router.push('/staff/patients')
        }, 500)
        break
      }

      case 'route-conflict': {
        // Create route conflict alert
        const conflictAlert: Alert = {
          id: `alert-route-${Date.now()}`,
          patientId: 'patient-002',
          priority: 'wichtig',
          category: 'termin',
          title: 'Routenkonflikt erkannt',
          message: 'Dringende Visite bei Hans Gerber kollidiert mit bevorzugter Besuchszeit von Fr. Meier (14-17 Uhr).',
          status: 'neu',
          createdAt: new Date(),
          source: 'system',
          aiTriaged: true,
          aiRationale: 'Optimierung möglich: Fr. Meier um 13:45 besuchen (-15min), dann Hans Gerber priorisieren. Alternative: Nächsten Tag für Fr. Meier.',
          suggestedActions: [
            { label: 'Route anpassen', action: 'view', targetUrl: '/staff/route' },
            { label: 'Patientin informieren', action: 'call' },
          ],
        }
        addAlert(conflictAlert)

        setTimeout(() => {
          completeScenario(id)
          setIsExecuting(null)
          router.push('/staff/route')
        }, 800)
        break
      }

      case 'patient-feedback': {
        // Patient reports concerning symptoms
        const feedbackAlert: Alert = {
          id: `alert-feedback-${Date.now()}`,
          patientId: 'patient-005',
          priority: 'wichtig',
          category: 'fragebogen',
          title: 'Besorgniserregende Patientenrückmeldung',
          message: 'Patient meldet: Atemnot verschlechtert, nächtliches Aufwachen wegen Luftnot.',
          status: 'neu',
          createdAt: new Date(),
          source: 'questionnaire',
          aiTriaged: true,
          aiRationale: 'COPD-Exazerbation möglich. Empfehlung: Vorzeitige Visite heute, Sauerstoffsättigung prüfen, ggf. Prednisolon-Dosis anpassen.',
          suggestedActions: [
            { label: 'Fragebogen ansehen', action: 'view', targetUrl: '/staff/patients/patient-005' },
            { label: 'Telefonkonsultation', action: 'call' },
          ],
        }
        addAlert(feedbackAlert)

        setTimeout(() => {
          completeScenario(id)
          setIsExecuting(null)
          router.push('/staff/benachrichtigungen')
        }, 800)
        break
      }
    }

    setIsOpen(false)
  }

  const handleResetAll = () => {
    resetAllStores()
    resetAllScenarios()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">Demo Schnellzugriff</h2>
                <p className="text-xs text-slate-400">Szenarien für Präsentation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scenarios */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {(Object.keys(scenarioMetadata) as ScenarioId[]).map((id) => {
            const meta = scenarioMetadata[id]
            const isRunning = isExecuting === id
            const scenario = scenarios[id]

            return (
              <button
                key={id}
                onClick={() => executeScenario(id)}
                disabled={isRunning}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                  isRunning
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    id === 'critical-alert'
                      ? 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'
                      : id === 'new-patient'
                      ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400'
                      : id === 'route-conflict'
                      ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400'
                      : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  }`}
                >
                  {isRunning ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : meta.icon === 'alert' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : meta.icon === 'user-plus' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  ) : meta.icon === 'route' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{meta.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{meta.description}</p>
                </div>
                {scenario.status === 'completed' && (
                  <span className="px-2 py-0.5 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 text-xs rounded-full">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <div className="flex gap-2">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  theme === t
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t === 'light' ? '☀️ Hell' : '🌙 Dunkel'}
              </button>
            ))}
          </div>
          <button
            onClick={handleResetAll}
            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors"
          >
            Alles zurücksetzen
          </button>
        </div>
      </div>
    </div>
  )
}
