'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePatientStore } from '@/stores'
import { calculateAge } from '@/data/patients'
import { currentVitals } from '@/data/vitals'
import type { PatientStatus, Priority } from '@/types'

export default function StaffPatientsPage() {
  const patients = usePatientStore((state) => state.patients)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'alle'>('alle')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'alle'>('alle')
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(query)
        const matchesDiagnosis = patient.diagnoses.some(d => d.name.toLowerCase().includes(query))
        const matchesCity = patient.address.city.toLowerCase().includes(query)
        if (!matchesName && !matchesDiagnosis && !matchesCity) return false
      }

      // Status filter
      if (statusFilter !== 'alle' && patient.status !== statusFilter) return false

      // Priority filter
      if (priorityFilter !== 'alle' && patient.priority !== priorityFilter) return false

      return true
    })
  }, [patients, searchQuery, statusFilter, priorityFilter])

  // Stats
  const stats = useMemo(() => ({
    total: patients.length,
    stabil: patients.filter(p => p.status === 'stabil').length,
    beobachten: patients.filter(p => p.status === 'beobachten').length,
    kritisch: patients.filter(p => p.status === 'kritisch').length,
  }), [patients])

  const statusColors = {
    stabil: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400 border-success-200 dark:border-success-800',
    beobachten: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400 border-warning-200 dark:border-warning-800',
    kritisch: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400 border-danger-200 dark:border-danger-800',
  }

  const priorityColors = {
    dringend: 'text-danger-600 dark:text-danger-400',
    normal: 'text-slate-600 dark:text-slate-400',
    flexibel: 'text-slate-500 dark:text-slate-500',
  }

  const statusDotColors = {
    stabil: 'bg-success-500',
    beobachten: 'bg-warning-500',
    kritisch: 'bg-danger-500',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patienten</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {filteredPatients.length} von {patients.length} Patienten
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Karten
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Liste
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up animate-delay-100">
        <button
          onClick={() => setStatusFilter('alle')}
          className={`stat-card text-left transition-all ${statusFilter === 'alle' ? 'ring-2 ring-primary-500' : ''}`}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">Alle Patienten</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.total}</p>
        </button>
        <button
          onClick={() => setStatusFilter('stabil')}
          className={`stat-card text-left transition-all ${statusFilter === 'stabil' ? 'ring-2 ring-success-500' : ''}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Stabil</p>
          </div>
          <p className="text-3xl font-bold text-success-600 dark:text-success-400 mt-1">{stats.stabil}</p>
        </button>
        <button
          onClick={() => setStatusFilter('beobachten')}
          className={`stat-card text-left transition-all ${statusFilter === 'beobachten' ? 'ring-2 ring-warning-500' : ''}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Beobachten</p>
          </div>
          <p className="text-3xl font-bold text-warning-600 dark:text-warning-400 mt-1">{stats.beobachten}</p>
        </button>
        <button
          onClick={() => setStatusFilter('kritisch')}
          className={`stat-card text-left transition-all ${statusFilter === 'kritisch' ? 'ring-2 ring-danger-500' : ''}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Kritisch</p>
          </div>
          <p className="text-3xl font-bold text-danger-600 dark:text-danger-400 mt-1">{stats.kritisch}</p>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-200">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Patient suchen (Name, Diagnose, Ort)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'alle')}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="alle">Alle Prioritäten</option>
          <option value="dringend">Dringend</option>
          <option value="normal">Normal</option>
          <option value="flexibel">Flexibel</option>
        </select>
      </div>

      {/* Patient Cards/List */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-up animate-delay-300">
          {filteredPatients.map((patient, index) => {
            const vitals = currentVitals[patient.id]
            const age = calculateAge(patient.dateOfBirth)

            return (
              <Link
                key={patient.id}
                href={`/staff/patients/${patient.id}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {/* Status bar */}
                <div className={`h-1 ${statusDotColors[patient.status]}`} />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-lg font-bold text-slate-600 dark:text-slate-300 group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-800 dark:group-hover:to-primary-900 transition-all">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${statusDotColors[patient.status]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {age} Jahre • {patient.gender}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[patient.status]}`}>
                      {patient.status}
                    </span>
                  </div>

                  {/* Diagnosis */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {patient.diagnoses.find(d => d.isPrimary)?.name || patient.diagnoses[0]?.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tag {patient.currentDay} von {patient.totalDays}
                    </p>
                  </div>

                  {/* Quick Vitals */}
                  {vitals && (
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                      {vitals.spo2 && (
                        <div className="text-center">
                          <p className={`text-lg font-bold ${
                            vitals.spo2.status === 'normal' ? 'text-success-600' :
                            vitals.spo2.status === 'erniedrigt' ? 'text-warning-600' : 'text-danger-600'
                          }`}>
                            {vitals.spo2.value}%
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase">SpO2</p>
                        </div>
                      )}
                      {vitals.puls && (
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {vitals.puls.value}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase">Puls</p>
                        </div>
                      )}
                      {vitals.blutdruck && (
                        <div className="text-center">
                          <p className={`text-lg font-bold ${
                            vitals.blutdruck.status === 'normal' ? 'text-slate-900 dark:text-white' : 'text-warning-600'
                          }`}>
                            {vitals.blutdruck.systolic}/{vitals.blutdruck.diastolic}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase">RR</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{patient.address.city}</span>
                    </div>
                    <span className={`text-sm font-medium ${priorityColors[patient.priority]}`}>
                      {patient.priority}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-up animate-delay-300">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Diagnose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Fortschritt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Priorität</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Ort</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredPatients.map((patient) => {
                const age = calculateAge(patient.dateOfBirth)

                return (
                  <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/staff/patients/${patient.id}`} className="flex items-center gap-3 group">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </div>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${statusDotColors[patient.status]}`} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {patient.firstName} {patient.lastName}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{age} Jahre</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-white">
                        {(patient.diagnoses.find(d => d.isPrimary)?.name || patient.diagnoses[0]?.name || '').slice(0, 30)}...
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${(patient.currentDay / patient.totalDays) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          Tag {patient.currentDay}/{patient.totalDays}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${priorityColors[patient.priority]}`}>
                        {patient.priority}
                      </span>
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
      )}

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12 animate-fade-up">
          <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Keine Patienten gefunden</h3>
          <p className="text-slate-500 dark:text-slate-400">Versuchen Sie, die Filterkriterien anzupassen</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('alle')
              setPriorityFilter('alle')
            }}
            className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}
