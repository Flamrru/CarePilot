'use client'

import { useState } from 'react'

type Medication = {
  id: string
  name: string
  dosage: string
  instructions?: string
  taken: boolean
}

type MedicationGroup = {
  time: string
  timeLabel: string
  icon: 'sunrise' | 'sun' | 'sunset' | 'moon'
  items: Medication[]
}

export default function MedicationsPage() {
  const [medications, setMedications] = useState<MedicationGroup[]>([
    {
      time: '07:00',
      timeLabel: 'Morgens',
      icon: 'sunrise',
      items: [
        { id: '1', name: 'Torasemid', dosage: '20mg', instructions: 'Mit Wasser einnehmen', taken: true },
        { id: '2', name: 'Ramipril', dosage: '5mg', taken: true }
      ]
    },
    {
      time: '12:00',
      timeLabel: 'Mittags',
      icon: 'sun',
      items: [
        { id: '3', name: 'Metformin', dosage: '500mg', instructions: 'Zum Essen einnehmen', taken: false }
      ]
    },
    {
      time: '18:00',
      timeLabel: 'Abends',
      icon: 'sunset',
      items: [
        { id: '4', name: 'Metformin', dosage: '500mg', instructions: 'Zum Essen einnehmen', taken: false },
        { id: '5', name: 'Metoprolol', dosage: '47.5mg', taken: false }
      ]
    }
  ])

  const totalMeds = medications.reduce((sum, g) => sum + g.items.length, 0)
  const takenMeds = medications.reduce((sum, g) => sum + g.items.filter(m => m.taken).length, 0)
  const progressPercent = (takenMeds / totalMeds) * 100

  const handleConfirm = (groupIndex: number, medId: string) => {
    setMedications(prev => prev.map((group, gi) => {
      if (gi !== groupIndex) return group
      return {
        ...group,
        items: group.items.map(med =>
          med.id === medId ? { ...med, taken: true } : med
        )
      }
    }))
  }

  const getTimeIcon = (icon: MedicationGroup['icon']) => {
    switch (icon) {
      case 'sunrise':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'sun':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'sunset':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'moon':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )
    }
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white">Medikamente</h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mt-1">
          Bestätigen Sie Ihre Einnahmen
        </p>
      </div>

      {/* Progress Summary Card */}
      <div className="card p-5 animate-fade-up animate-delay-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <p className="text-patient-sm text-slate-500 dark:text-slate-400">Tagesfortschritt</p>
              <p className="text-patient-lg font-bold text-slate-900 dark:text-white">
                {takenMeds} von {totalMeds} eingenommen
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-patient-2xl font-bold text-primary-600 dark:text-primary-400">
              {Math.round(progressPercent)}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {takenMeds === totalMeds && (
          <div className="mt-3 flex items-center gap-2 text-success-600 dark:text-success-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-patient-sm font-medium">Alle Medikamente eingenommen!</span>
          </div>
        )}
      </div>

      {/* Medication Groups */}
      {medications.map((group, groupIndex) => {
        const groupTaken = group.items.filter(m => m.taken).length
        const groupTotal = group.items.length
        const isGroupComplete = groupTaken === groupTotal

        return (
          <div
            key={group.time}
            className={`card overflow-hidden animate-fade-up animate-delay-${(groupIndex + 2) * 100}`}
          >
            {/* Group Header */}
            <div className={`px-6 py-4 flex items-center justify-between ${isGroupComplete ? 'bg-success-50 dark:bg-success-900/20' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isGroupComplete ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  {getTimeIcon(group.icon)}
                </div>
                <div>
                  <h2 className="text-patient-lg font-semibold text-slate-900 dark:text-white">{group.timeLabel}</h2>
                  <p className="text-patient-sm text-slate-500 dark:text-slate-400">{group.time} Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isGroupComplete ? (
                  <span className="flex items-center gap-1 text-success-600 dark:text-success-400 text-patient-sm font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Komplett
                  </span>
                ) : (
                  <span className="text-patient-sm text-slate-500 dark:text-slate-400">
                    {groupTaken}/{groupTotal}
                  </span>
                )}
              </div>
            </div>

            {/* Medication Items */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {group.items.map((med) => (
                <div
                  key={med.id}
                  className={`px-6 py-4 flex items-center justify-between gap-4 ${med.taken ? 'bg-white dark:bg-slate-800' : 'bg-white dark:bg-slate-800'}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-patient-base font-medium text-slate-900 dark:text-white">
                        {med.name}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded">
                        {med.dosage}
                      </span>
                    </div>
                    {med.instructions && (
                      <p className="text-patient-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {med.instructions}
                      </p>
                    )}
                  </div>

                  {med.taken ? (
                    <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
                      <div className="w-8 h-8 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-patient-sm font-medium hidden sm:inline">Eingenommen</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConfirm(groupIndex, med.id)}
                      className="px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white text-patient-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                      Bestätigen
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Help Text */}
      <div className="card p-4 bg-slate-50 dark:bg-slate-800/50 border-dashed animate-fade-up animate-delay-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-patient-sm text-slate-600 dark:text-slate-400">
              Bestätigen Sie jede Einnahme, sobald Sie das Medikament genommen haben. Bei Fragen kontaktieren Sie Ihr Pflegeteam.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
