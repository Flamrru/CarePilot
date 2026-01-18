# Tasks: CarePilot Interactive Mockup

> Generated from: /Users/flamurrrustemi/Desktop/Apps Coding/CarePilot/PRD.md
> Created: 2026-01-18
> Total Phases: 7 | Total Tasks: 42

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Type** | Interactive Mockup | No real backend/AI - demo with mock data |
| **Framework** | Next.js 14+ (App Router) | PWA-ready, excellent DX, Vercel-optimized |
| **Styling** | Tailwind CSS | Rapid development, consistent design |
| **State** | Zustand | Lightweight, perfect for interactive mockup state |
| **App Structure** | Single app | /staff, /patient, /family routes sharing components |
| **Hosting** | Vercel | Best Next.js support, easy deployment |
| **Data** | Mock JSON/TypeScript | 5 patients, realistic Swiss medical data |
| **AI Features** | Simulated | Pre-written responses, no real AI calls |

---

## Phase 1: Project Foundation

**Goal:** Set up the Next.js project with proper structure, dependencies, and mock data foundation. Everything else builds on this.

**Key Outcomes:**
- Next.js project initialized with TypeScript, Tailwind, and PWA support
- Folder structure organized for Staff/Patient/Family interfaces
- Mock data types defined and sample patients created
- Basic routing working for all three interfaces

**Dependencies:** None - can start immediately

---

### Task 1.1: Initialize Next.js Project with Core Dependencies

**Purpose:** Create the project foundation with all necessary tooling configured correctly from the start.

**What to Do:**
Initialize a new Next.js 14+ project with TypeScript and Tailwind CSS. Configure PWA support using next-pwa. Set up the folder structure following Next.js App Router conventions with route groups for (staff), (patient), and (family).

**Files to Create/Modify:**
- `package.json` — Project dependencies
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind with custom CarePilot theme colors
- `next.config.js` — PWA and i18n configuration
- `src/app/layout.tsx` — Root layout with Inter font

**Acceptance Criteria:**
- [ ] `npm run dev` starts without errors
- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS working with custom colors from PRD
- [ ] PWA manifest configured for "CarePilot" app name
- [ ] German (CH) set as default locale

---

### Task 1.2: Define TypeScript Types for Domain Models

**Purpose:** Create strongly-typed interfaces for all data structures to ensure consistency across the mockup.

**What to Do:**
Define TypeScript interfaces for Patient, StaffMember, Visit, VitalSigns, Medication, Alert, Message, and other domain objects. Include all fields needed for the mockup scenarios (5 patients with different diagnoses).

**Files to Create/Modify:**
- `src/types/patient.ts` — Patient, Diagnosis, Medication types
- `src/types/staff.ts` — Doctor, Nurse, Coordinator types
- `src/types/visit.ts` — Visit, Task, Route types
- `src/types/vitals.ts` — VitalSigns, LabResult types
- `src/types/communication.ts` — Message, Alert, Notification types
- `src/types/index.ts` — Re-export all types

**Acceptance Criteria:**
- [ ] All types match PRD data structures
- [ ] Types include German field names where user-facing
- [ ] Enums defined for status values (urgent/normal/info, etc.)
- [ ] Types support the 5 mock patient scenarios

---

### Task 1.3: Create Mock Data for 5 Patients

**Purpose:** Generate realistic Swiss German mock data for the demo patients defined in the PRD.

**What to Do:**
Create mock data files with the 5 patients (Hans Gerber - Herzinsuffizienz, Maria Meier - Pneumonie, Peter Schmidt - Post-OP, Elisabeth Brunner - Palliativ, Franz Huber - COPD). Include 7 days of historical vitals, visit logs, medications, and alerts. All addresses should be real streets in Laufen/Laufental region.

**Files to Create/Modify:**
- `src/data/patients.ts` — 5 patient records with full details
- `src/data/vitals.ts` — 7 days of vital sign history per patient
- `src/data/visits.ts` — Past and scheduled visits
- `src/data/medications.ts` — Current medications per patient
- `src/data/staff.ts` — Dr. Sarah Müller, Marco Bianchi, Anna Weber
- `src/data/alerts.ts` — Sample alerts matching PRD scenarios

**Acceptance Criteria:**
- [ ] All 5 patients from PRD section 9.1 implemented
- [ ] Addresses are real Laufental locations (Bahnhofstr., etc.)
- [ ] Vital signs show realistic trends (Hans Gerber: declining SpO2)
- [ ] Data supports all 4 demo scenarios from PRD
- [ ] Timestamps are relative to "today" for demo freshness

---

### Task 1.4: Set Up Zustand Store for Interactive State

**Purpose:** Create the state management layer that makes the mockup feel like a real interactive application.

**What to Do:**
Set up Zustand stores for patient data, alerts, route planning, and UI state. Include actions for demo scenarios (trigger alert, add patient, update vitals). Persist some state to localStorage for demo continuity.

