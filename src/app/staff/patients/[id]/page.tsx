'use client'

import { useState } from 'react'
import { usePatientStore } from '@/stores'
import { calculateAge } from '@/data/patients'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AmbientScribe, SmartActions } from '@/components/staff/ai'

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = params.id as string
  const patient = usePatientStore((state) => state.getPatientById(patientId))
  const vitals = usePatientStore((state) => state.getPatientVitals(patientId))
  const [isScribeOpen, setIsScribeOpen] = useState(false)

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-medium text-slate-900 dark:text-white">Patient nicht gefunden</h1>
        <Link href="/staff/patients" className="text-primary-500 hover:underline mt-2 inline-block">
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  const statusColors = {
    stabil: 'bg-success-500',
    beobachten: 'bg-warning-500',
    kritisch: 'bg-danger-500',
  }

  const statusLabels = {
    stabil: 'Stabiler Zustand',
    beobachten: 'Wird beobachtet',
    kritisch: 'Kritischer Zustand',
  }

  const primaryDiagnosis = patient.diagnoses.find((d) => d.isPrimary)

  return (
    <div className="space-y-6">
      <Link
        href="/staff/patients"
        className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Zurück zu Patienten
      </Link>

      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-medium text-slate-600 dark:text-slate-300">
            {patient.firstName[0]}{patient.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {patient.firstName} {patient.lastName}
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${statusColors[patient.status]}`}>
                {statusLabels[patient.status]}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {calculateAge(patient.dateOfBirth)} Jahre • {primaryDiagnosis?.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tag {patient.currentDay} von {patient.totalDays}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsScribeOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Dokumentieren
            </button>
            <button className="inline-flex items-center px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors">
              Anrufen
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Aktuelle Vitalzeichen</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vitals?.spo2 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">SpO2</p>
                  <p className={`text-2xl font-bold ${vitals.spo2.status === 'erniedrigt' ? 'text-warning-600' : 'text-slate-900 dark:text-white'}`}>
                    {vitals.spo2.value}%
                  </p>
                </div>
              )}
              {vitals?.blutdruck && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Blutdruck</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {vitals.blutdruck.systolic}/{vitals.blutdruck.diastolic}
                  </p>
                </div>
              )}
              {vitals?.puls && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Puls</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{vitals.puls.value}</p>
                </div>
              )}
              {vitals?.gewicht && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Gewicht</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{vitals.gewicht.value} kg</p>
                </div>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Medikamente</h2>
            <div className="space-y-3">
              {patient.medications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{med.name}</p>
                    <p className="text-sm text-slate-500">{med.dosage} • {med.frequency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Kontakt</h2>
            <div className="space-y-3 text-sm">
              <p className="text-slate-900 dark:text-white">{patient.address.street} {patient.address.houseNumber}</p>
              <p className="text-slate-500">{patient.address.postalCode} {patient.address.city}</p>
              <p className="text-slate-900 dark:text-white">{patient.phone}</p>
            </div>
          </div>

          {patient.preferences.notes && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Hinweise</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{patient.preferences.notes}</p>
            </div>
          )}

          {/* Smart Actions */}
          <SmartActions
            patientId={patientId}
            patientName={`${patient.firstName} ${patient.lastName}`}
          />
        </div>
      </div>

      {/* Ambient Scribe Modal */}
      <AmbientScribe
        isOpen={isScribeOpen}
        onClose={() => setIsScribeOpen(false)}
        patientId={patientId}
        patientName={`${patient.firstName} ${patient.lastName}`}
      />
    </div>
  )
}
