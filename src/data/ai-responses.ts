/**
 * Pre-written AI responses for CarePilot demo
 * These simulate what an AI assistant would say in context
 */

export type AIHint = {
  id: string
  patientId: string
  type: 'warning' | 'info' | 'suggestion' | 'trend'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  action?: {
    label: string
    type: 'navigate' | 'order' | 'schedule' | 'call'
  }
}

export type AIChatResponse = {
  query: string
  response: string
  patientId?: string
}

export type SmartAction = {
  id: string
  patientId: string
  title: string
  description: string
  rationale: string
  type: 'lab' | 'medication' | 'referral' | 'schedule' | 'documentation'
  icon: 'flask' | 'pill' | 'user' | 'calendar' | 'document'
  priority: 'high' | 'medium' | 'low'
}

// Patient-specific AI hints
export const aiHints: AIHint[] = [
  // Hans Gerber - Herzinsuffizienz
  {
    id: 'hint-001',
    patientId: 'patient-001',
    type: 'warning',
    title: 'SpO2-Trend beachten',
    description: 'Die Sauerstoffsättigung ist in den letzten 3 Tagen von 96% auf 92% gefallen. Dies könnte auf eine Verschlechterung der Herzinsuffizienz hindeuten.',
    priority: 'high',
    action: { label: 'Vitalwerte anzeigen', type: 'navigate' }
  },
  {
    id: 'hint-002',
    patientId: 'patient-001',
    type: 'trend',
    title: 'Gewichtszunahme',
    description: 'Hr. Gerber hat in 5 Tagen 2.1 kg zugenommen. Bei Herzinsuffizienz kann dies auf Flüssigkeitsretention hindeuten.',
    priority: 'high',
    action: { label: 'Diuretika-Dosis prüfen', type: 'order' }
  },
  {
    id: 'hint-003',
    patientId: 'patient-001',
    type: 'info',
    title: 'Penicillin-Allergie',
    description: 'Patient hat dokumentierte Penicillin-Allergie mit Anaphylaxie. Bei Infektionsverdacht alternative Antibiotika wählen.',
    priority: 'medium'
  },

  // Maria Meier - Pneumonie
  {
    id: 'hint-004',
    patientId: 'patient-002',
    type: 'info',
    title: 'Antibiotika-Ende',
    description: 'Antibiotikatherapie endet in 3 Tagen. Klinische Beurteilung zur Entscheidung über Verlängerung empfohlen.',
    priority: 'medium',
    action: { label: 'Termin planen', type: 'schedule' }
  },
  {
    id: 'hint-005',
    patientId: 'patient-002',
    type: 'suggestion',
    title: 'CRP-Kontrolle',
    description: 'Zur Beurteilung des Therapieerfolgs wäre eine CRP-Kontrolle sinnvoll.',
    priority: 'low',
    action: { label: 'Labor anfordern', type: 'order' }
  },

  // Peter Schmidt - Post-OP
  {
    id: 'hint-006',
    patientId: 'patient-003',
    type: 'info',
    title: 'Thromboseprophylaxe',
    description: 'Enoxaparin noch 24 Tage. Mobilisation nach Plan, guter Fortschritt.',
    priority: 'low'
  },
  {
    id: 'hint-007',
    patientId: 'patient-003',
    type: 'suggestion',
    title: 'Physio-Koordination',
    description: 'Physiotherapie Di/Do/Sa um 10 Uhr. Pflegebesuch idealerweise davor oder danach planen.',
    priority: 'low'
  },

  // Elisabeth Brunner - Palliativ
  {
    id: 'hint-008',
    patientId: 'patient-004',
    type: 'warning',
    title: 'Schmerzmanagement',
    description: 'Fr. Brunner hat gestern 4x Reservemedikation benötigt. Evtl. Basismedikation anpassen.',
    priority: 'high',
    action: { label: 'Schmerzprotokoll', type: 'navigate' }
  },
  {
    id: 'hint-009',
    patientId: 'patient-004',
    type: 'info',
    title: 'Patientenverfügung',
    description: 'Patientin wünscht keine Reanimation. Dokumentation aktuell und im System hinterlegt.',
    priority: 'medium'
  },

  // Franz Huber - COPD
  {
    id: 'hint-010',
    patientId: 'patient-005',
    type: 'trend',
    title: 'SpO2 verbessert',
    description: 'Sauerstoffsättigung hat sich von 88% auf 93% verbessert. Therapie zeigt Wirkung.',
    priority: 'low'
  },
  {
    id: 'hint-011',
    patientId: 'patient-005',
    type: 'info',
    title: 'Prednisolon ausschleichen',
    description: 'Ab Tag 10 mit Ausschleichen beginnen. Aktuell Tag 11.',
    priority: 'medium',
    action: { label: 'Schema anzeigen', type: 'navigate' }
  }
]

