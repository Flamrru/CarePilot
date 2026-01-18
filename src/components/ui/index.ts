/**
 * CarePilot UI Component Library
 *
 * Core components for the Hospital at Home application.
 * Design aesthetic: "Consumer Tech for Healthcare" - like Notion or Linear
 * but tailored for medical professionals.
 *
 * All components support:
 * - Dark mode via Tailwind dark: classes
 * - Multiple sizes including xl for elderly-friendly touch targets
 * - Accessible focus states
 * - Smooth micro-interactions
 */

// Button
export { Button, buttonVariants } from './button'
export type { ButtonProps } from './button'

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './card'
export type { CardProps } from './card'

// Badge
export { Badge, StatusDot, badgeVariants } from './badge'
export type { BadgeProps } from './badge'

// Input
export { Input, Textarea, inputVariants } from './input'
export type { InputProps, TextareaProps } from './input'

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from './avatar'
export type { AvatarProps } from './avatar'
