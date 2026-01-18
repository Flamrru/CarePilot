'use client'

import { useState, useEffect, useRef } from 'react'
import { getScribeExampleForPatient, defaultScribeExample, type SOAPNote } from '@/data/scribe-examples'

type AmbientScribeProps = {
  isOpen: boolean
  onClose: () => void
  patientId?: string
  patientName?: string
}

type ScribeState = 'idle' | 'recording' | 'processing' | 'complete'

export function AmbientScribe({ isOpen, onClose, patientId, patientName }: AmbientScribeProps) {
  const [state, setState] = useState<ScribeState>('idle')
  const [transcript, setTranscript] = useState('')
  const [structuredOutput, setStructuredOutput] = useState<SOAPNote | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [waveformBars, setWaveformBars] = useState<number[]>(Array(20).fill(10))
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const waveformRef = useRef<NodeJS.Timeout | null>(null)

  const scribeExample = patientId
    ? getScribeExampleForPatient(patientId) || defaultScribeExample
    : defaultScribeExample

  // Animate waveform during recording
  useEffect(() => {
    if (state === 'recording') {
      waveformRef.current = setInterval(() => {
        setWaveformBars(prev => prev.map(() => Math.random() * 40 + 5))
      }, 100)
    } else {
      if (waveformRef.current) {
        clearInterval(waveformRef.current)
      }
      setWaveformBars(Array(20).fill(10))
    }
    return () => {
      if (waveformRef.current) clearInterval(waveformRef.current)
    }
  }, [state])

  // Recording timer
  useEffect(() => {
    if (state === 'recording') {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [state])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartRecording = () => {
    setState('recording')
    setRecordingTime(0)
    setTranscript('')
    setStructuredOutput(null)

    // Simulate transcript appearing over time
    let currentIndex = 0
    const fullTranscript = scribeExample.transcript
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTranscript.length) {
        setTranscript(fullTranscript.substring(0, currentIndex + 1))
        currentIndex++
      }
    }, 30)

    // Auto-stop after simulated duration
    setTimeout(() => {
      clearInterval(typingInterval)
      setTranscript(fullTranscript)
      handleStopRecording()
    }, Math.min(scribeExample.duration * 100, 15000)) // Cap at 15 seconds for demo
  }

  const handleStopRecording = () => {
    setState('processing')

    // Simulate AI processing
    setTimeout(() => {
      setStructuredOutput(scribeExample.structuredOutput)
      setState('complete')
    }, 2000)
  }

  const handleReset = () => {
    setState('idle')
    setTranscript('')
    setStructuredOutput(null)
    setRecordingTime(0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Ambient Scribe</h2>
                <p className="text-primary-100 text-sm">
                  {patientName ? `Dokumentation für ${patientName}` : 'Automatische Dokumentation'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Recording Controls */}
          {state === 'idle' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-danger-100 to-danger-50 dark:from-danger-900/30 dark:to-danger-800/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Aufnahme starten
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Starten Sie die Aufnahme, um das Gespräch mit dem Patienten automatisch zu dokumentieren. Die KI erstellt eine strukturierte SOAP-Notiz.
              </p>
              <button
                onClick={handleStartRecording}
                className="px-8 py-4 bg-danger-500 hover:bg-danger-600 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                  Aufnahme starten
                </div>
              </button>
            </div>
          )}

          {/* Recording State */}
          {state === 'recording' && (
            <div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="w-3 h-3 bg-danger-500 rounded-full animate-pulse"></span>
                  <span className="text-danger-500 font-semibold">Aufnahme läuft</span>
                  <span className="text-slate-500 font-mono">{formatTime(recordingTime)}</span>
                </div>

                {/* Waveform Visualization */}
                <div className="flex items-center justify-center gap-1 h-16 mb-4">
                  {waveformBars.map((height, i) => (
                    <div
                      key={i}
                      className="w-2 bg-gradient-to-t from-primary-500 to-primary-400 rounded-full transition-all duration-100"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleStopRecording}
                  className="px-6 py-3 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
                >
                  Aufnahme beenden
                </button>
              </div>

              {/* Live Transcript */}
              <div className="card p-4 bg-slate-50 dark:bg-slate-900">
                <h4 className="text-sm font-medium text-slate-500 mb-2">Live-Transkript</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line min-h-[100px]">
                  {transcript}
                  <span className="inline-block w-0.5 h-4 bg-primary-500 animate-pulse ml-0.5"></span>
                </p>
              </div>
            </div>
          )}

          {/* Processing State */}
          {state === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="w-full h-full animate-spin text-primary-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Verarbeite Aufnahme...
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Die KI erstellt eine strukturierte Dokumentation
              </p>
            </div>
          )}

          {/* Complete State - SOAP Output */}
          {state === 'complete' && structuredOutput && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Dokumentation erstellt</h3>
                    <p className="text-sm text-slate-500">SOAP-Format • {formatTime(recordingTime)} Aufnahme</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Neue Aufnahme
                </button>
              </div>

              {/* Transcript */}
              <div className="card p-4 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-slate-500">Transkript</h4>
                  <button className="text-xs text-primary-600 hover:underline">Bearbeiten</button>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line max-h-32 overflow-y-auto">
                  {transcript}
                </p>
              </div>

              {/* SOAP Sections */}
              <div className="grid gap-4">
                {/* Subjective */}
                <div className="card p-4 border-l-4 border-l-primary-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold rounded">S</span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Subjektiv</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{structuredOutput.subjective}</p>
                </div>

                {/* Objective */}
                <div className="card p-4 border-l-4 border-l-success-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 text-xs font-bold rounded">O</span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Objektiv</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{structuredOutput.objective}</p>
                </div>

                {/* Assessment */}
                <div className="card p-4 border-l-4 border-l-warning-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400 text-xs font-bold rounded">A</span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Assessment</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{structuredOutput.assessment}</p>
                </div>

                {/* Plan */}
                <div className="card p-4 border-l-4 border-l-danger-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 text-xs font-bold rounded">P</span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Plan</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">{structuredOutput.plan}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {state === 'complete' && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex gap-3">
            <button className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors">
              Bearbeiten
            </button>
            <button className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors">
              In Akte übernehmen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
