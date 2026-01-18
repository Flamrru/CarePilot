'use client'

import { useState, useRef, useEffect } from 'react'
import { getHintsForPatient, findChatResponse, type AIHint } from '@/data/ai-responses'

type AISidebarProps = {
  isOpen: boolean
  onToggle: () => void
  patientId?: string
  patientName?: string
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AISidebar({ isOpen, onToggle, patientId, patientName }: AISidebarProps) {
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const hints = patientId ? getHintsForPatient(patientId) : []

  const examplePrompts = [
    'Zusammenfassung des Patienten',
    'Aktuelle Vitalwerte',
    'Medikamentenübersicht',
    'Trend der letzten Tage',
    'Was empfiehlst du?'
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (text?: string) => {
    const messageText = text || chatInput.trim()
    if (!messageText) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = findChatResponse(messageText, patientId)
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const getHintIcon = (type: AIHint['type']) => {
    switch (type) {
      case 'warning':
        return (
          <svg className="w-4 h-4 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'trend':
        return (
          <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'suggestion':
        return (
          <svg className="w-4 h-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getHintBgColor = (priority: AIHint['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800'
      case 'medium':
        return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800'
      default:
        return 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
    }
  }

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={onToggle}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-l-xl shadow-lg transition-all ${
          isOpen
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
        }`}
      >
        <div className="flex items-center gap-2">
          {!isOpen && (
            <span className="text-xs font-medium hidden lg:inline">AI Assistent</span>
          )}
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl z-30 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">CarePilot AI</h2>
                <p className="text-sm text-primary-100">
                  {patientName ? `Kontext: ${patientName}` : 'Wählen Sie einen Patienten'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Context Hints */}
            {hints.length > 0 && (
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Hinweise & Empfehlungen
                </h3>
                <div className="space-y-2">
                  {hints.map((hint) => (
                    <div
                      key={hint.id}
                      className={`p-3 rounded-lg border ${getHintBgColor(hint.priority)}`}
                    >
                      <div className="flex items-start gap-2">
                        {getHintIcon(hint.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {hint.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {hint.description}
                          </p>
                          {hint.action && (
                            <button className="mt-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                              {hint.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Fragen stellen
              </h3>

              {/* Example prompts */}
              {messages.length === 0 && (
                <div className="space-y-2 mb-4">
                  {examplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div className="space-y-3 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary-50 dark:bg-primary-900/20 ml-4'
                        : 'bg-slate-50 dark:bg-slate-700/50 mr-4'
                    }`}
                  >
                    <p className="text-sm text-slate-900 dark:text-white whitespace-pre-line">
                      {msg.content}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {msg.role === 'user' ? 'Sie' : 'AI'} • {msg.timestamp.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}

                {isTyping && (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 mr-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Frage stellen..."
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!chatInput.trim() || isTyping}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              KI-generierte Vorschläge. Keine medizinische Beratung.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
