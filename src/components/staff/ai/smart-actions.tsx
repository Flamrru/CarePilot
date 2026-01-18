'use client'

import { useState } from 'react'
import { getActionsForPatient, type SmartAction } from '@/data/ai-responses'

type SmartActionsProps = {
  patientId?: string
  patientName?: string
}

type ActionState = 'idle' | 'confirming' | 'executing' | 'complete'

export function SmartActions({ patientId, patientName }: SmartActionsProps) {
  const [selectedAction, setSelectedAction] = useState<SmartAction | null>(null)
  const [actionState, setActionState] = useState<ActionState>('idle')
  const [dismissedActions, setDismissedActions] = useState<Set<string>>(new Set())

  const allActions = patientId ? getActionsForPatient(patientId) : []
  const actions = allActions.filter(a => !dismissedActions.has(a.id))

  const getActionIcon = (icon: SmartAction['icon']) => {
    switch (icon) {
      case 'flask':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'pill':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  const getPriorityColor = (priority: SmartAction['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400 border-danger-200 dark:border-danger-800'
      case 'medium':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400 border-warning-200 dark:border-warning-800'
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
    }
  }

  const getPriorityLabel = (priority: SmartAction['priority']) => {
    switch (priority) {
      case 'high': return 'Dringend'
      case 'medium': return 'Empfohlen'
      default: return 'Optional'
    }
  }

  const handleExecuteAction = (action: SmartAction) => {
    setSelectedAction(action)
    setActionState('confirming')
  }

  const handleConfirm = () => {
    setActionState('executing')
    setTimeout(() => {
      setActionState('complete')
      setTimeout(() => {
        setDismissedActions(prev => {
          const newSet = new Set(prev)
          newSet.add(selectedAction!.id)
          return newSet
        })
        setSelectedAction(null)
        setActionState('idle')
      }, 1500)
    }, 1500)
  }

  const handleDismiss = (actionId: string) => {
    setDismissedActions(prev => {
      const newSet = new Set(prev)
      newSet.add(actionId)
      return newSet
    })
  }

  if (actions.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Keine offenen Aktionen</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Alle empfohlenen Aktionen wurden bearbeitet oder abgelehnt.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">KI-Empfehlungen</h3>
        </div>
        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded-full">
          {actions.length} offen
        </span>
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {actions.map((action) => (
          <div
            key={action.id}
            className="card p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getPriorityColor(action.priority)}`}>
                {getActionIcon(action.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    {action.title}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(action.priority)}`}>
                    {getPriorityLabel(action.priority)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {action.description}
                </p>
                <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="italic">{action.rationale}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleExecuteAction(action)}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Erstellen
                  </button>
                  <button
                    onClick={() => handleDismiss(action.id)}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors"
                  >
                    Ablehnen
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedAction && actionState !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
            {actionState === 'confirming' && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPriorityColor(selectedAction.priority)}`}>
                    {getActionIcon(selectedAction.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{selectedAction.title}</h3>
                    <p className="text-sm text-slate-500">{selectedAction.description}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Möchten Sie diese Aktion ausführen? Dies wird entsprechende Aufträge im System erstellen.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setSelectedAction(null); setActionState('idle') }}
                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
                  >
                    Bestätigen
                  </button>
                </div>
              </>
            )}

            {actionState === 'executing' && (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4">
                  <svg className="w-full h-full animate-spin text-primary-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Wird ausgeführt...</h3>
                <p className="text-sm text-slate-500">Bitte warten Sie einen Moment</p>
              </div>
            )}

            {actionState === 'complete' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Erfolgreich erstellt</h3>
                <p className="text-sm text-slate-500">{selectedAction.title} wurde erfolgreich durchgeführt.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
