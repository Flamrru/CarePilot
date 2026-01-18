'use client'

import { useState } from 'react'
import Link from 'next/link'

type QuickMessage = {
  id: string
  text: string
  icon: 'warning' | 'pill' | 'clock' | 'check'
  priority: 'urgent' | 'normal'
}

export default function PatientMessagePage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const quickMessages: QuickMessage[] = [
    {
      id: 'worse',
      text: 'Mir geht es schlechter',
      icon: 'warning',
      priority: 'urgent'
    },
    {
      id: 'meds',
      text: 'Ich habe Fragen zu meinen Medikamenten',
      icon: 'pill',
      priority: 'normal'
    },
    {
      id: 'when',
      text: 'Wann kommt das Team heute?',
      icon: 'clock',
      priority: 'normal'
    },
    {
      id: 'ok',
      text: 'Alles in Ordnung, danke!',
      icon: 'check',
      priority: 'normal'
    }
  ]

  const getIcon = (icon: QuickMessage['icon']) => {
    switch (icon) {
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'pill':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'clock':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'check':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const handleSend = () => {
    const messageToSend = selectedMessage
      ? quickMessages.find(m => m.id === selectedMessage)?.text
      : customMessage

    if (!messageToSend) return

    setIsSending(true)
    // Simulate sending
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
    }, 1000)
  }

  // Success screen
  if (isSent) {
    const sentMessage = selectedMessage
      ? quickMessages.find(m => m.id === selectedMessage)
      : null

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-scale-in">
        <div className="w-24 h-24 bg-gradient-to-br from-success-100 to-success-50 dark:from-success-900/30 dark:to-success-800/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-12 h-12 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white mb-2">
          Nachricht gesendet!
        </h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
          Ihr Pflegeteam wurde benachrichtigt und wird sich bei Ihnen melden.
        </p>

        {/* Sent message preview */}
        <div className="w-full max-w-sm card p-4 mb-6 text-left bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <p className="text-patient-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Ihre Nachricht:</p>
          <p className="text-patient-base text-slate-900 dark:text-white">
            {sentMessage?.text || customMessage}
          </p>
        </div>

        {/* Response time info */}
        <div className="w-full max-w-sm card p-4 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-patient-sm text-slate-500 dark:text-slate-400">Erwartete Antwortzeit</p>
            <p className="text-patient-base font-medium text-slate-900 dark:text-white">
              {sentMessage?.priority === 'urgent' ? 'So schnell wie möglich' : 'Innerhalb von 2 Stunden'}
            </p>
          </div>
        </div>

        <Link
          href="/patient"
          className="w-full max-w-sm inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white text-patient-lg font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  const canSend = selectedMessage || customMessage.trim().length > 0

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white">Nachricht senden</h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mt-1">
          Kontaktieren Sie Ihr Pflegeteam
        </p>
      </div>

      {/* Team Info Card */}
      <div className="card p-4 flex items-center gap-4 animate-fade-up animate-delay-100">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-patient-base font-medium text-slate-900 dark:text-white">KSBL Pflegeteam</p>
          <p className="text-patient-sm text-slate-500 dark:text-slate-400">Verfügbar 7:00 - 20:00 Uhr</p>
        </div>
        <span className="flex items-center gap-1 text-success-600 dark:text-success-400 text-patient-sm">
          <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          Online
        </span>
      </div>

      {/* Quick Messages */}
      <div className="animate-fade-up animate-delay-200">
        <p className="text-patient-base font-medium text-slate-700 dark:text-slate-300 mb-3">
          Schnellnachricht wählen:
        </p>
        <div className="space-y-3">
          {quickMessages.map((msg, i) => {
            const isSelected = selectedMessage === msg.id
            return (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(isSelected ? null : msg.id)
                  if (!isSelected) setCustomMessage('')
                }}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all active:scale-[0.98] flex items-center gap-4 ${
                  isSelected
                    ? msg.priority === 'urgent'
                      ? 'bg-danger-50 dark:bg-danger-900/20 border-danger-500 text-danger-700 dark:text-danger-300'
                      : 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-primary-300 dark:hover:border-primary-600'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? msg.priority === 'urgent'
                      ? 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'
                      : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : msg.priority === 'urgent'
                      ? 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {getIcon(msg.icon)}
                </div>
                <span className="text-patient-base font-medium flex-1">{msg.text}</span>
                {isSelected && (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {msg.priority === 'urgent' && !isSelected && (
                  <span className="px-2 py-1 bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400 text-xs font-medium rounded-full">
                    Dringend
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Message */}
      <div className="card p-6 animate-fade-up animate-delay-300">
        <p className="text-patient-base font-medium text-slate-700 dark:text-slate-300 mb-3">
          Oder schreiben Sie eine eigene Nachricht:
        </p>
        <textarea
          value={customMessage}
          onChange={(e) => {
            setCustomMessage(e.target.value)
            if (e.target.value) setSelectedMessage(null)
          }}
          className="w-full p-4 text-patient-base bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
          rows={4}
          placeholder="Ihre Nachricht an das Pflegeteam..."
        />
        <p className="text-patient-sm text-slate-400 dark:text-slate-500 mt-2">
          {customMessage.length}/500 Zeichen
        </p>
      </div>

      {/* Send Button */}
      <div className="animate-fade-up animate-delay-400">
        <button
          onClick={handleSend}
          disabled={!canSend || isSending}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-patient-lg font-medium rounded-xl transition-all ${
            canSend && !isSending
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md active:scale-[0.98]'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Wird gesendet...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Nachricht senden
            </>
          )}
        </button>
      </div>

      {/* Emergency note */}
      <div className="card p-4 bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 animate-fade-up animate-delay-500">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-danger-100 dark:bg-danger-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-danger-600 dark:text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-patient-sm font-medium text-danger-700 dark:text-danger-300">
              Bei Notfällen
            </p>
            <p className="text-patient-sm text-danger-600 dark:text-danger-400 mt-0.5">
              Rufen Sie direkt an: <span className="font-bold">144</span> (Notruf) oder <span className="font-bold">061 553 53 53</span> (KSBL)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
