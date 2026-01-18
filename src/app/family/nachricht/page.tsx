'use client'

import { useState } from 'react'
import Link from 'next/link'

type Message = {
  id: string
  text: string
  sender: 'family' | 'team'
  senderName: string
  time: string
  read: boolean
}

type QuickMessage = {
  id: string
  text: string
  icon: 'question' | 'info' | 'schedule' | 'thanks'
}

export default function FamilyMessagePage() {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showSent, setShowSent] = useState(false)

  const patientName = 'Hans Gerber'

  const teamInfo = {
    name: 'KSBL Pflegeteam',
    responseTime: 'Antwort innerhalb von 2-4 Stunden',
    status: 'online' as const
  }

  const quickMessages: QuickMessage[] = [
    { id: '1', text: 'Wie geht es meinem Angehörigen heute?', icon: 'question' },
    { id: '2', text: 'Wann ist der nächste Besuch geplant?', icon: 'schedule' },
    { id: '3', text: 'Gibt es Neuigkeiten zum Behandlungsverlauf?', icon: 'info' }
  ]

  const messages: Message[] = [
    {
      id: '1',
      text: 'Wie geht es meinem Vater heute?',
      sender: 'family',
      senderName: 'Sie',
      time: 'Gestern, 14:30',
      read: true
    },
    {
      id: '2',
      text: 'Ihrem Vater geht es gut. Die Vitalzeichen sind stabil und er hat heute Morgen gut gefrühstückt. Das Team war um 08:30 Uhr bei ihm für die Routineuntersuchung.',
      sender: 'team',
      senderName: 'Pflegeteam',
      time: 'Gestern, 15:45',
      read: true
    },
    {
      id: '3',
      text: 'Kann ich ihn heute besuchen kommen?',
      sender: 'family',
      senderName: 'Sie',
      time: 'Gestern, 16:00',
      read: true
    },
    {
      id: '4',
      text: 'Ja, Besuche sind zwischen 10:00 und 18:00 Uhr möglich. Am besten kommen Sie nachmittags, da vormittags meist die medizinischen Termine stattfinden.',
      sender: 'team',
      senderName: 'Pflegeteam',
      time: 'Gestern, 16:15',
      read: true
    }
  ]

  const getQuickMessageIcon = (icon: QuickMessage['icon']) => {
    switch (icon) {
      case 'question':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'schedule':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'info':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'thanks':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
    }
  }

  const handleSend = () => {
    if (!message.trim()) return

    setIsSending(true)
    // Simulate sending
    setTimeout(() => {
      setIsSending(false)
      setShowSent(true)
      setMessage('')
    }, 1500)
  }

  const handleQuickMessage = (text: string) => {
    setMessage(text)
  }

  // Success screen after sending
  if (showSent) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-scale-in">
        <div className="w-20 h-20 bg-gradient-to-br from-success-100 to-success-50 dark:from-success-900/30 dark:to-success-800/20 rounded-full flex items-center justify-center mb-5 shadow-lg">
          <svg className="w-10 h-10 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Nachricht gesendet
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
          Das Pflegeteam wird sich innerhalb von 2-4 Stunden bei Ihnen melden.
        </p>

        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => setShowSent(false)}
            className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Weitere Nachricht senden
          </button>
          <Link
            href="/family"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors"
          >
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Pflegeteam kontaktieren</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Fragen zu <span className="font-medium">{patientName}</span>
        </p>
      </div>

      {/* Team Info Card */}
      <div className="card p-5 animate-fade-up animate-delay-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-900 dark:text-white">{teamInfo.name}</p>
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{teamInfo.responseTime}</p>
          </div>
        </div>
      </div>

      {/* Access Notice */}
      <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 animate-fade-up animate-delay-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-primary-700 dark:text-primary-300">
            Als Angehöriger können Sie allgemeine Fragen stellen. Medizinische Details werden nur mit dem Einverständnis des Patienten geteilt.
          </p>
        </div>
      </div>

      {/* Quick Messages */}
      <div className="animate-fade-up animate-delay-300">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Schnellanfragen</p>
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((qm) => (
            <button
              key={qm.id}
              onClick={() => handleQuickMessage(qm.text)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full transition-colors"
            >
              {getQuickMessageIcon(qm.icon)}
              <span className="max-w-[180px] truncate">{qm.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="card p-5 animate-fade-up animate-delay-400">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Ihre Nachricht</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white placeholder:text-slate-400"
          rows={4}
          placeholder="Schreiben Sie Ihre Frage hier..."
        ></textarea>
        <button
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md disabled:shadow-none active:scale-[0.98]"
        >
          {isSending ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

      {/* Message History */}
      <div className="card p-5 animate-fade-up animate-delay-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Bisherige Nachrichten</h2>
          <span className="text-sm text-slate-500">{messages.length} Nachrichten</span>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl ${
                msg.sender === 'family'
                  ? 'bg-slate-100 dark:bg-slate-800 ml-4'
                  : 'bg-primary-50 dark:bg-primary-900/20 mr-4 border border-primary-100 dark:border-primary-800/50'
              }`}
            >
              <p className="text-slate-900 dark:text-white">{msg.text}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">{msg.senderName}</span>
                <span className="text-xs text-slate-400">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Note */}
      <div className="card p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 animate-fade-up animate-delay-600">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-danger-600 dark:text-danger-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-danger-700 dark:text-danger-300">Bei Notfällen</p>
            <p className="text-sm text-danger-600 dark:text-danger-400 mt-1">
              Rufen Sie direkt an: <span className="font-semibold">061 925 25 25</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
