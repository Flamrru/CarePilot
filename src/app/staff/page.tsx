'use client'

import Link from 'next/link'
import { usePatientStore, useAlertStore, useRouteStore } from '@/stores'
import { patients as mockPatients, calculateAge } from '@/data/patients'
import { todaysVisits } from '@/data/visits'
import { alerts as mockAlerts } from '@/data/alerts'
import { currentVitals } from '@/data/vitals'

export default function StaffDashboard() {
  const patients = usePatientStore((state) => state.patients)
  const getUnreadCount = useAlertStore((state) => state.getUnreadCount)
  const currentRoute = useRouteStore((state) => state.currentRoute)

  const unreadAlerts = getUnreadCount()
  const criticalPatients = patients.filter((p) => p.status === 'kritisch').length
  const observingPatients = patients.filter((p) => p.status === 'beobachten').length
  const stablePatients = patients.filter((p) => p.status === 'stabil').length

  // Get next visit info
  const nextVisit = todaysVisits[0]
  const nextPatient = mockPatients.find(p => p.id === nextVisit?.patientId)

  // Get recent alerts
  const recentAlerts = mockAlerts.filter(a => a.status === 'neu').slice(0, 3)

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return 'gerade eben'
    if (hours === 1) return 'vor 1 Stunde'
    if (hours < 24) return `vor ${hours} Stunden`
    const days = Math.floor(hours / 24)
    return days === 1 ? 'vor 1 Tag' : `vor ${days} Tagen`
  }

  return (
    <div className="space-y-8">
      {/* Header with greeting */}
      <div className="animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
              Willkommen zurück
            </p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Guten Tag, Dr. Müller
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString('de-CH', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          <Link
            href="/staff/route"
            className="group relative inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg className="relative w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="relative">Route starten</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Patients Today */}
        <div className="stat-card animate-fade-up animate-delay-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Visiten heute</p>
              <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentRoute.totalPatients}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {currentRoute.totalCareTime} min Pflegezeit
              </p>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="stat-card priority-urgent animate-fade-up animate-delay-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Offene Alerts</p>
              <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {unreadAlerts}
              </p>
              <div className="mt-1 flex items-center gap-1">
                {unreadAlerts > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400">
                    Aktion nötig
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <div className={`p-3 bg-danger-50 dark:bg-danger-900/30 rounded-xl ${unreadAlerts > 0 ? 'animate-pulse-ring' : ''}`}>
                <svg className="w-6 h-6 text-danger-600 dark:text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Route Stats */}
        <div className="stat-card animate-fade-up animate-delay-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tagesroute</p>
              <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentRoute.totalDistance} <span className="text-lg font-normal text-slate-400">km</span>
              </p>
              <div className="mt-1 flex items-center gap-1 text-success-600 dark:text-success-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-sm font-medium">{currentRoute.savedDistance} km optimiert</span>
              </div>
            </div>
            <div className="p-3 bg-success-50 dark:bg-success-900/30 rounded-xl">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Patient Status Overview */}
        <div className="stat-card priority-important animate-fade-up animate-delay-400">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Patientenstatus</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{stablePatients} stabil</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{observingPatients} beobachten</span>
                </div>
                {criticalPatients > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" />
                    <span className="text-sm font-medium text-danger-600 dark:text-danger-400">{criticalPatients} kritisch</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-3 bg-warning-50 dark:bg-warning-900/30 rounded-xl">
              <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Section */}
        <div className="lg:col-span-2 animate-fade-up animate-delay-500">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Aktuelle Benachrichtigungen</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Dringende Hinweise zu Ihren Patienten</p>
              </div>
              <Link
                href="/staff/benachrichtigungen"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Alle anzeigen →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentAlerts.map((alert, index) => {
                const patient = mockPatients.find(p => p.id === alert.patientId)
                const priorityStyles = {
                  dringend: 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800',
                  wichtig: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
                  information: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
                }
                const dotStyles = {
                  dringend: 'bg-danger-500',
                  wichtig: 'bg-warning-500',
                  information: 'bg-primary-500',
                }

                return (
                  <div
                    key={alert.id}
                    className={`p-4 ${priorityStyles[alert.priority]} border-l-4 transition-colors hover:bg-opacity-75`}
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-2.5 h-2.5 mt-1.5 rounded-full ${dotStyles[alert.priority]} ${alert.priority === 'dringend' ? 'animate-pulse' : ''}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900 dark:text-white">{alert.title}</p>
                          {alert.aiTriaged && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                              KI
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{alert.message}</p>
                        {patient && (
                          <Link
                            href={`/staff/patients/${patient.id}`}
                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700"
                          >
                            <span>Patient öffnen</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </div>
                      <span className="flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                        {formatTimeAgo(alert.createdAt)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Next Visit Card */}
        <div className="animate-fade-up animate-delay-500">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Nächste Visite</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Heute um {nextVisit?.scheduledTime} Uhr</p>
            </div>

            {nextPatient && (
              <div className="p-6 space-y-5">
                {/* Patient Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900 flex items-center justify-center text-xl font-bold text-primary-700 dark:text-primary-300">
                      {nextPatient.firstName[0]}{nextPatient.lastName[0]}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                      nextPatient.status === 'stabil' ? 'bg-success-500' :
                      nextPatient.status === 'beobachten' ? 'bg-warning-500' : 'bg-danger-500'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {nextPatient.firstName} {nextPatient.lastName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {calculateAge(nextPatient.dateOfBirth)} Jahre • {nextPatient.diagnoses[0]?.name}
                    </p>
                  </div>
                </div>

                {/* Visit Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>{nextVisit?.scheduledTime} Uhr • {nextVisit?.estimatedDuration} Minuten</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>{nextPatient.address.street} {nextPatient.address.houseNumber}, {nextPatient.address.city}</span>
                  </div>
                </div>

                {/* Tasks Preview */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    Aufgaben ({nextVisit?.tasks.length})
                  </p>
                  <ul className="space-y-2">
                    {nextVisit?.tasks.slice(0, 3).map((task) => (
                      <li key={task.id} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        {task.title}
                      </li>
                    ))}
                    {nextVisit && nextVisit.tasks.length > 3 && (
                      <li className="text-sm text-slate-500 dark:text-slate-400 pl-3.5">
                        +{nextVisit.tasks.length - 3} weitere
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Button */}
                <Link
                  href={`/staff/patients/${nextPatient.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Patient öffnen
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Today's Patients Quick View */}
      <div className="animate-fade-up animate-delay-500">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Heutige Patienten</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{todaysVisits.length} Visiten geplant</p>
            </div>
            <Link
              href="/staff/patients"
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Alle Patienten →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Zeit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Aufgaben</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Ort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {todaysVisits.map((visit) => {
                  const patient = mockPatients.find(p => p.id === visit.patientId)
                  if (!patient) return null

                  const vitals = currentVitals[patient.id]
                  const statusColors = {
                    stabil: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
                    beobachten: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
                    kritisch: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400',
                  }

                  return (
                    <tr key={visit.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/staff/patients/${patient.id}`} className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {patient.diagnoses[0]?.name?.slice(0, 25)}...
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900 dark:text-white">{visit.scheduledTime}</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1">({visit.estimatedDuration}′)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {visit.completedTaskCount}/{visit.tasks.length} erledigt
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {patient.address.city}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