**Files to Create/Modify:**
- `src/stores/patient-store.ts` — Patients, selected patient, filters
- `src/stores/alert-store.ts` — Alerts, mark as read, dismiss
- `src/stores/route-store.ts` — Today's route, optimization state
- `src/stores/ui-store.ts` — Sidebar state, current view, demo mode
- `src/stores/index.ts` — Combined store exports

**Acceptance Criteria:**
- [ ] Stores hydrate from mock data on app load
- [ ] Actions work for all interactive demo scenarios
- [ ] State changes trigger UI updates immediately
- [ ] Demo reset function clears all changes back to initial state

---

### Task 1.5: Create Basic Routing Structure

**Purpose:** Set up the route structure for all three interfaces with placeholder pages.

**What to Do:**
Create the App Router structure with route groups for staff, patient, and family. Add placeholder pages for each main section. Set up middleware for basic route protection simulation (staff routes vs patient routes).

**Files to Create/Modify:**
- `src/app/(staff)/layout.tsx` — Staff interface layout
- `src/app/(staff)/page.tsx` — Staff dashboard home
- `src/app/(staff)/patients/page.tsx` — Patient list
- `src/app/(staff)/patients/[id]/page.tsx` — Patient detail
- `src/app/(staff)/route/page.tsx` — Route planning
- `src/app/(patient)/layout.tsx` — Patient interface layout
- `src/app/(patient)/page.tsx` — Patient home
- `src/app/(family)/layout.tsx` — Family interface layout
- `src/app/(family)/page.tsx` — Family dashboard
- `src/middleware.ts` — Basic route handling

**Acceptance Criteria:**
- [ ] /staff routes render staff layout
- [ ] /patient routes render patient layout (mobile-optimized)
- [ ] /family routes render family layout
- [ ] Navigation between routes works
- [ ] 404 page styled for CarePilot

---

## Phase 2: Design System & Shared Components

**Goal:** Build the reusable component library following the PRD design guidelines - "Consumer Tech for Healthcare" aesthetic like Notion/Linear.

**Key Outcomes:**
- Complete design system with CarePilot colors, typography, spacing
- Reusable UI components (buttons, cards, badges, forms)
- Map component with custom CarePilot styling
- Chart components for vital signs visualization

**Dependencies:** Phase 1 complete (project setup, types, Tailwind config)

---

### Task 2.1: Create Design Tokens and Theme Configuration

**Purpose:** Establish the visual foundation matching the PRD's "Consumer Tech" aesthetic with proper color palette and typography.

**What to Do:**
Extend Tailwind config with CarePilot design tokens from PRD section 11.2. Create CSS variables for colors supporting dark mode. Set up Inter font with all weights. Define spacing scale, border radius, and shadow utilities.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `tailwind.config.ts` — Extended with full CarePilot theme
- `src/app/globals.css` — CSS variables, base styles, dark mode
- `src/styles/tokens.ts` — Exported design tokens for JS usage

