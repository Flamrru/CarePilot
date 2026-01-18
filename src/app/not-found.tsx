/**
 * 404 Not Found page for CarePilot
 * Friendly, reassuring design with helpful navigation
 */

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl opacity-60" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center animate-fade-up">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-flex items-center justify-center">
            {/* Large 404 text behind */}
            <span className="absolute text-[160px] font-black text-slate-100 dark:text-slate-800 select-none leading-none tracking-tighter">
              404
            </span>

            {/* Icon overlay */}
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-xl border border-slate-200/50 dark:border-slate-700/50">
              <svg
                className="w-16 h-16 text-slate-400 dark:text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text content */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Seite nicht gefunden
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg leading-relaxed">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
          Nutzen Sie die Navigation unten, um zurückzukehren.
        </p>

        {/* Quick navigation cards */}
        <div className="grid gap-3 mb-6">
          <Link
            href="/"
            className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-slate-900 dark:text-white">Startseite</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Zurück zur Übersicht</p>
            </div>
            <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/staff"
              className="group p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Staff</p>
            </Link>

            <Link
              href="/patient"
              className="group p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-success-300 dark:hover:border-success-700 hover:shadow-md transition-all text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-success-100 dark:bg-success-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Patient</p>
            </Link>

            <Link
              href="/family"
              className="group p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-warning-300 dark:hover:border-warning-700 hover:shadow-md transition-all text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Familie</p>
            </Link>
          </div>
        </div>

        {/* Help text */}
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Brauchen Sie Hilfe?{' '}
          <Link href="/staff" className="text-primary-600 dark:text-primary-400 hover:underline">
            Kontaktieren Sie das Team
          </Link>
        </p>
      </div>
    </main>
  )
}
