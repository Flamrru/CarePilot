/**
 * CarePilot Navigation Components
 *
 * Navigation components for different interfaces:
 * - Sidebar: Staff desktop navigation
 * - BottomNav: Mobile bottom navigation
 * - Header: Page headers with back navigation
 */

export { Sidebar, staffNavLinks } from './sidebar'
export type { SidebarProps, SidebarLink } from './sidebar'

export { BottomNav, patientNavLinks, familyNavLinks } from './bottom-nav'
export type { BottomNavProps, BottomNavLink } from './bottom-nav'

export { Header, AppBar } from './header'
export type { HeaderProps, AppBarProps } from './header'