// Pre-written chat responses
export const aiChatResponses: AIChatResponse[] = [
  // General queries
  {
    query: 'zusammenfassung',
    response: 'Basierend auf den aktuellen Daten: Der Patient zeigt eine leichte Verschlechterung der Vitalwerte in den letzten 48 Stunden. Die Sauerstoffsättigung ist von 95% auf 92% gesunken, und das Gewicht hat um 1.2 kg zugenommen. Dies könnte auf eine beginnende Dekompensation hindeuten. Ich empfehle eine Anpassung der Diuretika-Dosis und engmaschigere Überwachung.'
  },
  {
    query: 'medikamente',
    response: 'Aktuelle Medikation:\n• Torasemid 20mg morgens (Diuretikum)\n• Ramipril 5mg morgens (ACE-Hemmer)\n• Metformin 500mg morgens und abends (Diabetes)\n• Metoprolol 47.5mg morgens (Betablocker)\n\nAlle Medikamente wurden heute Morgen bestätigt. Keine Interaktionen erkannt.'
  },
  {
    query: 'vitalwerte',
    response: 'Aktuelle Vitalwerte (heute 07:15):\n• Blutdruck: 128/82 mmHg (Ziel: <130/80)\n• Puls: 72/min (regelmässig)\n• SpO2: 92% (unter Beobachtung)\n• Gewicht: 84.5 kg (+1.2 kg in 3 Tagen)\n• Temperatur: 36.8°C\n\nDer SpO2-Wert und die Gewichtszunahme erfordern Aufmerksamkeit.'
  },
  {
    query: 'trend',
    response: 'Trend der letzten 7 Tage:\n📉 SpO2: 96% → 92% (besorgniserregend)\n📈 Gewicht: 82.4 kg → 84.5 kg (+2.1 kg)\n➡️ Blutdruck: stabil um 125-130/80-85\n➡️ Puls: stabil um 68-75/min\n\nDie Kombination aus sinkendem SpO2 und steigendem Gewicht deutet auf Flüssigkeitsretention hin.'
  },
  {
    query: 'empfehlung',
    response: 'Basierend auf der aktuellen Situation empfehle ich:\n\n1. **Kurzfristig:** Torasemid auf 40mg erhöhen\n2. **Monitoring:** Tägliche Gewichtskontrolle, SpO2 alle 4 Stunden\n3. **Labor:** BNP und Kreatinin zur Verlaufskontrolle\n4. **Nachfass:** Falls keine Besserung in 48h, telefonische Rücksprache mit Kardiologie\n\nSoll ich einen Laborauftrag oder einen Termin vorbereiten?'
  },

  // Patient-specific (Hans Gerber)
  {
    query: 'herzinsuffizienz',
    patientId: 'patient-001',
    response: 'Hr. Gerber hat eine Herzinsuffizienz NYHA III. Vor 2 Wochen erfolgte eine Dekompensation, seither unter Rekompensation. Aktuelle Zeichen einer erneuten Verschlechterung:\n\n• Gewichtszunahme +2.1 kg (5 Tage)\n• SpO2-Abfall auf 92%\n• Erhöhte Ruhedyspnoe (lt. Fragebogen)\n\nBei NYHA III-Patienten ist eine engmaschige Überwachung entscheidend.'
  }
]

