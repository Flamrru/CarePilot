'use client'

import Link from 'next/link'

export default function PatientHome() {
  const patientName = 'Hans'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 17) return 'Guten Tag'
    return 'Guten Abend'
  }

  // Mock data
  const nextVisit = {
    time: '08:30',
    caregiver: 'Marco Bianchi',
    role: 'Pflegefachmann',
    eta: 'In ca. 45 Minuten'
  }

  const medicationProgress = {
    taken: 2,
    total: 4,
    nextDue: 'Mittags'
  }

  const lastVitals = {
    bloodPressure: '128/82',
    pulse: 72,
    time: 'Heute, 07:15'
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Greeting Header */}
      <div className="animate-fade-up">
        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white">
          {getGreeting()}, {patientName}
        </h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mt-1">
          Wie geht es Ihnen heute?
        </p>
      </div>

      {/* Next Visit Card - Hero */}
      <Link href="/patient/ankunft" className="block animate-fade-up animate-delay-100">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white p-6 shadow-lg">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-100 text-patient-base font-medium">Nächster Besuch</p>
                <p className="text-patient-2xl font-bold mt-1">{nextVisit.time} Uhr</p>
                <p className="text-primary-100 mt-3">{nextVisit.caregiver}</p>
                <p className="text-primary-200 text-patient-sm">{nextVisit.role}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-primary-100 text-patient-sm">{nextVisit.eta}</span>
              </div>
              <div className="flex items-center gap-1 text-primary-100">
                <span className="text-patient-sm">Tippen für Details</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Check-in Card */}
      <div className="card p-6 animate-fade-up animate-delay-200">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-success-100 to-success-50 dark:from-success-900/30 dark:to-success-800/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-7 h-7 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-patient-lg font-semibold text-slate-900 dark:text-white">Täglicher Check-in</h2>
              <span className="px-2 py-0.5 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400 text-xs font-medium rounded-full">
                Offen
              </span>
            </div>
            <p className="text-patient-sm text-slate-500 dark:text-slate-400 mt-1">
              4 kurze Fragen zu Ihrem Befinden
            </p>
          </div>
        </div>
        <Link
          href="/patient/fragebogen"
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-success-500 hover:bg-success-600 text-white text-patient-lg font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Fragebogen starten
        </Link>
      </div>

      {/* Medication Progress Card */}
      <div className="card p-6 animate-fade-up animate-delay-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-patient-lg font-semibold text-slate-900 dark:text-white">Medikamente heute</h2>
          </div>
          <span className="text-patient-lg text-success-600 dark:text-success-400 font-bold">
            {medicationProgress.taken} / {medicationProgress.total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-success-500 to-success-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(medicationProgress.taken / medicationProgress.total) * 100}%` }}
            />
          </div>
          <p className="text-patient-sm text-slate-500 dark:text-slate-400 mt-2">
            Nächste Einnahme: <span className="font-medium text-slate-700 dark:text-slate-300">{medicationProgress.nextDue}</span>
          </p>
        </div>

        <Link
          href="/patient/medikamente"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-patient-base font-medium rounded-xl transition-colors"
        >
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Medikamente anzeigen
        </Link>
      </div>

      {/* Last Vitals Mini Card */}
      <div className="card p-4 animate-fade-up animate-delay-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-patient-sm text-slate-500 dark:text-slate-400">Letzte Messung</p>
              <p className="text-patient-base font-semibold text-slate-900 dark:text-white">
                {lastVitals.bloodPressure} mmHg · {lastVitals.pulse} bpm
              </p>
            </div>
          </div>
          <span className="text-patient-sm text-slate-400">{lastVitals.time}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 animate-fade-up animate-delay-500">
        <Link
          href="/patient/nachricht"
          className="card p-5 flex flex-col items-center text-center hover:shadow-md transition-all active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl flex items-center justify-center mb-3 shadow-sm">
            <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-patient-base font-medium text-slate-900 dark:text-white">Nachricht</span>
          <span className="text-patient-sm text-slate-500 mt-0.5">Pflegeteam kontaktieren</span>
        </Link>

        <button className="card p-5 flex flex-col items-center text-center hover:shadow-md transition-all active:scale-[0.98]">
          <div className="w-14 h-14 bg-gradient-to-br from-danger-100 to-danger-50 dark:from-danger-900/30 dark:to-danger-800/20 rounded-xl flex items-center justify-center mb-3 shadow-sm">
            <svg className="w-7 h-7 text-danger-600 dark:text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-patient-base font-medium text-slate-900 dark:text-white">Anrufen</span>
          <span className="text-patient-sm text-slate-500 mt-0.5">Direkte Leitung</span>
        </button>
      </div>
    </div>
  )
}
