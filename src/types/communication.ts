/**
 * Communication and alert types for CarePilot
 * Based on PRD sections 4.7, 5.6, 7.3
 */

export type AlertPriority = 'dringend' | 'wichtig' | 'information'
export type AlertCategory =
  | 'vital'
  | 'medikation'
  | 'fragebogen'
  | 'termin'
  | 'system'
  | 'labor'
  | 'kommunikation'
export type AlertStatus = 'neu' | 'gelesen' | 'bearbeitet' | 'ignoriert'

export interface Alert {
  id: string
  patientId?: string // Optional - some alerts are system-wide

  // Content
  title: string
  message: string
  category: AlertCategory
  priority: AlertPriority

  // Status
  status: AlertStatus
  readAt?: Date
  readBy?: string
  handledAt?: Date
  handledBy?: string
  ignoredReason?: string

  // Actions
  suggestedActions?: {
    label: string
    action: 'call' | 'visit' | 'message' | 'view' | 'adjust'
    targetUrl?: string
  }[]

  // AI
  aiTriaged: boolean
  aiRationale?: string // Why AI assigned this priority
  originalPriority?: AlertPriority // If manually changed

  // Source
  source: 'telemetry' | 'questionnaire' | 'staff' | 'system' | 'patient'
  sourceId?: string // e.g., vital reading ID

  // Timestamps
  createdAt: Date
  expiresAt?: Date
}

export type MessageType = 'text' | 'image' | 'audio' | 'system'
export type MessageSender = 'patient' | 'family' | 'staff' | 'system'

export interface Message {
  id: string
  conversationId: string

  // Content
  type: MessageType
  content: string // Text or URL for media
  mediaUrl?: string

  // Sender
  senderType: MessageSender
  senderId: string
  senderName: string

  // Status
  isRead: boolean
  readAt?: Date
  isDelivered: boolean
  deliveredAt?: Date

  // Timestamps
  createdAt: Date
}

export interface Conversation {
  id: string
  patientId: string

  // Participants
  participantIds: string[]
  participantTypes: MessageSender[]

  // Messages
  lastMessage?: Message
  unreadCount: number

  // Status
  isArchived: boolean
  isPinned: boolean

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// Quick messages for patient app
export interface QuickMessage {
  id: string
  text: string // e.g., "Mir geht es schlechter"
  category: 'status' | 'medication' | 'appointment' | 'question'
  icon: string // Lucide icon name
  triggersAlert: boolean
  alertPriority?: AlertPriority
}

// Notification preferences
export interface NotificationPreferences {
  userId: string
  userType: 'staff' | 'patient' | 'family'

  // Channels
  pushEnabled: boolean
  smsEnabled: boolean
  emailEnabled: boolean

  // Categories
  enabledCategories: AlertCategory[]
  mutedPatientIds: string[]

  // Quiet hours
  quietHoursEnabled: boolean
  quietHoursStart: string // e.g., "22:00"
  quietHoursEnd: string // e.g., "07:00"
  quietHoursExceptions: AlertPriority[] // Still notify for these
}

// For the notification center
export interface NotificationGroup {
  priority: AlertPriority
  count: number
  alerts: Alert[]
}
