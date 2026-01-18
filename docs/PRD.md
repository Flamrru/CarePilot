# CarePilot - Product Requirements Document (PRD)

**Version:** 1.0
**Datum:** 18. Januar 2026
**Status:** Entwurf
**Autor:** CarePilot Produktteam

---

## Inhaltsverzeichnis

1. [Executive Summary](#1-executive-summary)
2. [Vision & Ziele](#2-vision--ziele)
3. [Benutzerrollen & Personas](#3-benutzerrollen--personas)
4. [Kernfunktionen - Staff Dashboard](#4-kernfunktionen---staff-dashboard)
5. [Kernfunktionen - Patienten-App](#5-kernfunktionen---patienten-app)
6. [Kernfunktionen - Familien-Portal](#6-kernfunktionen---familien-portal)
7. [KI & Intelligenz-Layer](#7-ki--intelligenz-layer)
8. [Technische Architektur](#8-technische-architektur)
9. [Mock-Daten & Demo-Szenarien](#9-mock-daten--demo-szenarien)
10. [Compliance & Sicherheit](#10-compliance--sicherheit)
11. [UI/UX Design-Richtlinien](#11-uiux-design-richtlinien)
12. [Abrechnungsintegration](#12-abrechnungsintegration)
13. [Erfolgsmetriken](#13-erfolgsmetriken)

---

## 1. Executive Summary

### Was ist CarePilot?

CarePilot ist eine moderne SaaS-Plattform für **Hospital at Home** (Spital zuhause) - ein Versorgungsmodell, bei dem Patienten, die normalerweise stationär behandelt würden, in ihrem eigenen Zuhause medizinisch versorgt werden.

### Das Problem

Hospital at Home Programme kämpfen heute mit:
- **Fragmentierte Systeme**: Separate Tools für Dokumentation, Routing, Kommunikation, Monitoring
- **Ineffiziente Routenplanung**: Manuelle Planung verschwendet Zeit und Ressourcen
- **Kommunikationslücken**: Patienten wissen nicht, wann das Team kommt
- **Dokumentationslast**: Ärzte verbringen mehr Zeit mit Papierkram als mit Patienten
- **Datensilos**: Telemonitoring-Daten sind nicht mit klinischen Workflows integriert

### Die Lösung

CarePilot vereint alle Aspekte der Hospital at Home Versorgung in einer **KI-gestützten, modernen Plattform**:

| Komponente | Beschreibung |
|------------|--------------|
| **Staff Dashboard** | Web-basierte Kommandozentrale für Ärzte, Pflege und Koordination |
| **Staff Mobile App** | GPS-gestützte Begleitung während der Visiten |
| **Patienten-App** | Transparenz, Kommunikation und aktive Teilnahme für Patienten |
| **Familien-Portal** | Einblick und Kommunikation für Angehörige |
| **KI-Engine** | Ambient Scribe, intelligente Priorisierung, Routenoptimierung |

### Zielmarkt

- **Primär**: Schweizer Spitäler mit Hospital at Home Programmen
- **Initial-Partner**: KSBL Spital zuhause, Laufen (Laufental)
- **Expansion**: Multi-Tenant SaaS für alle deutschsprachigen Regionen

### Geschäftsmodell

Multi-Tenant SaaS mit Co-Branding (CarePilot + Spital-Branding gleichwertig sichtbar)

---

## 2. Vision & Ziele

### Vision Statement

> *"CarePilot macht Hospital at Home so einfach wie einen Uber bestellen - für Patienten transparent, für Teams effizient, für Spitäler skalierbar."*

### Strategische Ziele

| Ziel | Beschreibung | Messung |
|------|--------------|---------|
| **Effizienz** | Reduktion der administrativen Zeit pro Patient | -40% Dokumentationszeit |
| **Transparenz** | Patienten wissen immer, was passiert | >90% Zufriedenheit |
| **Qualität** | Bessere klinische Entscheidungen durch KI-Unterstützung | Weniger Komplikationen |
| **Skalierbarkeit** | Ein Team kann mehr Patienten betreuen | +30% Kapazität |

### Kernprinzipien

1. **Low Touch, High Impact**: So wenig manuelle Eingaben wie möglich, KI übernimmt repetitive Aufgaben
2. **Mobile First**: Alles funktioniert unterwegs auf dem Smartphone
3. **Volle Transparenz**: Patienten und Familien sind informiert, nicht im Dunkeln
4. **Swiss Quality**: Höchste Standards für Datenschutz und Sicherheit

---

## 3. Benutzerrollen & Personas

### 3.1 Primäre Benutzer

#### Ärztin / Arzt
**Persona: Dr. Sarah Müller, 38, Oberärztin Innere Medizin**

| Aspekt | Details |
|--------|---------|
| **Arbeitsalltag** | 3-5 Hausbesuche pro Tag, Supervision des Pflegeteams, Dokumentation |
| **Schmerzpunkte** | Zu viel Papierkram, keine Zeit für "echte" Medizin, unklare Priorisierung |
| **Ziele** | Schnell dokumentieren, klare Übersicht über alle Patienten, Notfälle früh erkennen |
| **CarePilot Nutzung** | Dashboard für Übersicht, Mobile App bei Visiten, Ambient Scribe für Dokumentation |

#### Pflegefachperson
**Persona: Marco Bianchi, 29, Pflegefachmann HF**

| Aspekt | Details |
|--------|---------|
| **Arbeitsalltag** | 6-8 Hausbesuche pro Tag, Vitalzeichen, Medikamente, Wundversorgung |
| **Schmerzpunkte** | Ständig Material vergessen, Routenplanung chaotisch, Doppeldokumentation |
| **Ziele** | Wissen was mitnehmen, effiziente Route, schnelle Dokumentation |
| **CarePilot Nutzung** | Mobile App mit GPS, Inventar-Checkliste, Schnelleingabe |

#### Koordinator/in
**Persona: Anna Weber, 45, MPA und Teamkoordinatorin**

| Aspekt | Details |
|--------|---------|
| **Arbeitsalltag** | Patientenaufnahme, Terminplanung, Transportorganisation, Telefon |
| **Schmerzpunkte** | Manuelle Planung, viele Telefonate, Überblick verlieren |
| **Ziele** | Automatische Planung, weniger Telefonate, alle Infos an einem Ort |
| **CarePilot Nutzung** | Dashboard für Gesamtübersicht, Planungstools, Kommunikation |

### 3.2 Sekundäre Benutzer

#### Patient/in
**Persona: Hans Gerber, 72, Pensionär, Herzinsuffizienz**

| Aspekt | Details |
|--------|---------|
| **Situation** | Dekompensierte Herzinsuffizienz, IV-Diuretika zu Hause |
| **Bedürfnisse** | Wissen wann jemand kommt, einfache Bedienung, Sicherheitsgefühl |
| **Technische Fähigkeiten** | Smartphone-Basics, WhatsApp, keine komplexen Apps |
| **CarePilot Nutzung** | Einfache Patienten-App, Ankunftszeit sehen, Fragebogen beantworten |

#### Angehörige
**Persona: Monika Gerber, 68, Ehefrau von Hans**

| Aspekt | Details |
|--------|---------|
| **Rolle** | Hauptbetreuungsperson, nimmt Medikamente entgegen, beobachtet Zustand |
| **Bedürfnisse** | Informiert sein, Fragen stellen können, nicht allein gelassen fühlen |
| **CarePilot Nutzung** | Familien-Portal mit Leserechten, Benachrichtigungen, Chat |

### 3.3 Administrative Benutzer

#### Spital-Administrator
- Benutzerverwaltung
- Konfiguration der Spital-spezifischen Einstellungen
- Reporting und Statistiken
- Abrechnungsübersicht

#### Transport-Dispatcher
- Sieht Transportanfragen
- Koordiniert externe Transporte
- Bestätigt Abholzeiten

### 3.4 Externe Stakeholder

| Rolle | Zugriff |
|-------|---------|
| **Hausarzt** | Lesezugriff auf Verlauf, Berichte empfangen |
| **Apotheke** | Medikamentenliste, Lieferkoordination |
| **Labor** | Laboraufträge empfangen, Resultate senden |
| **Physiotherapie** | Verordnungen sehen, Termine koordinieren |

---

## 4. Kernfunktionen - Staff Dashboard

### 4.1 Übersicht (Home Dashboard)

Das Home Dashboard ist die **Kommandozentrale** für den Tag.

#### Hauptelemente

```
┌─────────────────────────────────────────────────────────────────────┐
│  CarePilot × KSBL Spital zuhause                    🔔 12  👤 Dr.M │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ 📊 HEUTE     │  │ 🚨 ALERTS    │  │ 📍 ROUTE     │               │
│  │ 12 Patienten │  │ 3 dringend   │  │ 47km optimal │               │
│  │ 8 Visiten    │  │ 5 offen      │  │ ~4h Fahrzeit │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                      │
│  ┌─────────────────────────────────┐  ┌────────────────────────────┐│
│  │         TAGES-ROUTE             │  │     BENACHRICHTIGUNGEN     ││
│  │                                 │  │                            ││
│  │    [Interaktive Karte mit      │  │  🔴 Hr. Gerber: SpO2 88%   ││
│  │     optimierter Route und      │  │  🟡 Fr. Meier: Frage zu    ││
│  │     Patienten-Markierungen]    │  │     Medikament             ││
│  │                                 │  │  🟢 Transport bestätigt    ││
│  │                                 │  │     für Fr. Schmidt        ││
│  └─────────────────────────────────┘  └────────────────────────────┘│
│                                                                      │
│  NÄCHSTE VISITE in 23min                                            │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ Hans Gerber, 72 · Herzinsuffizienz · Bahnhofstr. 15, Laufen    ││
│  │ ⚠️ Gestern SpO2-Abfall · 💊 IV Diuretika · 📋 Labor fällig    ││
│  │                                          [Route starten →]      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

#### Funktionen

| Funktion | Beschreibung |
|----------|--------------|
| **Tagesübersicht** | Anzahl Patienten, geplante Visiten, Team-Auslastung |
| **Alert-Center** | KI-priorisierte Benachrichtigungen (dringend/normal/info) |
| **Routen-Widget** | Optimierte Tagesroute mit Zeitschätzung |
| **Quick Actions** | Schnellzugriff auf häufige Aktionen |
| **Team-Status** | Wo sind die Teammitglieder gerade? |

### 4.2 Patienten-Liste

#### Ansichten

| Ansicht | Beschreibung |
|---------|--------------|
| **Kartenansicht** | Alle Patienten auf der Karte, farbcodiert nach Dringlichkeit |
| **Listenansicht** | Sortierbar nach Name, Dringlichkeit, nächste Visite, Diagnose |
| **Teamansicht** | Gefiltert nach zugeteiltem Arzt/Pflege-Team |

#### Patienten-Karte (in der Liste)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🔴 Hans Gerber                                    Tag 5 von 14 │
│ 72 Jahre · Herzinsuffizienz, Typ-2-Diabetes                    │
│                                                                 │
│ 📍 Bahnhofstr. 15, 4242 Laufen        🕐 Visite: 09:30 - 10:00 │
│                                                                 │
│ Letzte Werte:  ❤️ 88 bpm  |  🫁 SpO2 91%  |  ⚖️ +1.2kg        │
│                                                                 │
│ ⚠️ SpO2 unter Zielwert · Fragebogen: "Atemnot bei Belastung"  │
│                                                                 │
│ [Details]  [Chat]  [Anrufen]  [Navigation]                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Patienten-Detailansicht

Die umfassende Ansicht eines einzelnen Patienten.

#### Layout-Struktur

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Zurück                Hans Gerber                    [⋮ Aktionen]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  HEADER: Foto, Name, Alter, Hauptdiagnose, Tag X von Y              │
│                                                                      │
├──────────────────────────────────┬──────────────────────────────────┤
│                                  │                                   │
│  📋 KLINISCHE ÜBERSICHT          │  🗺️ STANDORT & ANFAHRT           │
│  ─────────────────────────       │  ─────────────────────────        │
│  Hauptdiagnose                   │  [Interaktive Karte]              │
│  Nebendiagnosen                  │                                   │
│  Allergien                       │  Bahnhofstr. 15                   │
│  Aktuelle Medikation             │  4242 Laufen                      │
│                                  │                                   │
│  📊 AKTUELLE WERTE               │  🚗 12 min von aktuellem          │
│  ─────────────────────────       │     Standort                      │
│  [Vitalzeichen-Trends]           │                                   │
│                                  │  📞 +41 61 xxx xx xx              │
│                                  │                                   │
│  💊 HEUTE ZU TUN                 │  ⏰ PRÄFERENZEN                   │
│  ─────────────────────────       │  ─────────────────────────        │
│  ☑️ IV Furosemid 40mg           │  Bevorzugte Zeit: 09:00-11:00     │
│  ☐ Blutentnahme (Na, K, Krea)   │  Hund im Haushalt                 │
│  ☐ Gewichtskontrolle            │  Ehefrau meist anwesend           │
│                                  │                                   │
├──────────────────────────────────┴──────────────────────────────────┤
│                                                                      │
│  [Verlauf]  [Kurve]  [Berichte]  [Dokumente]  [Kommunikation]       │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                         VERLAUF                                 ││
│  │                                                                 ││
│  │  17.01.2026, 14:30 - Pflege-Visite (M. Bianchi)               ││
│  │  Patient klagt über zunehmende Dyspnoe bei Belastung.          ││
│  │  Beinödeme beidseits leicht zunehmend. Gewicht +0.8kg zum      ││
│  │  Vortag. SpO2 91% bei Raumluft. IV Furosemid 40mg gegeben.     ││
│  │  → Dr. Müller informiert, Rücksprache erfolgt.                 ││
│  │                                                    [🎤 Audio]  ││
│  │  ─────────────────────────────────────────────────────────     ││
│  │  17.01.2026, 09:00 - Arzt-Visite (Dr. S. Müller)              ││
│  │  ...                                                           ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ─────────────────────────────────────────────────────────────────  │
│  🤖 KI-ASSISTENT                                           [Chat →] │
│  "Trend: Gewichtszunahme +1.8kg in 3 Tagen. Empfehlung:            │
│   Diuretika-Dosis evaluieren."                                      │
└─────────────────────────────────────────────────────────────────────┘
```

#### Tabs im Detail

**Verlauf (Timeline)**
- Chronologische Einträge aller Kontakte
- Filter nach Typ (Arzt, Pflege, Telemedizin, System)
- Audio-Aufnahmen verlinkt (Ambient Scribe)
- KI-generierte Zusammenfassungen

**Kurve (Medizinische Kurve)**
- Vitalzeichen-Trends mit Graphen
- Medikamenten-Verabreichung
- Ein-/Ausfuhr-Bilanz
- Labor-Werte im Verlauf

**Berichte**
- Alle generierten Berichte (Eintrittsbericht, Verlaufsberichte, Austrittsbericht)
- OCR-erfasste externe Dokumente
- Export-Funktionen

**Dokumente**
- Hochgeladene Dateien
- Verordnungen (Physio, Ergo, etc.)
- Einwilligungen

**Kommunikation**
- Chat-Verlauf mit Patient/Familie
- Telemedizin-Protokolle
- Gesendete Nachrichten

### 4.4 Inventar & Vorbereitung

#### "Was muss ich mitnehmen?" - Ansicht

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎒 VORBEREITUNG: Hans Gerber                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BASIEREND AUF HEUTIGEN AUFGABEN:                               │
│                                                                  │
│  💉 MEDIKAMENTE                                                  │
│  ☐ Furosemid 40mg Ampullen (2x)                                 │
│  ☐ NaCl 0.9% 100ml (1x)                                         │
│  ☐ Infusionsbesteck                                              │
│                                                                  │
│  🧪 LABOR                                                        │
│  ☐ EDTA-Röhrchen (2x)                                           │
│  ☐ Serum-Röhrchen (2x)                                          │
│  ☐ Butterfly 21G                                                 │
│  ☐ Stauschlauch                                                  │
│  ☐ Desinfektionstupfer                                          │
│                                                                  │
│  📋 DOKUMENTE                                                    │
│  ☐ Labor-Auftrag (bereits generiert)                            │
│                                                                  │
│  💡 HINWEISE                                                     │
│  • Patient hat schwierige Venenverhältnisse (letzte BE 2x       │
│    Versuch nötig)                                                │
│  • Waage vor Ort vorhanden                                       │
│                                                                  │
│                              [✓ Alles eingepackt]               │
└─────────────────────────────────────────────────────────────────┘
```

#### Inventar-Tracking

| Funktion | Beschreibung |
|----------|--------------|
| **Auto-Generierung** | KI erstellt Packliste basierend auf Tagesaufgaben |
| **Kit-Tracking** | Was ist aktuell im Auto/Koffer? |
| **Verbrauchsmeldung** | Nach Visite: Was wurde verwendet? |
| **Nachbestellung** | Automatische Meldung wenn Material niedrig |

### 4.5 Routenplanung & Optimierung

#### Planungsansicht

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📍 ROUTENPLANUNG - Montag, 20. Januar 2026                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TEAM: Dr. Müller + M. Bianchi        FAHRZEUGE: 2 (Auto A, Auto B)│
│                                                                      │
│  ┌─────────────────────────────────┐  ┌────────────────────────────┐│
│  │                                 │  │  OPTIMIERTE REIHENFOLGE    ││
│  │      [INTERAKTIVE KARTE]       │  │                            ││
│  │                                 │  │  AUTO A (Dr. Müller):      ││
│  │   Route A: ───────             │  │  1. 08:30 Gerber (Arzt+Pfl)││
│  │   Route B: ─ ─ ─ ─             │  │  2. 10:00 Meier (nur Arzt) ││
│  │                                 │  │  3. 11:30 Schmidt (Arzt)   ││
│  │   🔴 Dringend                   │  │                            ││
│  │   🟡 Normal                     │  │  AUTO B (M. Bianchi):      ││
│  │   🟢 Flexibel                   │  │  1. 08:30 Gerber (mit Arzt)││
│  │                                 │  │  2. 09:30 Huber (Pflege)   ││
│  │                                 │  │  3. 10:30 Brunner (Pflege) ││
│  │                                 │  │  4. 13:00 Meier (Pflege)   ││
│  └─────────────────────────────────┘  └────────────────────────────┘│
│                                                                      │
│  📊 OPTIMIERUNGS-DETAILS                                            │
│  ─────────────────────────────────────────────────────────────────  │
│  Gesamtstrecke: 67 km (optimiert von 94 km = -29%)                  │
│  Geschätzte Fahrzeit: 1h 45min                                       │
│  Berücksichtigt: 3 Zeitpräferenzen, 1 dringende Visite, Verkehr    │
│                                                                      │
│  ⚠️ Konflikt: Fr. Meier wünscht Besuch vor 10:00, aber Route       │
│     optimaler um 13:00. [Präferenz einhalten] [Optimiert lassen]   │
│                                                                      │
│  [Route übernehmen]  [Manuell anpassen]  [Neu berechnen]           │
└─────────────────────────────────────────────────────────────────────┘
```

#### Optimierungs-Algorithmus

| Faktor | Gewichtung | Beschreibung |
|--------|------------|--------------|
| **Medizinische Dringlichkeit** | Höchste | Kritische Patienten zuerst |
| **Patienten-Präferenzen** | Hoch | Bevorzugte Zeitfenster |
| **Geografische Effizienz** | Mittel | Kürzeste Gesamtstrecke |
| **Verkehrslage** | Mittel | Echtzeit-Verkehrsdaten |
| **Aufgaben-Dauer** | Mittel | Geschätzte Zeit pro Visite |
| **Team-Verfügbarkeit** | Mittel | Wer kann wann? |

#### Lernende Optimierung

Das System lernt aus historischen Daten:
- Tatsächliche Visitendauer vs. geschätzte
- Verkehrsmuster zu bestimmten Zeiten
- Patienten-spezifische Zeitbedarfe

### 4.6 Team-Management

#### Ärzte-Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│ 👨‍⚕️ ÄRZTE-ÜBERSICHT                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MEINE PATIENTEN (8)                                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [Patienten-Liste mit ärztlich relevanten Infos]             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  AUSSTEHENDE AUFGABEN                                           │
│  ☐ Medikamentenänderung bestätigen (Hr. Gerber)                 │
│  ☐ Labor-Resultate beurteilen (Fr. Schmidt)                     │
│  ☐ Austrittsbericht diktieren (Hr. Brunner)                     │
│                                                                  │
│  SUPERVISION PFLEGE                                              │
│  3 Verlaufseinträge zur Kenntnisnahme                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Pflege-Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│ 👩‍⚕️ PFLEGE-ÜBERSICHT                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HEUTIGE VISITEN (6)                                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ 08:30 Gerber - IV, Vitalzeichen, Gewicht                    ││
│  │ 09:30 Huber - Wundversorgung, Medikamente                   ││
│  │ ...                                                          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  📦 MATERIAL-CHECK                                               │
│  Alle Materialien für heute: ✓ Vollständig                      │
│                                                                  │
│  📝 OFFENE DOKUMENTATION                                         │
│  2 Visiten noch nicht abgeschlossen                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.7 Benachrichtigungs-Center

#### Alert-Priorisierung (KI-gestützt)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🔔 BENACHRICHTIGUNGEN                        [Alle als gelesen] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔴 DRINGEND (KI-Empfehlung: Sofort handeln)                    │
│  ───────────────────────────────────────────                    │
│  • Hr. Gerber: SpO2 88% - unter kritischer Schwelle             │
│    [Anrufen] [Notfall-Visite planen] [Ignorieren + Begründung]  │
│                                                                  │
│  🟡 WICHTIG (KI-Empfehlung: Heute bearbeiten)                   │
│  ───────────────────────────────────────────                    │
│  • Fr. Meier: Fragt nach Schmerzmittel-Alternativen             │
│  • Labor eingetroffen: Hr. Brunner - Kalium 5.8                 │
│  • Physio-Verordnung läuft aus: Fr. Schmidt                     │
│                                                                  │
│  🟢 INFORMATION                                                  │
│  ───────────────────────────────────────────                    │
│  • Transport bestätigt für Fr. Schmidt (CT morgen)              │
│  • Hr. Huber hat Fragebogen ausgefüllt - keine Auffälligkeiten  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Alert-Regeln

| Trigger | Priorität | Aktion |
|---------|-----------|--------|
| SpO2 < 90% | 🔴 Dringend | Push + Sound |
| Gewicht +2kg/Tag | 🔴 Dringend | Push + Sound |
| Patient meldet starke Schmerzen | 🔴 Dringend | Push + Sound |
| Abnormales Labor | 🟡 Wichtig | Push |
| Frage vom Patient | 🟡 Wichtig | Push |
| Fragebogen nicht ausgefüllt | 🟢 Info | Dashboard |
| Transport bestätigt | 🟢 Info | Dashboard |

---

## 5. Kernfunktionen - Patienten-App

### 5.1 Überblick

Die Patienten-App ist bewusst **einfach gehalten** - optimiert für ältere Nutzer mit grundlegenden Smartphone-Kenntnissen.

#### Design-Prinzipien

| Prinzip | Umsetzung |
|---------|-----------|
| **Grosse Schrift** | Minimum 18pt, wichtiges 24pt+ |
| **Klare Kontraste** | WCAG AAA konform |
| **Wenige Optionen** | Max 4-5 Hauptfunktionen |
| **Eindeutige Icons** | Mit Text-Labels |
| **Fehlertoleranz** | Bestätigungen bei wichtigen Aktionen |

### 5.2 Hauptbildschirm

```
┌─────────────────────────────────────────┐
│                                         │
│     Guten Morgen, Herr Gerber           │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │   🚗 IHR PFLEGETEAM KOMMT           ││
│  │                                     ││
│  │      in ca. 25 Minuten              ││
│  │                                     ││
│  │   [    Live-Karte anzeigen    ]     ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  📋 TÄGLICHER CHECK-IN              ││
│  │  Bitte ausfüllen (2 min)            ││
│  │                        [Starten →]  ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  💊 MEDIKAMENTE HEUTE               ││
│  │  3 von 5 bestätigt                  ││
│  │                        [Öffnen →]   ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌────────────┐  ┌────────────────────┐ │
│  │ 📞 Anrufen │  │ 💬 Nachricht       │ │
│  └────────────┘  └────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 5.3 Uber-Style Ankunfts-Tracking

```
┌─────────────────────────────────────────┐
│ ← Zurück                                │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │        [LIVE KARTE]                 ││
│  │                                     ││
│  │    🚗 ─ ─ ─ ─ ─ ─ → 🏠              ││
│  │                                     ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│        Marco Bianchi                    │
│        Pflegefachmann                   │
│                                         │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│     Ankunft: ca. 09:28 Uhr              │
│     (noch 12 Minuten)                   │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  Heute geplant:                     ││
│  │  • Vitalzeichen messen              ││
│  │  • Infusion verabreichen            ││
│  │  • Blutentnahme                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  [        📞 Team anrufen        ]      │
│                                         │
└─────────────────────────────────────────┘
```

### 5.4 Täglicher Fragebogen

Diagnose-spezifische Fragen, KI-generiert basierend auf Hauptdiagnose.

**Beispiel: Herzinsuffizienz**

```
┌─────────────────────────────────────────┐
│ ← Zurück            Frage 1 von 5       │
│                                         │
│                                         │
│   Wie ist Ihre Atmung heute?            │
│                                         │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │     😊 Gut, keine Probleme          ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │     😐 Etwas kurzatmig              ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │     😟 Deutlich erschwert           ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │     😰 Atemnot in Ruhe              ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

### 5.5 Medikamenten-Tracking

```
┌─────────────────────────────────────────┐
│ ← Zurück         MEDIKAMENTE            │
│                                         │
│  Samstag, 18. Januar 2026               │
│                                         │
│  MORGEN (08:00)                         │
│  ┌─────────────────────────────────────┐│
│  │ ✓ Torasemid 10mg                    ││
│  │   Eingenommen um 08:15              ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ✓ Metoprolol 50mg                   ││
│  │   Eingenommen um 08:15              ││
│  └─────────────────────────────────────┘│
│                                         │
│  MITTAG (12:00)                         │
│  ┌─────────────────────────────────────┐│
│  │ ○ Ramipril 5mg                      ││
│  │   [Eingenommen ✓] [Nicht genomm.]   ││
│  └─────────────────────────────────────┘│
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [  📷 Foto/Frage zu Medikament  ]      │
│                                         │
│  [  ⚠️ Nebenwirkung melden  ]           │
│                                         │
└─────────────────────────────────────────┘
```

### 5.6 Kommunikation

#### Nachricht senden

```
┌─────────────────────────────────────────┐
│ ← Zurück         NACHRICHT              │
│                                         │
│  An: Pflegeteam KSBL                    │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │  Ihre Nachricht...                  ││
│  │                                     ││
│  │                                     ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ 📷 Foto  │  │ 🎤 Sprach │             │
│  └──────────┘  └──────────┘             │
│                                         │
│  ───────────────────────────────────    │
│  Schnell-Nachrichten:                   │
│                                         │
│  [ Mir geht es schlechter ]             │
│  [ Frage zu Medikament ]                │
│  [ Termin verschieben ]                 │
│                                         │
│         [ Nachricht senden ]            │
│                                         │
└─────────────────────────────────────────┘
```

### 5.7 Video-Anruf (Telemedizin)

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │                                     ││
│  │     [VIDEO FEED - ARZT]             ││
│  │                                     ││
│  │                                     ││
│  │                          ┌────────┐ ││
│  │                          │ Sie    │ ││
│  │                          └────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│     Dr. Sarah Müller                    │
│     KSBL Spital zuhause                 │
│                                         │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │  🎤    │  │  📹    │  │  🔴    │    │
│  │  Mute  │  │ Kamera │  │Auflegen│    │
│  └────────┘  └────────┘  └────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 6. Kernfunktionen - Familien-Portal

### 6.1 Zugriffs-Konzept

Angehörige erhalten **limitierten Zugang** nach Einwilligung des Patienten.

| Funktion | Zugriff |
|----------|---------|
| Ankunftszeit des Teams | ✅ Ja |
| Allgemeiner Zustand (gut/mittel/kritisch) | ✅ Ja |
| Benachrichtigungen bei wichtigen Events | ✅ Ja |
| Chat mit Pflegeteam | ✅ Ja |
| Detaillierte Vitalwerte | ⚠️ Optional (Patient entscheidet) |
| Medikamentenliste | ⚠️ Optional |
| Vollständige Krankenakte | ❌ Nein |

### 6.2 Familien-Dashboard

```
┌─────────────────────────────────────────┐
│                                         │
│  Hans Gerber - Ihr Angehöriger          │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  AKTUELLER STATUS                   ││
│  │                                     ││
│  │  🟢 Stabiler Zustand                ││
│  │                                     ││
│  │  Letzte Visite: Heute, 09:45        ││
│  │  Nächste Visite: Morgen, 10:00      ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  LETZTE UPDATES                     ││
│  │                                     ││
│  │  • Visite verlief gut               ││
│  │  • Medikamente angepasst            ││
│  │  • Blutdruck im Zielbereich         ││
│  └─────────────────────────────────────┘│
│                                         │
│  [  💬 Team kontaktieren  ]             │
│                                         │
└─────────────────────────────────────────┘
```

---

## 7. KI & Intelligenz-Layer

### 7.1 Ambient Scribe (Voice-First Dokumentation)

#### Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Visite    │───▶│  Aufnahme   │───▶│   KI        │───▶│  Verlaufs-  │
│   starten   │    │  läuft      │    │  Analyse    │    │  eintrag    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                         │                   │
                         ▼                   ▼
                   [Audio-File]      [Strukturierte
                    gespeichert       Extraktion:
                                     - Subjektiv
                                     - Objektiv
                                     - Assessment
                                     - Plan]
```

#### Beispiel-Output

**Audio-Input (vereinfacht):**
> "Also Herr Gerber, wie geht es Ihnen heute? ... Ja die Beine sind noch geschwollen... Blutdruck ist 145 zu 85, Puls 78... Die Sättigung ist bei 91%... Wir erhöhen das Torasemid auf 20mg..."

**KI-generierter Verlaufseintrag:**

```
┌─────────────────────────────────────────────────────────────────┐
│ VERLAUFSEINTRAG - Generiert von CarePilot AI                   │
│ 18.01.2026, 09:45 | Arzt-Visite | Dr. S. Müller               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ SUBJEKTIV                                                       │
│ Patient berichtet über weiterhin geschwollene Beine.            │
│ Keine Dyspnoe in Ruhe, bei Belastung leichte Kurzatmigkeit.    │
│                                                                 │
│ OBJEKTIV                                                        │
│ • BD: 145/85 mmHg                                               │
│ • Puls: 78/min, regelmässig                                     │
│ • SpO2: 91% (Raumluft)                                          │
│ • Beinödeme: beidseits prätibial ++                            │
│                                                                 │
│ ASSESSMENT                                                      │
│ Herzinsuffizienz mit persistierenden Ödemen bei suboptimaler   │
│ Diurese.                                                        │
│                                                                 │
│ PLAN                                                            │
│ • Torasemid erhöhen: 10mg → 20mg 1-0-0                         │
│ • Gewichtskontrolle täglich                                     │
│ • Nächste Visite morgen zur Reevaluation                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [🎤 Original-Audio]  [✏️ Bearbeiten]  [✓ Bestätigen]           │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 KI-Sidebar-Assistent

Kontextueller Helfer, der immer verfügbar ist.

```
┌─────────────────────────────────────────┐
│ 🤖 CarePilot Assistent                  │
├─────────────────────────────────────────┤
│                                         │
│ Bezogen auf: Hans Gerber                │
│                                         │
│ ─────────────────────────────────────   │
│                                         │
│ 💡 AKTUELLE HINWEISE                    │
│                                         │
│ • Gewichtstrend: +1.8kg in 3 Tagen      │
│   → Diuretika-Anpassung erwägen?        │
│                                         │
│ • SpO2 unter Zielwert (91% statt 94%)   │
│   → O2-Gabe evaluieren?                 │
│                                         │
│ • Kalium zuletzt 4.8 - Kontrolle        │
│   empfohlen bei Diuretika-Erhöhung      │
│                                         │
│ ─────────────────────────────────────   │
│                                         │
│ [Nachricht eingeben...]                 │
│                                         │
│ Beispiel-Fragen:                        │
│ • "Zusammenfassung letzte 3 Tage"       │
│ • "Wechselwirkungen neue Medis?"        │
│ • "Brief an Hausarzt erstellen"         │
│                                         │
└─────────────────────────────────────────┘
```

### 7.3 KI-Chat-Ansicht (Deep Dive)

Für komplexere Fragen und Analysen.

```
┌─────────────────────────────────────────────────────────────────┐
│ 🤖 KI-Analyse: Hans Gerber                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  👤 Wie hat sich der Patient in der letzten Woche entwickelt?  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  🤖 Zusammenfassung Woche 15.-18. Januar:                      │
│                                                                 │
│  POSITIV:                                                       │
│  • Blutdruck stabilisiert (Ø 138/82)                           │
│  • Compliance Medikamente: 95%                                  │
│  • Keine Hospitalisierung nötig                                │
│                                                                 │
│  BESORGNISERREGEND:                                             │
│  • Gewichtszunahme: +1.8kg (73.2 → 75.0 kg)                    │
│  • SpO2-Trend: fallend (94% → 91%)                             │
│  • Subjektiv zunehmende Belastungsdyspnoe                      │
│                                                                 │
│  EMPFEHLUNG:                                                    │
│  Die Daten deuten auf eine beginnende Dekompensation hin.      │
│  Empfohlen: Diuretika-Intensivierung und engmaschigere         │
│  Überwachung (tägliche Visiten).                               │
│                                                                 │
│  📊 [Grafik: Gewichtsverlauf]                                  │
│  📊 [Grafik: SpO2-Verlauf]                                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Nachricht eingeben...]                              [Senden]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Inline-Suggestions

Kontextuelle Vorschläge direkt im Workflow.

**Beispiel: Medikamenten-Verordnung**

```
┌─────────────────────────────────────────────────────────────────┐
│ NEUE VERORDNUNG                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Medikament: [Torasemid 20mg          ▼]                        │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 💡 KI-Hinweis:                                              │ │
│ │ Bei Torasemid-Erhöhung: Kalium-Kontrolle in 3 Tagen        │ │
│ │ empfohlen. [Labor hinzufügen]                               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Dosierung: [1-0-0                    ▼]                        │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 💡 Wechselwirkung beachten:                                 │ │
│ │ Patient nimmt Ramipril - ACE-Hemmer + Schleifendiuretikum  │ │
│ │ erhöht Hypotonie-Risiko. BD-Monitoring empfohlen.          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.5 Smart Actions

Automatisch generierte Vorschläge für nächste Schritte.

```
┌─────────────────────────────────────────────────────────────────┐
│ ⚡ SMART ACTIONS für Hans Gerber                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Basierend auf aktueller Situation:                              │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📋 Labor-Auftrag erstellen                                  │ │
│ │    Na, K, Kreatinin, NT-proBNP                              │ │
│ │    (Empfohlen wegen Diuretika-Anpassung)                    │ │
│ │                                              [Erstellen →]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📄 Physio-Verordnung                                        │ │
│ │    Atemtherapie, Mobilisation                               │ │
│ │    (Patient dekonditioniert, Dyspnoe)                       │ │
│ │                                              [Erstellen →]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ✉️ Hausarzt-Information                                     │ │
│ │    Kurzbericht über Diuretika-Anpassung                     │ │
│ │                                              [Erstellen →]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.6 Alert-Priorisierung

Die KI analysiert eingehende Daten und priorisiert automatisch.

| Input | Analyse | Output |
|-------|---------|--------|
| SpO2 88% | Unter kritischer Schwelle + Trend fallend | 🔴 DRINGEND |
| Gewicht +0.5kg | Normal für Herzinsuffizienz | 🟢 Info |
| Gewicht +2kg/Tag | Schnelle Zunahme = Dekompensation | 🔴 DRINGEND |
| Frage vom Patient | Keine Dringlichkeitswörter | 🟡 Wichtig |
| "Starke Schmerzen" | Keyword erkannt | 🔴 DRINGEND |

---

## 8. Technische Architektur

### 8.1 Systemübersicht

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CAREPILOT ARCHITEKTUR                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Staff Web    │  │ Staff Mobile │  │ Patient App  │               │
│  │ Dashboard    │  │ PWA          │  │ PWA          │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│         └─────────────────┼─────────────────┘                        │
│                           │                                          │
│                           ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                      API GATEWAY                                 ││
│  │                   (Authentication, Rate Limiting)                ││
│  └─────────────────────────────────────────────────────────────────┘│
│                           │                                          │
│         ┌─────────────────┼─────────────────┐                        │
│         ▼                 ▼                 ▼                        │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐                   │
│  │ Core API   │   │ AI Service │   │ Real-time  │                   │
│  │ Service    │   │            │   │ Service    │                   │
│  └────────────┘   └────────────┘   └────────────┘                   │
│         │                │                 │                         │
│         └────────────────┼─────────────────┘                         │
│                          ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                       DATABASE LAYER                             ││
│  │              (Multi-tenant, Encrypted at rest)                   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                      EXTERNAL INTEGRATIONS                       ││
│  │  Maps API │ Lab Systems │ EHR │ Video (Teams) │ Devices        ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Multi-Tenant Architektur

| Aspekt | Lösung |
|--------|--------|
| **Daten-Isolation** | Schema-per-Tenant (jedes Spital eigenes DB-Schema) |
| **Tenant-Identifikation** | Subdomain (ksbl.carepilot.ch) oder Custom Domain |
| **Konfiguration** | Tenant-spezifische Settings (Branding, Features, Rollen) |
| **Skalierung** | Horizontal skalierbar pro Tenant |

### 8.3 Frontend-Technologie

| Aspekt | Technologie | Begründung |
|--------|-------------|------------|
| **Framework** | Next.js / React | PWA-fähig, SSR, moderne DX |
| **Styling** | Tailwind CSS | Rapid Development, Consistency |
| **State** | Zustand / React Query | Einfach, performant |
| **Maps** | Mapbox GL | Custom Styling möglich |
| **Charts** | Recharts / Visx | Medizinische Kurven |
| **PWA** | Workbox | Offline-Fähigkeit |

### 8.4 Backend-Technologie

| Aspekt | Technologie | Begründung |
|--------|-------------|------------|
| **API** | Node.js / Fastify oder Go | Performance, Typsicherheit |
| **Database** | PostgreSQL | ACID, JSON Support, Bewährt |
| **Cache** | Redis | Session, Real-time |
| **Queue** | BullMQ | Background Jobs |
| **Search** | Meilisearch | Patient-Suche |
| **Storage** | S3-kompatibel | Dokumente, Audio |

### 8.5 KI-Services

| Service | Technologie | Funktion |
|---------|-------------|----------|
| **Speech-to-Text** | Whisper / Azure Speech | Audio → Text |
| **NLP/Extraktion** | GPT-4 / Claude | Strukturierte Daten aus Text |
| **Embeddings** | OpenAI / Local | Semantische Suche |
| **Alerting** | Custom ML | Anomalie-Erkennung |

### 8.6 Integrationen

| System | Methode | Zweck |
|--------|---------|-------|
| **Karten** | Mapbox API | Routing, Darstellung |
| **Video** | Microsoft Teams SDK / WebRTC | Telemedizin |
| **Labor** | HL7 FHIR | Resultate empfangen |
| **EHR** | FHIR R4 | Stammdaten-Sync |
| **Devices** | Bluetooth / API | Telemonitoring |
| **SMS/Push** | Twilio / FCM | Benachrichtigungen |

---

## 9. Mock-Daten & Demo-Szenarien

### 9.1 Mock-Patienten

#### Patient 1: Hans Gerber (Herzinsuffizienz)

| Feld | Wert |
|------|------|
| **Alter** | 72 Jahre |
| **Diagnose** | Dekompensierte Herzinsuffizienz NYHA III |
| **Nebendiagnosen** | Diabetes Typ 2, Hypertonie |
| **Adresse** | Bahnhofstrasse 15, 4242 Laufen |
| **Tag im Programm** | Tag 5 von 14 |
| **Szenario** | Aktive Dekompensation - zeigt Alerts |

#### Patient 2: Maria Meier (Pneumonie)

| Feld | Wert |
|------|------|
| **Alter** | 65 Jahre |
| **Diagnose** | Ambulant erworbene Pneumonie |
| **Nebendiagnosen** | COPD Gold II |
| **Adresse** | Hauptstrasse 42, 4247 Grindel |
| **Tag im Programm** | Tag 3 von 10 |
| **Szenario** | IV-Antibiotika, stabile Situation |

#### Patient 3: Peter Schmidt (Post-OP)

| Feld | Wert |
|------|------|
| **Alter** | 58 Jahre |
| **Diagnose** | Z.n. Hüft-TEP rechts |
| **Nebendiagnosen** | Keine relevanten |
| **Adresse** | Dorfstrasse 8, 4245 Kleinlützel |
| **Tag im Programm** | Tag 7 von 10 |
| **Szenario** | Wundheilung, Physio-Koordination |

#### Patient 4: Elisabeth Brunner (Palliativ)

| Feld | Wert |
|------|------|
| **Alter** | 81 Jahre |
| **Diagnose** | Metastasiertes Pankreaskarzinom |
| **Nebendiagnosen** | Diabetes Typ 2, KHK |
| **Adresse** | Wasserturmweg 3, 4242 Laufen |
| **Tag im Programm** | Tag 21 (unbefristet) |
| **Szenario** | Symptomkontrolle, Schmerzmanagement |

#### Patient 5: Franz Huber (Chronisch)

| Feld | Wert |
|------|------|
| **Alter** | 78 Jahre |
| **Diagnose** | Exazerbierte COPD |
| **Nebendiagnosen** | Vorhofflimmern |
| **Adresse** | Amselweg 17, 4244 Röschenz |
| **Tag im Programm** | Tag 4 von 7 |
| **Szenario** | O2-Therapie, Besserungstrend |

### 9.2 Demo-Szenarien (Interaktiv)

#### Szenario A: "Kritischer Alert"
**Trigger**: Button "SpO2-Abfall simulieren"
**Ablauf**:
1. Hans Gerbers SpO2 fällt auf 88%
2. Alert erscheint im Dashboard (🔴 Dringend)
3. KI priorisiert automatisch
4. Optionen: Anrufen, Notfall-Visite, Rettungsdienst

#### Szenario B: "Neue Aufnahme"
**Trigger**: Button "Neuen Patienten aufnehmen"
**Ablauf**:
1. Formular für Schnellaufnahme erscheint
2. KI schlägt Diagnostik-Set vor basierend auf Diagnose
3. Patient erscheint in Liste
4. Route wird automatisch neu berechnet

#### Szenario C: "Routen-Konflikt"
**Trigger**: Button "Dringenden Besuch hinzufügen"
**Ablauf**:
1. Neuer dringender Termin wird eingefügt
2. System zeigt Konflikt mit geplanter Route
3. Optimierungsvorschläge werden angezeigt
4. User wählt neue Route

#### Szenario D: "Patienten-Feedback"
**Trigger**: In Patienten-App "Fragebogen ausfüllen"
**Ablauf**:
1. Patient füllt aus: "Atemnot verschlechtert"
2. Antwort erscheint im Staff-Dashboard
3. KI priorisiert als "Wichtig"
4. Visite-Planung wird angepasst

### 9.3 Mock-Daten Zeitraum

Die Demo zeigt Daten für eine **typische Woche** im Januar 2026:
- Historische Daten: 7 Tage zurück
- Aktuelle Daten: "Heute"
- Geplante Daten: 3 Tage voraus

---

## 10. Compliance & Sicherheit

### 10.1 Rechtliche Grundlagen (Schweiz)

| Gesetz | Relevanz für CarePilot |
|--------|----------------------|
| **DSG (Datenschutzgesetz)** | Verarbeitung besonders schützenswerter Personendaten |
| **VDSG** | Technische und organisatorische Massnahmen |
| **HMG (Heilmittelgesetz)** | Dokumentationspflichten |
| **EPDG** | Interoperabilität mit ePatientendossier |

### 10.2 Sicherheitsmassnahmen

| Massnahme | Umsetzung |
|-----------|-----------|
| **Verschlüsselung Transit** | TLS 1.3 für alle Verbindungen |
| **Verschlüsselung Ruhe** | AES-256 für Datenbank und Storage |
| **Authentifizierung** | MFA obligatorisch für Staff |
| **Autorisierung** | RBAC (Role-Based Access Control) |
| **Audit Trail** | Lückenlose Protokollierung aller Zugriffe |
| **Session Management** | Automatische Timeout, sichere Tokens |

### 10.3 UI-Elemente für Compliance

#### Einwilligungs-Flow (Patient)

```
┌─────────────────────────────────────────────────────────────────┐
│ EINWILLIGUNG                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Um CarePilot nutzen zu können, benötigen wir Ihre              │
│ Einwilligung für folgende Datenverarbeitungen:                 │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ☑️ Speicherung meiner Gesundheitsdaten                      │ │
│ │    (Vitalwerte, Diagnosen, Medikamente)                     │ │
│ │    [Pflicht für Nutzung]                                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ☑️ GPS-Standort für Ankunftszeit                            │ │
│ │    [Optional - kann jederzeit deaktiviert werden]           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ☐ Teilen mit Angehörigen                                    │ │
│ │    Monika Gerber darf meinen Status sehen                   │ │
│ │    [Optional]                                                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Datenschutzerklärung lesen]                                   │
│                                                                 │
│              [Ablehnen]  [Einwilligen]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Audit-Trail Ansicht (Admin)

```
┌─────────────────────────────────────────────────────────────────┐
│ AUDIT LOG - Hans Gerber                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 18.01.2026 09:47:23  Dr. S. Müller                             │
│ → Verlaufseintrag erstellt                                      │
│                                                                 │
│ 18.01.2026 09:45:12  Dr. S. Müller                             │
│ → Patientenakte geöffnet                                        │
│                                                                 │
│ 18.01.2026 09:30:01  System                                     │
│ → Vitalwerte automatisch importiert (SpO2, Puls)               │
│                                                                 │
│ 17.01.2026 20:15:44  Patient (App)                             │
│ → Fragebogen ausgefüllt                                         │
│                                                                 │
│ ...                                                             │
│                                                                 │
│ [Export als PDF]  [Zeitraum filtern]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Datenexport (Patient-Recht)

```
┌─────────────────────────────────────────────────────────────────┐
│ MEINE DATEN EXPORTIEREN                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Sie haben das Recht, eine Kopie Ihrer Daten zu erhalten.       │
│                                                                 │
│ Was möchten Sie exportieren?                                    │
│                                                                 │
│ ☑️ Stammdaten (Name, Adresse, etc.)                            │
│ ☑️ Diagnosen und Medikamente                                   │
│ ☑️ Verlaufseinträge                                            │
│ ☑️ Vitalwerte-Historie                                         │
│ ☐ Kommunikationsverlauf                                        │
│                                                                 │
│ Format: [PDF ▼]                                                 │
│                                                                 │
│ Der Export wird verschlüsselt per E-Mail zugestellt.           │
│                                                                 │
│                        [Export anfordern]                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. UI/UX Design-Richtlinien

### 11.1 Design-Philosophie

> **"Consumer Tech für Healthcare"** - So modern und ansprechend wie Notion oder Linear, aber für medizinische Workflows optimiert.

### 11.2 Visuelle Identität

#### Farbpalette

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| **Primary** | `#2563EB` | Hauptaktionen, Links, Fokus |
| **Primary Dark** | `#1D4ED8` | Hover-States |
| **Success** | `#10B981` | Positive Zustände, Bestätigungen |
| **Warning** | `#F59E0B` | Warnungen, wichtige Hinweise |
| **Danger** | `#EF4444` | Fehler, dringende Alerts |
| **Neutral 50** | `#F9FAFB` | Hintergründe |
| **Neutral 900** | `#111827` | Text |

#### Typografie

| Element | Font | Grösse | Gewicht |
|---------|------|--------|---------|
| **H1** | Inter | 32px | Bold |
| **H2** | Inter | 24px | Semibold |
| **H3** | Inter | 18px | Semibold |
| **Body** | Inter | 16px | Regular |
| **Small** | Inter | 14px | Regular |
| **Caption** | Inter | 12px | Regular |

#### Abstände

8px Grid-System:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

### 11.3 Komponenten-Beispiele

#### Buttons

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Primary       │  │   Secondary     │  │   Danger        │
│   [████████]    │  │   [────────]    │  │   [████████]    │
│   Filled Blue   │  │   Outlined      │  │   Filled Red    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

#### Cards

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Subtle shadow, rounded corners (12px)                      │
│  Padding: 24px                                              │
│  Hover: Slight lift effect                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Status Badges

```
🟢 Stabil        🟡 Beobachten       🔴 Kritisch
[─────────]      [─────────]         [─────────]
Green bg/text    Yellow bg/text      Red bg/text
```

### 11.4 Karten-Design (Maps)

Custom Mapbox Style mit CarePilot-Branding:
- Dezente Farben (nicht das Standard-Google-Bunt)
- Wichtige Strassen hervorgehoben
- Patienten-Marker in Brand-Farben
- Route als animierte Linie

### 11.5 Dark Mode

Das Design unterstützt Dark Mode:
- Automatisch basierend auf System-Präferenz
- Manuell umschaltbar
- Alle Farben haben Dark-Mode-Varianten

### 11.6 Accessibility

| Anforderung | Umsetzung |
|-------------|-----------|
| **Kontrast** | WCAG AA minimum, AAA für kritische Elemente |
| **Schriftgrösse** | Minimum 16px, skalierbar |
| **Tastatur** | Vollständige Keyboard-Navigation |
| **Screen Reader** | ARIA-Labels, semantisches HTML |
| **Farbenblindheit** | Nicht nur Farbe für Status (+ Icons) |

### 11.7 Responsive Design

| Breakpoint | Gerät | Layout |
|------------|-------|--------|
| < 640px | Mobile | Single Column, Bottom Nav |
| 640-1024px | Tablet | Two Column, Side Nav collapsed |
| > 1024px | Desktop | Full Layout, Side Nav expanded |

---

## 12. Abrechnungsintegration

### 12.1 Schweizer Gesundheitswesen-Kontext

CarePilot integriert sich in das Schweizer Abrechnungssystem:

| System | Beschreibung |
|--------|--------------|
| **TARMED** | Ärztliche Leistungen (ambulant) |
| **SwissDRG** | Stationäre Pauschalen (für H@H adaptiert) |
| **MiGeL** | Mittel- und Gegenständeliste |
| **ALT** | Analysenliste (Labor) |

### 12.2 Abrechnungs-Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ABRECHNUNGS-WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. LEISTUNGSERFASSUNG (automatisch)                                │
│     ┌─────────────────────────────────────────────────────────────┐ │
│     │ Visite durchgeführt → System erkennt:                       │ │
│     │ • Hausbesuch Arzt (TARMED 00.0060)                          │ │
│     │ • Wegentschädigung (TARMED 00.0095)                         │ │
│     │ • + spezifische Leistungen aus Dokumentation                │ │
│     └─────────────────────────────────────────────────────────────┘ │
│                           ▼                                          │
│  2. VALIDIERUNG (manuell prüfen)                                    │
│     ┌─────────────────────────────────────────────────────────────┐ │
│     │ MPA/Admin prüft vorgeschlagene Positionen                   │ │
│     │ Ergänzt fehlende, korrigiert Fehler                         │ │
│     └─────────────────────────────────────────────────────────────┘ │
│                           ▼                                          │
│  3. RECHNUNG GENERIEREN                                             │
│     ┌─────────────────────────────────────────────────────────────┐ │
│     │ Export für Abrechnungssoftware oder                         │ │
│     │ Direkte Übermittlung an Krankenkasse                        │ │
│     └─────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 12.3 Abrechnungs-UI

```
┌─────────────────────────────────────────────────────────────────┐
│ 💰 ABRECHNUNG - Hans Gerber                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ OFFENE LEISTUNGEN (noch nicht abgerechnet)                      │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 18.01.2026 - Arzt-Visite                                    │ │
│ │                                                             │ │
│ │ ☑️ 00.0060 Hausbesuch Arzt, erste 5 Min.        48.00 CHF  │ │
│ │ ☑️ 00.0062 + jede weitere 5 Min. (x3)           57.60 CHF  │ │
│ │ ☑️ 00.0095 Wegentschädigung (12km)              14.40 CHF  │ │
│ │ ☑️ 00.0030 Konsultation bei Herzinsuffizienz    32.00 CHF  │ │
│ │                                                             │ │
│ │ 💡 KI-Vorschlag: 00.0450 EKG hinzufügen?       [+ Hinzu]   │ │
│ │                                                             │ │
│ │ Subtotal:                                      152.00 CHF  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ KRANKENKASSE: Helsana                                           │
│ VERSICHERTENNR: 123.456.789                                     │
│                                                                 │
│ [Rechnung erstellen]  [Zur Prüfung markieren]  [Exportieren]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 12.4 Reporting

```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 ABRECHNUNGS-ÜBERSICHT - Januar 2026                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Abgerechnete Leistungen:           CHF 45'230.00              │
│  Offene Leistungen:                 CHF  3'450.00              │
│  Ausstehende Zahlungen:             CHF  8'920.00              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [GRAFIK: Umsatz pro Woche]                                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  TOP LEISTUNGEN                                                 │
│  1. Hausbesuche Arzt            CHF 12'400.00                  │
│  2. Hausbesuche Pflege          CHF 18'200.00                  │
│  3. IV-Therapien                CHF  8'100.00                  │
│  4. Laboranalysen               CHF  3'200.00                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 13. Erfolgsmetriken

### 13.1 Klinische Metriken

| Metrik | Ziel | Messung |
|--------|------|---------|
| **Unerwartete Hospitalisierungen** | < 5% | Anteil Patienten mit Notfall-Einweisung |
| **Patientenzufriedenheit** | > 90% | Post-Programm Umfrage |
| **Komplikationsrate** | < Benchmark | Infektionen, Stürze, etc. |
| **Behandlungsdauer** | ≤ Vergleich | Tage im Programm vs. stationär |

### 13.2 Effizienz-Metriken

| Metrik | Ziel | Messung |
|--------|------|---------|
| **Dokumentationszeit** | -40% | Zeit pro Patient für Doku |
| **Fahrkilometer** | -25% | Durch Routenoptimierung |
| **Patienten pro Team** | +30% | Kapazitätssteigerung |
| **Admin-Aufwand** | -50% | Telefonate, manuelle Planung |

### 13.3 Nutzungs-Metriken

| Metrik | Ziel | Messung |
|--------|------|---------|
| **Daily Active Users (Staff)** | > 90% | Anmeldungen pro Tag |
| **App-Nutzung (Patienten)** | > 70% | Fragebogen-Completion-Rate |
| **Ambient Scribe Nutzung** | > 80% | Visiten mit Voice-Doku |
| **Alert Response Time** | < 15 min | Zeit bis Reaktion auf kritische Alerts |

### 13.4 Dashboard für Metriken

```
┌─────────────────────────────────────────────────────────────────┐
│ 📈 CAREPILOT ANALYTICS                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DIESEN MONAT                                                   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 47           │  │ 2.3%         │  │ 156 km       │          │
│  │ Patienten    │  │ Re-Hosp.Rate │  │ gespart      │          │
│  │ behandelt    │  │ (Ziel: <5%)  │  │ (vs. manuell)│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [GRAFIK: Patienten-Entwicklung über Zeit]                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [GRAFIK: Zufriedenheits-Score Trend]                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Anhang A: Glossar

| Begriff | Erklärung |
|---------|-----------|
| **Hospital at Home (H@H)** | Versorgungsmodell, bei dem spitalreife Patienten zu Hause behandelt werden |
| **Ambient Scribe** | KI-gestützte Dokumentation durch Aufnahme von Gesprächen |
| **TARMED** | Schweizer Tarifsystem für ambulante ärztliche Leistungen |
| **PWA** | Progressive Web App - Webseite, die sich wie native App verhält |
| **Multi-Tenant** | Eine Software-Installation bedient mehrere unabhängige Kunden |
| **FHIR** | Fast Healthcare Interoperability Resources - Standard für Gesundheitsdaten |

---

## Anhang B: Entschiedene Fragen

| Frage | Entscheidung | Begründung |
|-------|--------------|------------|
| **EHR-Integration** | Standalone Demo | Keine echten Integrationen für Demo, nur Mock-Daten - schneller zu bauen |
| **Sprach-KI** | Nur Hochdeutsch | Genauer und einfacher zu implementieren, Schweizerdeutsch später |
| **Video-Plattform** | Microsoft Teams | KSBL nutzt bereits Teams intern - Integration priorisieren |
| **Geräte** | Generisch | Keine spezifischen Marken im Mockup, später spezifizieren |

---

## Anhang C: Versionshistorie

| Version | Datum | Änderungen |
|---------|-------|------------|
| 1.0 | 18.01.2026 | Initiale PRD basierend auf Interview |

---

*Dieses Dokument ist ein lebendiges Dokument und wird während der Entwicklung aktualisiert.*
