'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAlertStore } from '@/stores'
import { patients as mockPatients } from '@/data/patients'

export default function NotificationsPage() {
  const alerts = useAlertStore((state) => state.alerts)
  const getGroupedAlerts = useAlertStore((state) => state.getGroupedAlerts)
  const markAsRead = useAlertStore((state) => state.markAsRead)

  // Mock current user ID (in real app, this would come from auth context)
  const currentUserId = 'staff-1'

  const [filter, setFilter] = useState<'alle' | 'dringend' | 'wichtig' | 'information'>('alle')

  const grouped = getGroupedAlerts()
  const unreadCount = alerts.filter(a => a.status === 'neu').length

  const priorityConfig = {
    dringend: {
      label: 'Dringend',
      bgColor: 'bg-danger-50 dark:bg-danger-900/20',
      borderColor: 'border-danger-200 dark:border-danger-800',
      dotColor: 'bg-danger-500',
      textColor: 'text-danger-700 dark:text-danger-400',
      iconBg: 'bg-danger-100 dark:bg-danger-900/30',
    },
    wichtig: {
      label: 'Wichtig',
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
      borderColor: 'border-warning-200 dark:border-warning-800',
      dotColor: 'bg-warning-500',
      textColor: 'text-warning-700 dark:text-warning-400',
      iconBg: 'bg-warning-100 dark:bg-warning-900/30',
    },
    information: {
      label: 'Information',
      bgColor: 'bg-slate-50 dark:bg-slate-800/50',
      borderColor: 'border-slate-200 dark:border-slate-700',
      dotColor: 'bg-primary-500',
      textColor: 'text-primary-700 dark:text-primary-400',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
    },
  }

  const categoryIcons: Record<string, JSX.Element> = {
    vital: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    medikation: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    termin: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    system: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  }

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return 'gerade eben'
    if (hours === 1) return 'vor 1 Stunde'
    if (hours < 24) return `vor ${hours} Stunden`
    const days = Math.floor(hours / 24)
    return days === 1 ? 'vor 1 Tag' : `vor ${days} Tagen`
  }

  const filteredAlerts = filter === 'alle'
    ? alerts
    : alerts.filter(a => a.priority === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Benachrichtigungen</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {unreadCount} ungelesene Benachrichtigungen
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={() => alerts.forEach(a => a.status === 'neu' && markAsRead(a.id, currentUserId))}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Alle als gelesen markieren
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 animate-fade-up animate-delay-100">
        {(['alle', 'dringend', 'wichtig', 'information'] as const).map((filterOption) => {
          const count = filterOption === 'alle'
            ? alerts.length
            : alerts.filter(a => a.priority === filterOption).length

          return (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === filterOption
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {filterOption === 'dringend' && <span className="w-2 h-2 rounded-full bg-danger-500 mr-2" />}
              {filterOption === 'wichtig' && <span className="w-2 h-2 rounded-full bg-warning-500 mr-2" />}
              {filterOption === 'information' && <span className="w-2 h-2 rounded-full bg-primary-500 mr-2" />}
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                filter === filterOption
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 animate-fade-up animate-delay-200">
        <div className="stat-card priority-urgent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-danger-100 dark:bg-danger-900/30 rounded-xl">
              <svg className="w-5 h-5 text-danger-600 dark:text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-danger-600">{alerts.filter(a => a.priority === 'dringend').length}</p>
              <p className="text-sm text-slate-500">Dringend</p>
            </div>
          </div>
        </div>
        <div className="stat-card priority-important">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-warning-100 dark:bg-warning-900/30 rounded-xl">
              <svg className="w-5 h-5 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-600">{alerts.filter(a => a.priority === 'wichtig').length}</p>
              <p className="text-sm text-slate-500">Wichtig</p>
            </div>
          </div>
        </div>
        <div className="stat-card priority-info">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">{alerts.filter(a => a.priority === 'information').length}</p>
              <p className="text-sm text-slate-500">Information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4 animate-fade-up animate-delay-300">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Keine Benachrichtigungen</h3>
            <p className="text-slate-500 dark:text-slate-400">Es gibt keine Benachrichtigungen in dieser Kategorie</p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const config = priorityConfig[alert.priority]
            const patient = alert.patientId ? mockPatients.find(p => p.id === alert.patientId) : null
            const icon = categoryIcons[alert.category] || categoryIcons.system

            return (
              <div
                key={alert.id}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl border overflow-hidden transition-all hover:shadow-md ${
                  alert.status === 'neu' ? config.borderColor : 'border-slate-200 dark:border-slate-700'
                }`}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {/* Priority indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.dotColor}`} />

                <div className="p-5 pl-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-2.5 rounded-xl ${config.iconBg}`}>
                      <span className={config.textColor}>{icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{alert.title}</h3>
                            {alert.status === 'neu' && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-500 text-white uppercase">
                                Neu
                              </span>
                            )}
                            {alert.aiTriaged && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                                KI-Triage
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{alert.message}</p>

                          {/* AI Rationale */}
                          {alert.aiRationale && (
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500 italic">
                              💡 {alert.aiRationale}
                            </p>
                          )}
                        </div>

                        <span className="flex-shrink-0 text-xs text-slate-500">
                          {formatTimeAgo(alert.createdAt)}
                        </span>
                      </div>

                      {/* Patient Link & Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        {patient ? (
                          <Link
                            href={`/staff/patients/${patient.id}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                              {patient.firstName[0]}{patient.lastName[0]}
                            </div>
                            <span>{patient.firstName} {patient.lastName}</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-sm text-slate-500">System-Benachrichtigung</span>
                        )}

                        {alert.status === 'neu' && (
                          <button
                            onClick={() => markAsRead(alert.id, currentUserId)}
                            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                          >
                            Als gelesen markieren
                          </button>
                        )}
                      </div>

                      {/* Suggested Actions */}
                      {alert.suggestedActions && alert.suggestedActions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {alert.suggestedActions.map((action, i) => (
                            <button
                              key={i}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                              {action.action === 'call' && (
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              )}
                              {action.action === 'visit' && (
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              )}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
