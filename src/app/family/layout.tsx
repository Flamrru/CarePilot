'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/stores'

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setActiveInterface = useUIStore((state) => state.setActiveInterface)

  useEffect(() => {
    setActiveInterface('family')
  }, [setActiveInterface])

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">CarePilot</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Familien-Portal</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <Link
            href="/family"
            className={`flex flex-col items-center min-w-[72px] py-2 rounded-lg ${
              isActive('/family') ? 'text-warning-600 dark:text-warning-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium mt-1">Übersicht</span>
          </Link>
          <Link
            href="/family/nachricht"
            className={`flex flex-col items-center min-w-[72px] py-2 rounded-lg ${
              isActive('/family/nachricht') ? 'text-warning-600 dark:text-warning-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium mt-1">Nachricht</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
