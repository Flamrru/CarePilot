'use client'

import Link from 'next/link'

type PatientStatus = 'stabil' | 'beobachten' | 'kritisch'

type Update = {
  id: string
  text: string
  time: string
  type: 'info' | 'warning' | 'success' | 'alert'
  icon: 'vitals' | 'medication' | 'checkin' | 'visit' | 'message'
}

export default function FamilyDashboard() {
  const patientName = 'Hans Gerber'
  const patientRelation = 'Ihr Vater'
  const patientStatus: PatientStatus = 'beobachten'

  const nextVisit = {
    date: 'Heute',
    time: '08:30',
    caregiver: 'Marco Bianchi',
    role: 'Pflegefachmann',
    eta: 'In ca. 45 Minuten'
  }

  const lastVisit = {
    date: 'Gestern',
    time: '09:15',
    duration: '45 Min.',
    notes: 'Vitalzeichen kontrolliert, Medikamente angepasst'
  }

  const updates: Update[] = [
    { id: '1', text: 'Sauerstoffwerte werden beobachtet', time: 'Vor 2 Stunden', type: 'warning', icon: 'vitals' },
    { id: '2', text: 'Medikamentenplan angepasst', time: 'Vor 1 Tag', type: 'info', icon: 'medication' },
    { id: '3', text: 'Täglicher Check-in abgeschlossen', time: 'Gestern', type: 'success', icon: 'checkin' },
    { id: '4', text: 'Besuch durchgeführt - alles in Ordnung', time: 'Gestern', type: 'success', icon: 'visit' }
  ]

  const getStatusConfig = (status: PatientStatus) => {
    switch (status) {
      case 'stabil':
        return {
          label: 'Stabiler Zustand',
          description: 'Alle Werte im normalen Bereich',
          color: 'bg-success-500',
          bgColor: 'bg-success-50 dark:bg-success-900/20',
          borderColor: 'border-success-200 dark:border-success-800',
          textColor: 'text-success-700 dark:text-success-300'
        }
      case 'beobachten':
        return {
          label: 'Wird beobachtet',
          description: 'Das Team beobachtet einige Werte genauer',
          color: 'bg-warning-500',
          bgColor: 'bg-warning-50 dark:bg-warning-900/20',
          borderColor: 'border-warning-200 dark:border-warning-800',
          textColor: 'text-warning-700 dark:text-warning-300'
        }
      case 'kritisch':
        return {
          label: 'Erhöhte Aufmerksamkeit',
          description: 'Das Team ist in engem Kontakt',
          color: 'bg-danger-500',
          bgColor: 'bg-danger-50 dark:bg-danger-900/20',
          borderColor: 'border-danger-200 dark:border-danger-800',
          textColor: 'text-danger-700 dark:text-danger-300'
        }
    }
  }

  const getUpdateIcon = (icon: Update['icon']) => {
    switch (icon) {
      case 'vitals':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'medication':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'checkin':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )
      case 'visit':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'message':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
    }
  }

  const getUpdateTypeColor = (type: Update['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400'
      case 'success':
        return 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400'
      case 'alert':
        return 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'
      default:
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
    }
  }

  const statusConfig = getStatusConfig(patientStatus)

  return (
    <div className="space-y-6 pb-6">
      {/* Patient Header Card */}
      <div className="card overflow-hidden animate-fade-up">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-xl font-semibold text-slate-600 dark:text-slate-300 shadow-inner">
                HG
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusConfig.color} rounded-full border-2 border-white dark:border-slate-900 animate-pulse`}></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{patientName}</h1>
              <p className="text-slate-500 dark:text-slate-400">{patientRelation}</p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`px-6 py-4 ${statusConfig.bgColor} border-t ${statusConfig.borderColor}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusConfig.color} animate-pulse`}></div>
            <div>
              <p className={`font-semibold ${statusConfig.textColor}`}>{statusConfig.label}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{statusConfig.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Visit Card - Hero Style */}
      <div className="card overflow-hidden animate-fade-up animate-delay-100">
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white p-6">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full" />

          <div className="relative">
            <p className="text-primary-100 text-sm font-medium">Nächster Besuch</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">{nextVisit.date}</span>
              <span className="text-xl">{nextVisit.time} Uhr</span>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{nextVisit.caregiver}</p>
                  <p className="text-primary-200 text-sm">{nextVisit.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-primary-100 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>{nextVisit.eta}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Last Visit Card */}
      <div className="card p-5 animate-fade-up animate-delay-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-900 dark:text-white">Letzter Besuch</p>
              <span className="text-sm text-slate-500">{lastVisit.duration}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">{lastVisit.date}, {lastVisit.time} Uhr</p>
            <p className="text-sm text-slate-500 mt-1">{lastVisit.notes}</p>
          </div>
        </div>
      </div>

      {/* Updates Feed */}
      <div className="card p-6 animate-fade-up animate-delay-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Aktuelle Updates</h2>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
            {updates.length} neu
          </span>
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <div
              key={update.id}
              className={`flex items-start gap-3 ${index < updates.length - 1 ? 'pb-4 border-b border-slate-100 dark:border-slate-800' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getUpdateTypeColor(update.type)}`}>
                {getUpdateIcon(update.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 dark:text-white">{update.text}</p>
                <p className="text-sm text-slate-500 mt-0.5">{update.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Team CTA */}
      <Link
        href="/family/nachricht"
        className="card p-5 flex items-center gap-4 hover:shadow-md transition-all active:scale-[0.98] animate-fade-up animate-delay-400"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1">
          <span className="font-semibold text-slate-900 dark:text-white">Pflegeteam kontaktieren</span>
          <p className="text-sm text-slate-500">Stellen Sie Fragen zum Zustand</p>
        </div>
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Access Notice */}
      <div className="card p-4 bg-slate-50 dark:bg-slate-800/50 border-dashed animate-fade-up animate-delay-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sie haben eingeschränkten Zugang gemäss der Einwilligung von <span className="font-medium">{patientName}</span>. Medizinische Details werden nur mit ausdrücklicher Genehmigung geteilt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