**Acceptance Criteria:**
- [ ] All colors from PRD 11.2 available (primary #2563EB, etc.)
- [ ] Inter font loaded with correct weights
- [ ] Dark mode toggle works system-wide
- [ ] 8px grid spacing system implemented
- [ ] Shadows and border-radius match PRD specs

---

### Task 2.2: Build Core UI Components

**Purpose:** Create the foundational UI building blocks used throughout all three interfaces.

**What to Do:**
Build reusable components following the PRD design specs: Button (primary/secondary/danger), Card (with subtle shadow and hover), Badge (status colors), Input/Select form fields, and Avatar. All components should support dark mode.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/ui/button.tsx` — Primary, secondary, danger, ghost variants
- `src/components/ui/card.tsx` — Clickable and static variants with hover
- `src/components/ui/badge.tsx` — Status badges (stabil/beobachten/kritisch)
- `src/components/ui/input.tsx` — Text input with label and error state
- `src/components/ui/select.tsx` — Dropdown select component
- `src/components/ui/avatar.tsx` — User/patient avatar with fallback

**Acceptance Criteria:**
- [ ] Button has all variants with proper hover/active states
- [ ] Card has 12px border-radius and lift effect on hover
- [ ] Badge colors match PRD (green/yellow/red for status)
- [ ] Form components have proper focus rings
- [ ] All components work in dark mode

---

### Task 2.3: Build Medical-Specific Components

**Purpose:** Create specialized components for displaying medical data - vital signs, medications, alerts.

**What to Do:**
Build components specific to the healthcare context: VitalSignsCard (SpO2, BP, HR, Weight), MedicationList, AlertItem (with priority coloring), TimelineEntry (for Verlauf), and TaskCheckbox (for visit tasks).

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/medical/vital-signs-card.tsx` — Display current vitals with trend indicators
- `src/components/medical/vital-chart.tsx` — Line chart for vital sign history
- `src/components/medical/medication-item.tsx` — Single medication with dosage
- `src/components/medical/alert-item.tsx` — Alert with priority color and actions
- `src/components/medical/timeline-entry.tsx` — Visit/event in timeline format
- `src/components/medical/task-checkbox.tsx` — Checkable task item

**Acceptance Criteria:**
- [ ] VitalSignsCard shows icons and values matching PRD mockup
- [ ] Charts render 7-day trends with proper axis labels
- [ ] Alert colors match priority (🔴🟡🟢)
- [ ] Timeline entries show date, type, author, and content
- [ ] Components use German labels (Blutdruck, Puls, etc.)

---

### Task 2.4: Build Map Component with Custom Styling

**Purpose:** Create the interactive map component for displaying patient locations and routes with CarePilot branding.

**What to Do:**
Integrate Mapbox GL JS with custom map style matching CarePilot brand colors. Create PatientMarker component with urgency coloring. Build RouteDisplay for showing optimized routes between patients. Center default view on Laufen, Switzerland.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/map/map-container.tsx` — Mapbox GL wrapper with custom style
- `src/components/map/patient-marker.tsx` — Custom marker with patient info popup
- `src/components/map/route-display.tsx` — Animated route line between points
- `src/components/map/map-controls.tsx` — Zoom, fullscreen, recenter buttons
- `src/lib/mapbox-style.json` — Custom Mapbox style configuration

**Acceptance Criteria:**
- [ ] Map centered on Laufen (47.4225° N, 7.5019° E)
- [ ] Patient markers show urgency color (red/yellow/green)
- [ ] Route line shows optimized path
- [ ] Map style uses muted, professional colors (not Google-bright)
- [ ] Markers are clickable and show patient preview

---

### Task 2.5: Build Navigation Components

**Purpose:** Create the navigation shells for all three interfaces - sidebar for staff, bottom nav for patient/family.

**What to Do:**
Build StaffSidebar with collapsible navigation matching PRD layout. Create PatientBottomNav for the elderly-friendly patient interface. Build FamilyNav for limited-access family view. Include CarePilot + KSBL co-branding header.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/navigation/staff-sidebar.tsx` — Collapsible sidebar with icons
- `src/components/navigation/staff-header.tsx` — Top bar with notifications, profile
- `src/components/navigation/patient-bottom-nav.tsx` — Large touch-friendly tabs
- `src/components/navigation/patient-header.tsx` — Simple header with back button
- `src/components/navigation/family-nav.tsx` — Simple navigation for family
- `src/components/navigation/brand-header.tsx` — CarePilot × KSBL co-branding

**Acceptance Criteria:**
- [ ] Staff sidebar collapses to icons on smaller screens
- [ ] Patient nav has large touch targets (min 48px)
- [ ] Co-branding shows both logos as specified in PRD
- [ ] Active route is highlighted in navigation
- [ ] Notification badge shows unread count

---

## Phase 3: Staff Dashboard

**Goal:** Build the complete staff interface - the main clinical command center for doctors, nurses, and coordinators.

**Key Outcomes:**
- Home dashboard with daily overview, alerts, and route widget
- Patient list with filtering and map/list views
- Patient detail page with all tabs (Verlauf, Kurve, etc.)
- Route planning interface with optimization display
- Team and notification management

**Dependencies:** Phase 2 complete (design system and components)

---

### Task 3.1: Build Staff Home Dashboard

**Purpose:** Create the command center homepage showing today's overview, alerts, route summary, and next visit.

**What to Do:**
Implement the home dashboard exactly matching PRD section 4.1. Include stat cards (patients, alerts, route km), map widget with route preview, notification list with priority, and "next visit" card. All data should come from Zustand stores.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/page.tsx` — Dashboard page component
- `src/components/staff/dashboard/stat-cards.tsx` — Today/Alerts/Route summary cards
- `src/components/staff/dashboard/route-preview.tsx` — Small map with route
- `src/components/staff/dashboard/notification-feed.tsx` — Priority-sorted alerts
- `src/components/staff/dashboard/next-visit-card.tsx` — Upcoming visit with CTA

**Acceptance Criteria:**
- [ ] Layout matches PRD ASCII mockup in section 4.1
- [ ] Stat cards show real-time data from store
- [ ] Clicking alert navigates to patient
- [ ] "Route starten" button works
- [ ] Responsive: stacks on tablet/mobile

---

### Task 3.2: Build Patient List with Map/List Views

**Purpose:** Create the patient list page with toggle between map view and list view, plus filtering capabilities.

**What to Do:**
Build the patient list matching PRD section 4.2. Include toggle between Kartenansicht (map) and Listenansicht (list). Add filters for team assignment, urgency, and search. Patient cards should show key info from PRD mockup.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/patients/page.tsx` — Patient list page
- `src/components/staff/patients/patient-list-card.tsx` — List item card
- `src/components/staff/patients/patient-map-view.tsx` — Map with all patients
- `src/components/staff/patients/patient-filters.tsx` — Search and filter controls
- `src/components/staff/patients/view-toggle.tsx` — Map/List toggle

**Acceptance Criteria:**
- [ ] Toggle switches between map and list views
- [ ] Search filters patients by name
- [ ] Urgency filter works (Dringend/Normal/Flexibel)
- [ ] Patient card matches PRD section 4.2 mockup
- [ ] Clicking patient navigates to detail page

---

### Task 3.3: Build Patient Detail Page - Header and Overview

**Purpose:** Create the patient detail page header and clinical overview section with key information at a glance.

**What to Do:**
Build the patient detail page matching PRD section 4.3. Include header with photo, name, diagnosis, day counter. Left column: clinical overview (diagnoses, allergies, meds, vitals). Right column: map with location, contact info, preferences.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/patients/[id]/page.tsx` — Patient detail page
- `src/app/(staff)/patients/[id]/layout.tsx` — Shared layout with header
- `src/components/staff/patient-detail/patient-header.tsx` — Name, photo, diagnosis, day X/Y
- `src/components/staff/patient-detail/clinical-overview.tsx` — Left column content
- `src/components/staff/patient-detail/location-card.tsx` — Map, address, preferences
- `src/components/staff/patient-detail/todays-tasks.tsx` — Checkbox task list

**Acceptance Criteria:**
- [ ] Header shows patient photo (or avatar fallback)
- [ ] "Tag X von Y" counter displays correctly
- [ ] Clinical overview shows structured data
- [ ] Map shows patient location with drive time
- [ ] Tasks can be checked off (updates store)

---

### Task 3.4: Build Patient Detail Page - Tabs (Verlauf, Kurve, etc.)

**Purpose:** Create the tabbed interface for patient history, medical curves, reports, documents, and communication.

**What to Do:**
Implement the 5 tabs from PRD section 4.3: Verlauf (timeline), Kurve (charts), Berichte (reports), Dokumente (files), Kommunikation (messages). Each tab should display appropriate mock data. Include the AI assistant hint at the bottom.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/staff/patient-detail/tabs/tab-navigation.tsx` — Tab switcher
- `src/components/staff/patient-detail/tabs/verlauf-tab.tsx` — Timeline of visits/events
- `src/components/staff/patient-detail/tabs/kurve-tab.tsx` — Vital charts over time
- `src/components/staff/patient-detail/tabs/berichte-tab.tsx` — Generated reports list
- `src/components/staff/patient-detail/tabs/dokumente-tab.tsx` — Documents/files
- `src/components/staff/patient-detail/tabs/kommunikation-tab.tsx` — Messages
- `src/components/staff/patient-detail/ai-hint.tsx` — AI assistant suggestion

**Acceptance Criteria:**
- [ ] Tab switching works without page reload
- [ ] Verlauf shows chronological entries with filters
- [ ] Kurve displays vital sign charts with date range
- [ ] AI hint shows context-aware suggestion (mock)
- [ ] Audio icon on entries links to "recording" (simulated)

---

### Task 3.5: Build Inventory/Preparation View

**Purpose:** Create the "what to bring" preparation checklist for visits as shown in PRD section 4.4.

**What to Do:**
Build the preparation view that shows what materials, medications, and documents to bring for a specific patient visit. Include auto-generated checklist based on scheduled tasks and patient-specific hints.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/patients/[id]/vorbereitung/page.tsx` — Preparation page
- `src/components/staff/preparation/inventory-checklist.tsx` — Categorized checklist
- `src/components/staff/preparation/patient-hints.tsx` — Special notes
- `src/components/staff/preparation/checklist-item.tsx` — Single checkable item

**Acceptance Criteria:**
- [ ] Checklist categorized by type (Medikamente, Labor, Dokumente)
- [ ] Items based on patient's scheduled tasks
- [ ] Patient hints show relevant notes (e.g., difficult veins)
- [ ] "Alles eingepackt" button marks complete
- [ ] Layout matches PRD section 4.4 mockup

---

### Task 3.6: Build Route Planning Page

**Purpose:** Create the route planning and optimization interface showing optimized visit sequence for the day.

**What to Do:**
Build the route planning page matching PRD section 4.5. Include interactive map with routes, visit sequence list, optimization stats (km saved, time), and conflict warnings. Support multi-vehicle view if applicable.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/route/page.tsx` — Route planning page
- `src/components/staff/route/route-map.tsx` — Full map with route lines
- `src/components/staff/route/visit-sequence.tsx` — Ordered list of visits
- `src/components/staff/route/optimization-stats.tsx` — Km saved, time estimate
- `src/components/staff/route/conflict-warning.tsx` — Time preference conflicts
- `src/components/staff/route/route-actions.tsx` — Accept/Adjust/Recalculate buttons

**Acceptance Criteria:**
- [ ] Map shows optimized route between patients
- [ ] Visit sequence is draggable to reorder (simulated)
- [ ] Stats show "67 km (optimiert von 94 km)" style comparison
- [ ] Conflicts highlighted with resolution options
- [ ] "Route übernehmen" activates navigation mode

---

### Task 3.7: Build Notification Center

**Purpose:** Create the full notification/alert management page with AI-prioritized categories.

**What to Do:**
Build the notification center matching PRD section 4.7. Show alerts grouped by priority (Dringend/Wichtig/Information). Include action buttons per alert (Anrufen, Visite planen, etc.). Allow marking as read and dismissing.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(staff)/benachrichtigungen/page.tsx` — Notifications page
- `src/components/staff/notifications/notification-list.tsx` — Grouped by priority
- `src/components/staff/notifications/notification-item.tsx` — Single notification
- `src/components/staff/notifications/notification-actions.tsx` — Action buttons
- `src/components/staff/notifications/mark-all-read.tsx` — Bulk action

**Acceptance Criteria:**
- [ ] Alerts grouped by priority with correct colors
- [ ] Actions trigger appropriate navigation/modals
- [ ] Mark as read updates badge count
- [ ] "Ignorieren + Begründung" shows modal
- [ ] Empty state shows "Keine Benachrichtigungen"

---

## Phase 4: Patient App

**Goal:** Build the patient-facing mobile interface - designed for elderly users with large text, simple navigation, and clear CTAs.

**Key Outcomes:**
- Home screen with arrival tracking, daily check-in, medications
- Uber-style live tracking view
- Diagnosis-specific questionnaire flow
- Medication tracking with confirmation
- Simple messaging and video call interface

**Dependencies:** Phase 2 complete (design system), Phase 3 partially complete (shared patient data)

---

### Task 4.1: Build Patient Home Screen

**Purpose:** Create the main patient home screen with arrival time, daily check-in prompt, and medication summary.

**What to Do:**
Build the patient home matching PRD section 5.2. Large greeting with patient name, arrival card with ETA, check-in prompt with progress, medication summary, and quick action buttons (call, message). Design for elderly users with 18pt+ text.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/page.tsx` — Patient home page
- `src/components/patient/home/arrival-card.tsx` — ETA and "show map" button
- `src/components/patient/home/checkin-prompt.tsx` — Daily questionnaire CTA
- `src/components/patient/home/medication-summary.tsx` — X of Y confirmed
- `src/components/patient/home/quick-actions.tsx` — Call and message buttons

**Acceptance Criteria:**
- [ ] Greeting shows time of day + patient name
- [ ] All text minimum 18pt, important items 24pt+
- [ ] Touch targets minimum 48px
- [ ] Colors have WCAG AAA contrast
- [ ] Layout matches PRD section 5.2 mockup

---

### Task 4.2: Build Uber-Style Arrival Tracking

**Purpose:** Create the live map view showing care team location and estimated arrival time.

**What to Do:**
Build the arrival tracking view matching PRD section 5.3. Show map with car icon moving toward home, staff member info (name, role, photo), ETA countdown, and today's planned tasks list. Large "Team anrufen" button.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/ankunft/page.tsx` — Arrival tracking page
- `src/components/patient/tracking/live-map.tsx` — Map with animated car
- `src/components/patient/tracking/staff-info.tsx` — Arriving staff member
- `src/components/patient/tracking/eta-display.tsx` — Large countdown timer
- `src/components/patient/tracking/planned-tasks.tsx` — What's happening today

**Acceptance Criteria:**
- [ ] Map shows animated "car" moving (simulated)
- [ ] ETA updates as car "approaches"
- [ ] Staff photo and name displayed
- [ ] Tasks listed clearly
- [ ] Call button prominent and accessible

---

### Task 4.3: Build Daily Questionnaire Flow

**Purpose:** Create the diagnosis-specific daily check-in questionnaire with simple, large response options.

**What to Do:**
Build the questionnaire matching PRD section 5.4. Progress indicator, one question per screen, large emoji-labeled options, back/next navigation. Questions should be tailored to patient's diagnosis (Herzinsuffizienz example in PRD).

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/fragebogen/page.tsx` — Questionnaire flow
- `src/components/patient/questionnaire/progress-bar.tsx` — Question X of Y
- `src/components/patient/questionnaire/question-card.tsx` — Question display
- `src/components/patient/questionnaire/answer-option.tsx` — Large tappable option
- `src/components/patient/questionnaire/questionnaire-complete.tsx` — Thank you screen
- `src/data/questionnaires.ts` — Questions per diagnosis type

**Acceptance Criteria:**
- [ ] Questions tailored to patient's main diagnosis
- [ ] Options use emojis for visual clarity
- [ ] One question per screen (no scrolling)
- [ ] Progress clearly shows current/total
- [ ] Completion saves to store and shows thank you

---

### Task 4.4: Build Medication Tracking Screen

**Purpose:** Create the medication tracking interface where patients confirm taking medications and can report issues.

**What to Do:**
Build the medication view matching PRD section 5.5. Group by time of day (Morgen/Mittag/Abend), show each medication with confirm/skip buttons, allow photo upload and side effect reporting.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/medikamente/page.tsx` — Medications page
- `src/components/patient/medications/time-group.tsx` — Morning/Noon/Evening groups
- `src/components/patient/medications/medication-card.tsx` — Single medication
- `src/components/patient/medications/confirm-buttons.tsx` — Taken/Not taken
- `src/components/patient/medications/report-issue.tsx` — Photo/question modal

**Acceptance Criteria:**
- [ ] Medications grouped by scheduled time
- [ ] Confirmed medications show checkmark and time
- [ ] "Nicht genommen" option available
- [ ] Photo upload for questions works (simulated)
- [ ] Side effect reporting shows simple form

---

### Task 4.5: Build Patient Communication Screen

**Purpose:** Create the simple messaging interface for patients to contact the care team.

**What to Do:**
Build the communication view matching PRD section 5.6. Simple message input, quick-reply buttons for common requests, photo and voice note attachment options. Show chat history with team responses.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/nachricht/page.tsx` — Messaging page
- `src/components/patient/messaging/message-list.tsx` — Chat history
- `src/components/patient/messaging/message-input.tsx` — Text input area
- `src/components/patient/messaging/quick-messages.tsx` — Pre-written options
- `src/components/patient/messaging/attachment-buttons.tsx` — Photo/voice

**Acceptance Criteria:**
- [ ] Quick messages include PRD examples (Mir geht es schlechter, etc.)
- [ ] Chat shows both patient and team messages
- [ ] Photo button opens camera (simulated)
- [ ] Send button clearly visible
- [ ] New messages appear in conversation

---

### Task 4.6: Build Video Call Interface

**Purpose:** Create the telemedicine video call UI for virtual consultations with the care team.

**What to Do:**
Build the video call interface matching PRD section 5.7. Large video area with doctor feed, small self-view, large control buttons (mute, camera, hang up), doctor name and organization displayed.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(patient)/videoanruf/page.tsx` — Video call page
- `src/components/patient/video/video-container.tsx` — Main video area
- `src/components/patient/video/self-view.tsx` — Small self camera view
- `src/components/patient/video/call-controls.tsx` — Large control buttons
- `src/components/patient/video/call-header.tsx` — Doctor info

**Acceptance Criteria:**
- [ ] Video areas show placeholder images (simulated)
- [ ] Controls are large and accessible (min 64px)
- [ ] Mute/camera toggle show state change
- [ ] End call button is red and prominent
- [ ] Doctor name and hospital shown clearly

---

## Phase 5: Family Portal

**Goal:** Build the family caregiver interface with limited access to patient status, updates, and team communication.

**Key Outcomes:**
- Simple dashboard showing patient status overview
- Recent updates feed
- Communication channel to care team
- Consent-based access indicators

**Dependencies:** Phase 2 complete, Phase 4 partially complete (shared patient components)

---

### Task 5.1: Build Family Dashboard

**Purpose:** Create the family caregiver home screen showing patient status, recent updates, and team contact.

**What to Do:**
Build the family dashboard matching PRD section 6.2. Status indicator (stabil/beobachten/kritisch), last and next visit info, recent updates list, and team contact button. Simpler than patient app, focused on status visibility.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(family)/page.tsx` — Family dashboard page
- `src/components/family/status-card.tsx` — Current patient status
- `src/components/family/visit-info.tsx` — Last and next visit
- `src/components/family/updates-feed.tsx` — Recent updates list
- `src/components/family/contact-team.tsx` — Message care team button

**Acceptance Criteria:**
- [ ] Status uses clear color and text (🟢 Stabiler Zustand)
- [ ] Visit times clearly displayed
- [ ] Updates show last 5-7 events
- [ ] Contact button prominent
- [ ] Layout matches PRD section 6.2 mockup

---

### Task 5.2: Build Family Communication View

**Purpose:** Create the messaging interface for family members to contact the care team with questions.

**What to Do:**
Build a simplified version of the patient messaging for family use. Show conversation history with care team, simple text input, and acknowledgment of limited access role.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/app/(family)/nachricht/page.tsx` — Family messaging page
- `src/components/family/message-list.tsx` — Conversation history
- `src/components/family/message-input.tsx` — Simple text input
- `src/components/family/access-notice.tsx` — Limited access reminder

**Acceptance Criteria:**
- [ ] Messages can be sent (simulated)
- [ ] History shows team responses
- [ ] Notice explains family access level
- [ ] Interface simpler than patient app
- [ ] Large, accessible touch targets

---

## Phase 6: AI Features (Simulated)

**Goal:** Add the simulated AI features - chat assistant, smart suggestions, ambient scribe preview - using pre-written responses.

**Key Outcomes:**
- AI sidebar assistant with contextual suggestions
- Simulated ambient scribe interface
- Smart actions with pre-generated recommendations
- Alert prioritization display

**Dependencies:** Phase 3 and 4 complete (staff and patient interfaces)

---

### Task 6.1: Build AI Sidebar Assistant

**Purpose:** Create the AI assistant sidebar that shows context-aware suggestions and allows "chatting" about patients.

**What to Do:**
Build the AI sidebar matching PRD section 7.2. Show current context (selected patient), auto-generated hints based on patient data, chat input for questions, and example prompts. Responses should be pre-written based on patient scenarios.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/staff/ai/ai-sidebar.tsx` — Collapsible sidebar panel
- `src/components/staff/ai/context-hints.tsx` — Auto-generated suggestions
- `src/components/staff/ai/chat-interface.tsx` — Question input and responses
- `src/components/staff/ai/example-prompts.tsx` — Suggested questions
- `src/data/ai-responses.ts` — Pre-written AI responses per patient

**Acceptance Criteria:**
- [ ] Sidebar shows hints relevant to viewed patient
- [ ] Hints match PRD examples (Gewichtstrend, SpO2, etc.)
- [ ] Chat input triggers pre-written responses
- [ ] Example prompts are clickable
- [ ] Sidebar can be collapsed/expanded

---

### Task 6.2: Build Ambient Scribe Interface

**Purpose:** Create the simulated voice documentation interface showing how ambient scribe would work.

**What to Do:**
Build the ambient scribe UI matching PRD section 7.1. Include recording button with waveform visualization, simulated transcription appearing in real-time, structured output preview (SOAP format), and edit/confirm actions.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/staff/scribe/recording-button.tsx` — Start/stop recording
- `src/components/staff/scribe/waveform-display.tsx` — Audio visualization
- `src/components/staff/scribe/transcript-preview.tsx` — Simulated text appearing
- `src/components/staff/scribe/structured-output.tsx` — SOAP format result
- `src/components/staff/scribe/scribe-modal.tsx` — Full scribe flow modal
- `src/data/scribe-examples.ts` — Pre-written transcripts and outputs

**Acceptance Criteria:**
- [ ] Recording button shows active state
- [ ] Waveform animates during "recording"
- [ ] Text appears progressively (typing effect)
- [ ] Output shows SOAP sections from PRD
- [ ] Edit and confirm buttons work

---

### Task 6.3: Build Smart Actions Panel

**Purpose:** Create the smart actions suggestions panel that recommends next steps based on patient context.

**What to Do:**
Build the smart actions panel matching PRD section 7.5. Show AI-recommended actions (Labor-Auftrag, Physio-Verordnung, etc.) with one-click execution. Actions should be generated based on patient's current situation.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- `src/components/staff/ai/smart-actions.tsx` — Actions panel
- `src/components/staff/ai/action-card.tsx` — Single action with description
- `src/components/staff/ai/action-modal.tsx` — Confirmation/execution modal
- `src/data/smart-actions.ts` — Action definitions per patient scenario

**Acceptance Criteria:**
- [ ] Actions relevant to viewed patient
- [ ] Each action shows reason (AI rationale)
- [ ] Clicking "Erstellen" shows confirmation
- [ ] Actions match PRD examples (Labor, Physio, Hausarzt)
- [ ] Actions can be dismissed

---

## Phase 7: Interactive Demo & Deployment

**Goal:** Add demo mode controls, interactive scenarios, and deploy to Vercel for stakeholder presentation.

**Key Outcomes:**
- Demo control panel for triggering scenarios
- All 4 PRD scenarios working (critical alert, new patient, route conflict, patient feedback)
- Responsive design verified on all breakpoints
- Deployed and accessible via Vercel URL

**Dependencies:** All previous phases complete

---

### Task 7.1: Build Demo Control Panel

**Purpose:** Create hidden admin panel for triggering demo scenarios during presentations.

**What to Do:**
Build a demo control panel accessible via keyboard shortcut (Ctrl+Shift+D) or /demo route. Include buttons to trigger each of the 4 PRD scenarios, reset data to initial state, switch between patient personas, and toggle dark mode.

**Files to Create/Modify:**
- `src/app/demo/page.tsx` — Demo control panel page
- `src/components/demo/scenario-triggers.tsx` — Buttons for each scenario
- `src/components/demo/data-reset.tsx` — Reset to initial state
- `src/components/demo/persona-switcher.tsx` — Switch viewed patient
- `src/stores/demo-store.ts` — Demo state management

**Acceptance Criteria:**
- [ ] Panel accessible via Ctrl+Shift+D anywhere
- [ ] "SpO2-Abfall simulieren" triggers Hans Gerber alert
- [ ] "Neuen Patienten aufnehmen" shows intake form
- [ ] "Reset" returns all data to initial state
- [ ] Changes persist until reset

---

### Task 7.2: Implement Demo Scenario A - Critical Alert

**Purpose:** Wire up the critical alert scenario where Hans Gerber's SpO2 drops to 88%.

**What to Do:**
Implement the full scenario flow: trigger updates SpO2 in store, alert appears in notification center and dashboard, patient card shows warning, clicking alert opens patient with pre-filled AI recommendation.

**Files to Create/Modify:**
- `src/lib/scenarios/critical-alert.ts` — Scenario implementation
- Updates to alert store and patient store
- Updates to relevant UI components to react to change

**Acceptance Criteria:**
- [ ] Triggering scenario changes Hans Gerber's SpO2 to 88%
- [ ] Red alert appears immediately in notifications
- [ ] Dashboard shows updated alert count
- [ ] AI sidebar shows relevant recommendation
- [ ] Sound/vibration feedback on trigger (optional)

---

### Task 7.3: Implement Demo Scenario B - New Patient Intake

**Purpose:** Wire up the new patient intake scenario with form and automatic route recalculation.

**What to Do:**
Implement the intake flow: trigger opens quick-intake modal, form submission adds patient to store, patient appears in list, route optimization runs and shows new route with addition.

**Files to Create/Modify:**
- `src/lib/scenarios/new-patient.ts` — Scenario implementation
- `src/components/staff/intake/quick-intake-modal.tsx` — Intake form
- Updates to patient store and route store

**Acceptance Criteria:**
- [ ] Modal shows intake form with key fields
- [ ] Submitting adds patient to list
- [ ] New patient appears on map
- [ ] Route recalculates and shows change
- [ ] AI suggests initial diagnostics

---

### Task 7.4: Implement Demo Scenario C - Route Conflict

**Purpose:** Wire up the route conflict scenario showing schedule optimization challenges.

**What to Do:**
Implement the conflict flow: trigger adds urgent visit that conflicts with Fr. Meier's time preference, route page shows warning, optimization suggests alternatives, user can choose resolution.

**Files to Create/Modify:**
- `src/lib/scenarios/route-conflict.ts` — Scenario implementation
- Updates to route store with conflict detection
- Updates to route planning UI for conflict display

**Acceptance Criteria:**
- [ ] Triggering adds urgent visit for existing patient
- [ ] Route page shows yellow warning about conflict
- [ ] Two options presented (keep preference vs optimize)
- [ ] Selecting option updates route display
- [ ] Stats update to show impact

---

### Task 7.5: Implement Demo Scenario D - Patient Feedback

**Purpose:** Wire up the patient questionnaire completion scenario that triggers care team notification.

**What to Do:**
Implement the feedback flow: in patient app, completing questionnaire with concerning answers (Atemnot verschlechtert) triggers notification in staff dashboard, AI prioritizes as important, suggests adjusting visit schedule.

**Files to Create/Modify:**
- `src/lib/scenarios/patient-feedback.ts` — Scenario implementation
- Updates to questionnaire component to trigger alerts
- Updates to alert store with new alert type

**Acceptance Criteria:**
- [ ] Completing questionnaire with "bad" answers triggers alert
- [ ] Alert appears in staff notification center
- [ ] Alert marked as "Wichtig" (yellow)
- [ ] Clicking alert shows questionnaire responses
- [ ] AI suggests earlier visit

---

### Task 7.6: Final Polish and Responsive Testing

**Purpose:** Ensure the entire mockup looks perfect on all screen sizes and interactions are smooth.

**What to Do:**
Test all pages on mobile (375px), tablet (768px), and desktop (1280px+). Fix any layout issues. Verify all interactions work. Check dark mode on all pages. Ensure loading states and empty states look good.

**Important:** Use the `/frontend-design` skill when implementing this task to ensure high-quality, polished UI.

**Files to Create/Modify:**
- Various component files as needed for fixes
- `src/app/loading.tsx` — Global loading state
- `src/app/not-found.tsx` — 404 page styling

**Acceptance Criteria:**
- [ ] All pages work at 375px width (iPhone SE)
- [ ] Tablet layouts use space efficiently
- [ ] Desktop shows full sidebar and panels
- [ ] Dark mode consistent across all pages
- [ ] No console errors or warnings

---

### Task 7.7: Deploy to Vercel

**Purpose:** Deploy the completed mockup to Vercel for stakeholder access.

**What to Do:**
Connect the repository to Vercel, configure environment variables (Mapbox token), set up custom domain if available (carepilot-demo.vercel.app), verify deployment works.

**Files to Create/Modify:**
- `vercel.json` — Vercel configuration if needed
- `.env.example` — Document required env vars
- `README.md` — Update with deployment info

**Acceptance Criteria:**
- [ ] Deployed to Vercel successfully
- [ ] All pages load without errors
- [ ] Maps display correctly (Mapbox token configured)
- [ ] PWA installable from deployed URL
- [ ] Demo URL shareable with stakeholders

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| **Phase 1** | 5 | Project foundation, types, mock data, stores |
| **Phase 2** | 5 | Design system, shared components |
| **Phase 3** | 7 | Staff Dashboard (main clinical interface) |
| **Phase 4** | 6 | Patient App (elderly-friendly mobile) |
| **Phase 5** | 2 | Family Portal (limited access view) |
| **Phase 6** | 3 | AI features (simulated) |
| **Phase 7** | 7 | Demo scenarios, polish, deployment |
| **Total** | **35** | |

---

## Notes for Implementation

1. **Always use `/frontend-design` skill** for any UI task - this ensures the "Consumer Tech" aesthetic from the PRD
2. **Ask user for clarification** if any requirement seems ambiguous
3. **Mock data should feel real** - use actual Laufental addresses, realistic Swiss names, proper medical terminology
4. **Accessibility is critical** - the patient app serves elderly users
5. **Keep it simple** - this is a mockup, not production code. Prioritize visual polish over architecture
