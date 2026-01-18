/**
 * Pre-written ambient scribe examples for CarePilot demo
 * These simulate what an AI scribe would transcribe and structure
 */

export type ScribeExample = {
  id: string
  patientId: string
  patientName: string
  duration: number // seconds
  transcript: string
  structuredOutput: SOAPNote
}

export type SOAPNote = {
  subjective: string
  objective: string
  assessment: string
  plan: string
}

export const scribeExamples: ScribeExample[] = [
  {
    id: 'scribe-001',
    patientId: 'patient-001',
    patientName: 'Hans Gerber',
    duration: 180,
    transcript: `Also Herr Gerber, wie geht es Ihnen heute?

Patient: Ja, nicht so gut heute. Ich habe schlecht geschlafen, musste zweimal auf die Toilette in der Nacht. Und die Luft ist auch etwas knapp beim Treppensteigen.

Haben Sie Schmerzen oder Beschwerden?

Patient: Nein, Schmerzen habe ich keine. Aber die Beine sind etwas geschwollen, besonders abends.

Okay, ich messe mal Ihren Blutdruck... 128 über 82, das ist in Ordnung. Der Puls ist 72, regelmässig. Sauerstoffsättigung ist heute bei 92 Prozent, das ist etwas tiefer als gestern. Gewicht haben wir schon gemessen, 84.5 Kilo.

Haben Sie alle Medikamente genommen heute Morgen?

Patient: Ja, alle. Die weisse Tablette und die zwei kleinen.

Gut. Ich schaue mir noch die Beine an... ja, ich sehe leichte Ödeme beidseits. Ich werde das mit der Ärztin besprechen, eventuell müssen wir die Wassertablette anpassen.`,
    structuredOutput: {
      subjective: 'Patient berichtet über Schlafstörungen mit Nykturie (2x), Belastungsdyspnoe beim Treppensteigen und abendliche Beinschwellung. Keine Schmerzen. Medikamenteneinnahme bestätigt.',
      objective: 'RR 128/82 mmHg, Puls 72/min regelmässig, SpO2 92% (Vortag 94%), Gewicht 84.5 kg (+0.5 kg). Inspektion: beidseits leichte Unterschenkelödeme.',
      assessment: 'V.a. beginnende kardiale Dekompensation bei bekannter Herzinsuffizienz NYHA III. SpO2-Abfall und Gewichtszunahme als Warnsignale.',
      plan: '1. Rücksprache mit Dr. Müller bzgl. Diuretika-Anpassung\n2. Engmaschige Gewichtskontrolle (täglich)\n3. SpO2-Kontrolle alle 4 Stunden\n4. Nächster Besuch morgen früh'
    }
  },
  {
    id: 'scribe-002',
    patientId: 'patient-002',
    patientName: 'Maria Meier',
    duration: 120,
    transcript: `Guten Tag Frau Meier, wie fühlen Sie sich heute?

Patientin: Viel besser als letzte Woche. Der Husten ist fast weg, nur noch ein bisschen am Morgen.

Haben Sie noch Fieber gehabt?

Patientin: Nein, seit drei Tagen kein Fieber mehr.

Sehr gut. Atmet es sich leichter?

Patientin: Ja, viel besser. Ich kann auch wieder spazieren gehen ohne Probleme.

Das freut mich. Ich höre mal die Lunge ab... die klingt deutlich besser, nur noch minimal Rasselgeräusche rechts basal. Sauerstoffsättigung ist 96 Prozent, sehr gut. Temperatur 36.4.

Sie nehmen das Antibiotikum noch bis Freitag, dann ist die Kur fertig. Wichtig, dass Sie es zu Ende nehmen.`,
    structuredOutput: {
      subjective: 'Patientin berichtet über deutliche Besserung. Husten nur noch morgendlich, kein Fieber seit 3 Tagen. Belastungstoleranz verbessert, kann wieder spazieren gehen.',
      objective: 'SpO2 96%, Temperatur 36.4°C. Auskultation: nur noch minimale RGs rechts basal, sonst vesikuläres Atemgeräusch beidseits.',
      assessment: 'Ambulant erworbene Pneumonie unter Antibiotikatherapie gut regressionär. Antibiotikatherapie noch 3 Tage.',
      plan: '1. Antibiotikum (Amoxicillin/Clavulansäure) bis Freitag fortführen\n2. Schonung weiterhin empfohlen\n3. Bei Verschlechterung sofort melden\n4. Nächster Besuch in 2 Tagen zur Abschlusskontrolle'
    }
  },
  {
    id: 'scribe-003',
    patientId: 'patient-004',
    patientName: 'Elisabeth Brunner',
    duration: 240,
    transcript: `Frau Brunner, wie war die Nacht?

Patientin: Nicht so gut. Ich hatte wieder Schmerzen, musste dreimal die Tropfen nehmen.

Oh je. Wo genau hatten Sie Schmerzen?

Patientin: Im Rücken, wie immer. Und dann auch in der Seite.

Auf einer Skala von null bis zehn, wie stark?

Patientin: In der Nacht war es schon eine Sieben. Jetzt gerade ist es besser, vielleicht eine Vier.

Ist Ihre Tochter heute da?

Tochter: Ja, ich bin hier. Mama hatte eine unruhige Nacht, ich habe auch kaum geschlafen.

Das tut mir leid. Wir sollten über die Schmerzmedikation sprechen. Wenn Sie dreimal die Reserve brauchen, sollten wir die Basismedikation erhöhen. Ich werde das mit der Ärztin besprechen.

Wie ist der Appetit?

Patientin: Nicht so gut. Ich esse nur wenig.

Trinken Sie genug?

Patientin: Meine Tochter achtet darauf, dass ich trinke.`,
    structuredOutput: {
      subjective: 'Patientin berichtet über nächtliche Schmerzen (NRS 7/10), Lokalisation: Rücken und Flanke. 3x Reservemedikation (Morphin-Tropfen) in der Nacht benötigt. Aktuell NRS 4/10. Appetit reduziert, Trinkmenge ausreichend dank Unterstützung der Tochter.',
      objective: 'Patientin wach, schmerzbelastet aber kooperativ. Tochter anwesend und unterstützend. Vitalzeichen nicht gemessen (Priorität Schmerzgespräch).',
      assessment: 'Unzureichende Schmerzkontrolle bei metastasiertem Mammakarzinom mit Knochenmetastasen LWS. Mehrfache Reservemedikation deutet auf zu niedrige Basisdosis hin.',
      plan: '1. Rücksprache Dr. Müller: Morphin retard Erhöhung auf 2x40mg\n2. Reservemedikation beibehalten (10mg bei Bedarf)\n3. Telefonat mit Palliative Care Team zur Mitbeurteilung\n4. Tägliche Visite für nächste 3 Tage\n5. Psychosoziale Unterstützung für Tochter ansprechen'
    }
  }
]

// Simulated transcription that appears letter by letter
export const simulatedTranscripts = [
  'Also, wie geht es Ihnen heute?',
  'Patient: Ja, nicht so gut...',
  'Ich messe mal den Blutdruck...',
  '128 über 82, das ist in Ordnung.',
  'Sauerstoffsättigung bei 92 Prozent.',
  'Haben Sie alle Medikamente genommen?',
  'Patient: Ja, alle Tabletten.',
  'Gut, ich notiere das.'
]

// Helper to get scribe example for patient
export const getScribeExampleForPatient = (patientId: string): ScribeExample | undefined => {
  return scribeExamples.find(s => s.patientId === patientId)
}

// Default scribe example for demo
export const defaultScribeExample = scribeExamples[0]
