'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  useUIStore,
  usePatientStore,
  useAlertStore,
  useDemoStore,
  scenarioMetadata,
  resetAllStores,
  type ScenarioId,
} from '@/stores'

export default function DemoControlPanel() {
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)
  const patients = usePatientStore((state) => state.patients)
  const { scenarios, triggerScenario, resetScenario, resetAllScenarios } = useDemoStore()

  const [selectedPatientId, setSelectedPatientId] = useState<string>('patient-001')
  const [isResetting, setIsResetting] = useState(false)

  const handleTriggerScenario = async (id: ScenarioId) => {
    triggerScenario(id)
    // Navigate to appropriate page after trigger
    const routes: Record<ScenarioId, string> = {
      'critical-alert': '/staff/benachrichtigungen',
      'new-patient': '/staff/patients',
      'route-conflict': '/staff/route',
      'patient-feedback': '/staff/benachrichtigungen',
    }
    window.location.href = routes[id]
  }

  const handleResetAll = async () => {
    setIsResetting(true)
    resetAllStores()
    resetAllScenarios()
    setTimeout(() => {
      setIsResetting(false)
    }, 500)
  }

  const getStatusBadge = (status: 'idle' | 'running' | 'completed') => {
    switch (status) {
      case 'idle':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
            Bereit
          </span>
        )
      case 'running':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full animate-pulse">
            Aktiv
          </span>
        )
      case 'completed':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 rounded-full">
            Abgeschlossen
          </span>
        )
    }
  }

  const getScenarioIcon = (icon: 'alert' | 'user-plus' | 'route' | 'clipboard') => {
    switch (icon) {
      case 'alert':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'user-plus':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        )
      case 'route':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      case 'clipboard':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Demo Control Panel</h1>
              <p className="text-slate-400 text-sm">CarePilot Präsentationssteuerung</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/staff"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
            >
              Zum Staff Dashboard →
            </Link>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Link
            href="/staff"
            className="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl transition-colors text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-sm font-medium">Staff</p>
            <p className="text-xs text-slate-400">Klinisches Dashboard</p>
          </Link>
          <Link
            href="/patient"
            className="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl transition-colors text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-success-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Patient</p>
            <p className="text-xs text-slate-400">Patienten-App</p>
          </Link>
          <Link
            href="/family"
            className="p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl transition-colors text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-warning-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Familie</p>
            <p className="text-xs text-slate-400">Angehörigen-Portal</p>
          </Link>
        </div>

        {/* Scenarios Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Demo-Szenarien</h2>
            <button
              onClick={handleResetAll}
              disabled={isResetting}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              {isResetting ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              Alle zurücksetzen
            </button>
          </div>

          <div className="grid gap-4">
            {(Object.keys(scenarioMetadata) as ScenarioId[]).map((id) => {
              const meta = scenarioMetadata[id]
              const scenario = scenarios[id]
              const isActive = scenario.status === 'running'
              const isCompleted = scenario.status === 'completed'

              return (
                <div
                  key={id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-primary-900/30 border-primary-500/50 shadow-lg shadow-primary-500/10'
                      : isCompleted
                      ? 'bg-success-900/20 border-success-500/30'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive
                          ? 'bg-primary-500/30 text-primary-400'
                          : isCompleted
                          ? 'bg-success-500/30 text-success-400'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {getScenarioIcon(meta.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{meta.title}</h3>
                        {getStatusBadge(scenario.status)}
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{meta.description}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTriggerScenario(id)}
                          disabled={isActive}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                          }`}
                        >
                          {isActive ? 'Läuft...' : isCompleted ? 'Erneut ausführen' : 'Ausführen'}
                        </button>
                        {isCompleted && (
                          <button
                            onClick={() => resetScenario(id)}
                            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                          >
                            Zurücksetzen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Settings Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Theme Toggle */}
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="font-semibold mb-3">Erscheinungsbild</h3>
            <div className="flex gap-2">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === t
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {t === 'light' ? 'Hell' : t === 'dark' ? 'Dunkel' : 'System'}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Persona Switcher */}
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="font-semibold mb-3">Patient auswählen</h3>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} - {p.diagnoses[0]?.name}
                </option>
              ))}
            </select>
            <Link
              href={`/staff/patients/${selectedPatientId}`}
              className="mt-2 inline-flex items-center text-sm text-primary-400 hover:text-primary-300"
            >
              Zum Patienten →
            </Link>
          </div>
        </div>

        {/* Keyboard Shortcut Info */}
        <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl text-center">
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-300">Tipp:</span> Drücken Sie{' '}
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs font-mono">Ctrl</kbd>
            {' + '}
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs font-mono">Shift</kbd>
            {' + '}
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs font-mono">D</kbd>
            {' '}um das Demo-Panel von überall zu öffnen
          </p>
        </div>
      </div>
    </div>
  )
}
