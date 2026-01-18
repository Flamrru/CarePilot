'use client'

import { useState } from 'react'
import Link from 'next/link'

type Question = {
  id: string
  question: string
  options: { value: string; label: string; severity?: 'good' | 'neutral' | 'warning' | 'danger' }[]
  icon: 'smile' | 'lungs' | 'moon' | 'pain'
}

export default function QuestionnairePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions: Question[] = [
    {
      id: 'wellbeing',
      question: 'Wie fühlen Sie sich heute allgemein?',
      icon: 'smile',
      options: [
        { value: 'sehr-gut', label: 'Sehr gut', severity: 'good' },
        { value: 'gut', label: 'Gut', severity: 'good' },
        { value: 'mittelmaessig', label: 'Mittelmässig', severity: 'warning' },
        { value: 'schlecht', label: 'Schlecht', severity: 'danger' }
      ]
    },
    {
      id: 'breathing',
      question: 'Haben Sie Atemnot?',
      icon: 'lungs',
      options: [
        { value: 'keine', label: 'Keine Atemnot', severity: 'good' },
        { value: 'belastung', label: 'Bei Anstrengung', severity: 'neutral' },
        { value: 'ruhe', label: 'Auch in Ruhe', severity: 'warning' },
        { value: 'stark', label: 'Starke Atemnot', severity: 'danger' }
      ]
    },
    {
      id: 'sleep',
      question: 'Wie haben Sie letzte Nacht geschlafen?',
      icon: 'moon',
      options: [
        { value: 'sehr-gut', label: 'Sehr gut', severity: 'good' },
        { value: 'gut', label: 'Gut', severity: 'good' },
        { value: 'schlecht', label: 'Schlecht', severity: 'warning' },
        { value: 'sehr-schlecht', label: 'Sehr schlecht', severity: 'danger' }
      ]
    },
    {
      id: 'pain',
      question: 'Haben Sie Schmerzen?',
      icon: 'pain',
      options: [
        { value: 'keine', label: 'Keine Schmerzen', severity: 'good' },
        { value: 'leicht', label: 'Leichte Schmerzen', severity: 'neutral' },
        { value: 'mittel', label: 'Mittlere Schmerzen', severity: 'warning' },
        { value: 'stark', label: 'Starke Schmerzen', severity: 'danger' }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1)
    }, 200)
  }

  const getIcon = (icon: Question['icon']) => {
    switch (icon) {
      case 'smile':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'lungs':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'moon':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )
      case 'pain':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
    }
  }

  const getSeverityClasses = (severity?: string, isSelected?: boolean) => {
    if (isSelected) {
      switch (severity) {
        case 'good':
          return 'bg-success-500 border-success-500 text-white'
        case 'neutral':
          return 'bg-primary-500 border-primary-500 text-white'
        case 'warning':
          return 'bg-warning-500 border-warning-500 text-white'
        case 'danger':
          return 'bg-danger-500 border-danger-500 text-white'
        default:
          return 'bg-primary-500 border-primary-500 text-white'
      }
    }
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-primary-500 dark:hover:border-primary-400'
  }

  // Completion screen
  if (currentQuestion >= questions.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-scale-in">
        <div className="w-24 h-24 bg-gradient-to-br from-success-100 to-success-50 dark:from-success-900/30 dark:to-success-800/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-12 h-12 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white mb-2">
          Vielen Dank!
        </h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
          Ihre Antworten wurden übermittelt und werden von Ihrem Pflegeteam überprüft.
        </p>

        {/* Summary */}
        <div className="w-full max-w-sm card p-4 mb-6 text-left">
          <h3 className="text-patient-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Zusammenfassung</h3>
          <div className="space-y-2">
            {questions.map(q => {
              const answer = answers[q.id]
              const option = q.options.find(o => o.value === answer)
              return (
                <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <span className="text-patient-sm text-slate-600 dark:text-slate-400">{q.question.split('?')[0]}?</span>
                  <span className={`text-patient-sm font-medium ${
                    option?.severity === 'good' ? 'text-success-600' :
                    option?.severity === 'warning' ? 'text-warning-600' :
                    option?.severity === 'danger' ? 'text-danger-600' :
                    'text-slate-900 dark:text-white'
                  }`}>
                    {option?.label || '-'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <Link
          href="/patient"
          className="w-full max-w-sm inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white text-patient-lg font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  const q = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100

  return (
    <div className="space-y-6 pb-6">
      {/* Progress Header */}
      <div className="animate-fade-up">
        <div className="flex items-center justify-between mb-2">
          <p className="text-patient-sm text-slate-500 dark:text-slate-400">
            Frage {currentQuestion + 1} von {questions.length}
          </p>
          <span className="text-patient-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                i < currentQuestion
                  ? 'bg-success-500 text-white'
                  : i === currentQuestion
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              {i < currentQuestion ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="card p-6 animate-fade-up animate-delay-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
            {getIcon(q.icon)}
          </div>
          <h1 className="text-patient-xl font-bold text-slate-900 dark:text-white flex-1">
            {q.question}
          </h1>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {q.options.map((option, i) => {
            const isSelected = answers[q.id] === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(q.id, option.value)}
                className={`w-full p-5 text-left text-patient-lg border-2 rounded-xl transition-all active:scale-[0.98] ${getSeverityClasses(option.severity, isSelected)}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {isSelected && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Back Button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          className="w-full p-4 text-patient-base text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors animate-fade-up animate-delay-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur vorherigen Frage
        </button>
      )}

      {/* Help note */}
      <div className="text-center animate-fade-up animate-delay-300">
        <p className="text-patient-sm text-slate-400 dark:text-slate-500">
          Bei Problemen tippen Sie auf "Anrufen" auf der Startseite
        </p>
      </div>
    </div>
  )
}
