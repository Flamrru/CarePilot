'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouteStore } from '@/stores'
import { patients as mockPatients, calculateAge } from '@/data/patients'
import { todaysVisits } from '@/data/visits'
import { MapboxRouteMap } from '@/components/map'

export default function RoutePage() {
  const currentRoute = useRouteStore((state) => state.currentRoute)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  // Calculate progress
  const completedStops = currentRoute.stops.filter(s => s.isCompleted).length
  const progressPercentage = (completedStops / currentRoute.stops.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
              {new Date().toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tagesroute</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {currentRoute.totalPatients} Patienten • {currentRoute.totalDistance} km • ~{Math.round(currentRoute.totalTravelTime)} min Fahrt
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Karte
              </button>
            </div>

            <button className="inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary-500/25">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Route starten
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up animate-delay-100">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentRoute.totalDistance}</p>
              <p className="text-sm text-slate-500">km gesamt</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-success-50 dark:bg-success-900/30 rounded-xl">
              <svg className="w-5 h-5 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">{currentRoute.savedDistance}</p>
              <p className="text-sm text-slate-500">km optimiert</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-warning-50 dark:bg-warning-900/30 rounded-xl">
              <svg className="w-5 h-5 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentRoute.totalTravelTime}</p>
              <p className="text-sm text-slate-500">min Fahrtzeit</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl">
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentRoute.totalCareTime}</p>
              <p className="text-sm text-slate-500">min Pflegezeit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-fade-up animate-delay-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-slate-900 dark:text-white">Tagesfortschritt</h3>
          <span className="text-sm text-slate-500">{completedStops} von {currentRoute.stops.length} erledigt</span>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {viewMode === 'list' ? (
        /* Route Timeline */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-up animate-delay-300">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Besuchsreihenfolge</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Optimierte Route für heute</p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {currentRoute.stops.map((stop, index) => {
              const patient = mockPatients.find(p => p.id === stop.patientId)
              const visit = todaysVisits.find(v => v.id === stop.visitId)
              if (!patient) return null

              const isLast = index === currentRoute.stops.length - 1
              const statusDotColors = {
                stabil: 'bg-success-500',
                beobachten: 'bg-warning-500',
                kritisch: 'bg-danger-500',
              }

              return (
                <div key={stop.visitId} className="relative">
                  {/* Timeline connector */}
                  {!isLast && (
                    <div className="absolute left-[2.25rem] top-[4.5rem] bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                  )}

                  <div className={`p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${stop.isCompleted ? 'bg-success-50/50 dark:bg-success-900/10' : ''}`}>
                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <div className={`relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        stop.isCompleted
                          ? 'bg-success-500 text-white'
                          : index === completedStops
                            ? 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-900/30'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {stop.isCompleted ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/staff/patients/${patient.id}`}
                              className="font-semibold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              {patient.firstName} {patient.lastName}
                            </Link>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                              {patient.diagnoses[0]?.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${statusDotColors[patient.status]}`} />
                            <span className="text-sm text-slate-500">{patient.status}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{stop.arrivalTime} - {stop.departureTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{stop.address.street}, {stop.address.city}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>{visit?.tasks.length || 0} Aufgaben</span>
                          </div>
                        </div>

                        {/* Travel info to next */}
                        {stop.travelTimeToNext && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span>{stop.travelTimeToNext} min • {stop.distanceToNext} km zum nächsten Stop</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <Link
                        href={`/staff/patients/${patient.id}`}
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Real Mapbox Map */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-up animate-delay-300">
          <MapboxRouteMap
            patients={currentRoute.stops
              .map(stop => mockPatients.find(p => p.id === stop.patientId))
              .filter((p): p is typeof mockPatients[0] => p !== undefined)}
            showRoute={true}
            height="400px"
          />
        </div>
      )}
    </div>
  )
}