// Smart actions per patient
export const smartActions: SmartAction[] = [
  // Hans Gerber
  {
    id: 'action-001',
    patientId: 'patient-001',
    title: 'Labor-Auftrag erstellen',
    description: 'BNP, Kreatinin, Elektrolyte zur Herzinsuffizienz-Kontrolle',
    rationale: 'Gewichtszunahme und SpO2-Abfall deuten auf Dekompensation hin. Laborkontrolle zur Objektivierung.',
    type: 'lab',
    icon: 'flask',
    priority: 'high'
  },
  {
    id: 'action-002',
    patientId: 'patient-001',
    title: 'Diuretika-Dosis anpassen',
    description: 'Torasemid von 20mg auf 40mg erhöhen',
    rationale: 'Bei Flüssigkeitsretention ist eine Dosiserhöhung der First-Line-Therapie.',
    type: 'medication',
    icon: 'pill',
    priority: 'high'
  },
  {
    id: 'action-003',
    patientId: 'patient-001',
    title: 'Kardiologie-Konsil',
    description: 'Telefonische Rücksprache mit Dr. Muster, Kardiologie KSBL',
    rationale: 'Bei Verschlechterung trotz Therapieanpassung ist eine kardiologische Beurteilung sinnvoll.',
    type: 'referral',
    icon: 'user',
    priority: 'medium'
  },

  // Maria Meier
  {
    id: 'action-004',
    patientId: 'patient-002',
    title: 'CRP-Kontrolle',
    description: 'Labor zur Beurteilung des Therapieerfolgs',
    rationale: 'Antibiotikatherapie endet in 3 Tagen. CRP-Verlauf zeigt Therapieerfolg.',
    type: 'lab',
    icon: 'flask',
    priority: 'medium'
  },
  {
    id: 'action-005',
    patientId: 'patient-002',
    title: 'Nachkontrolltermin',
    description: 'Termin 1 Woche nach Therapieende planen',
    rationale: 'Nach Pneumonie sollte eine klinische Nachkontrolle erfolgen.',
    type: 'schedule',
    icon: 'calendar',
    priority: 'low'
  },

  // Peter Schmidt
  {
    id: 'action-006',
    patientId: 'patient-003',
    title: 'Physiotherapie-Bericht',
    description: 'Bericht für Hausarzt erstellen',
    rationale: 'Mobilisation nach Hüft-TEP läuft planmässig. Dokumentation für Anschlussheilbehandlung.',
    type: 'documentation',
    icon: 'document',
    priority: 'low'
  },

  // Elisabeth Brunner
  {
    id: 'action-007',
    patientId: 'patient-004',
    title: 'Schmerztherapie anpassen',
    description: 'Morphin retard auf 2x40mg erhöhen',
    rationale: 'Mehrfache Reservemedikation notwendig. Basismedikation sollte erhöht werden.',
    type: 'medication',
    icon: 'pill',
    priority: 'high'
  },
  {
    id: 'action-008',
    patientId: 'patient-004',
    title: 'Palliativ-Konsil',
    description: 'Telefonische Rücksprache mit Palliative Care Team',
    rationale: 'Bei zunehmendem Schmerzbedarf ist eine Beratung durch Spezialisten sinnvoll.',
    type: 'referral',
    icon: 'user',
    priority: 'medium'
  },

  // Franz Huber
  {
    id: 'action-009',
    patientId: 'patient-005',
    title: 'Prednisolon-Ausschleichschema',
    description: 'Dosis von 20mg auf 15mg reduzieren',
    rationale: 'Tag 11 der Therapie, Ausschleichen gemäss Protokoll beginnen.',
    type: 'medication',
    icon: 'pill',
    priority: 'medium'
  },
  {
    id: 'action-010',
    patientId: 'patient-005',
    title: 'Rauchstopp-Beratung',
    description: 'Termin für Beratung zur Rauchentwöhnung',
    rationale: 'Patient hat bei Hospitalisation aufgehört. Unterstützung für dauerhaften Rauchstopp wichtig.',
    type: 'schedule',
    icon: 'calendar',
    priority: 'low'
  }
]

// Helper functions
export const getHintsForPatient = (patientId: string): AIHint[] => {
  return aiHints.filter(h => h.patientId === patientId)
}

export const getActionsForPatient = (patientId: string): SmartAction[] => {
  return smartActions.filter(a => a.patientId === patientId)
}

export const findChatResponse = (query: string, patientId?: string): string => {
  const normalizedQuery = query.toLowerCase()

  // Try to find patient-specific response first
  if (patientId) {
    const patientResponse = aiChatResponses.find(
      r => r.patientId === patientId && normalizedQuery.includes(r.query)
    )
    if (patientResponse) return patientResponse.response
  }

  // Try to find general response
  const generalResponse = aiChatResponses.find(
    r => !r.patientId && normalizedQuery.includes(r.query)
  )
  if (generalResponse) return generalResponse.response

  // Default response
  return 'Ich habe Ihre Frage verstanden. Basierend auf den verfügbaren Patientendaten kann ich folgende Informationen geben:\n\n• Die Vitalwerte sind im Tagesverlauf dokumentiert\n• Alle Medikamente sind aktuell erfasst\n• Der Behandlungsplan ist im System hinterlegt\n\nMöchten Sie spezifischere Informationen zu Vitalwerten, Medikamenten oder dem Behandlungsverlauf?'
}
