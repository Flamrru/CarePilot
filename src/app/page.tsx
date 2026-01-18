import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Logo and Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-500 mb-6 shadow-elevated">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          CarePilot
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Spital zuhause – KSBL
        </p>
      </div>

      {/* Interface Selection */}
      <div className="grid gap-4 w-full max-w-md">
        <Link
          href="/staff"
          className="card card-hover p-6 flex items-center gap-4 transition-all hover:scale-[1.02]"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-slate-900 dark:text-white">Personal-Dashboard</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Für Ärzte, Pflegefachkräfte & Koordination</p>
          </div>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="/patient"
          className="card card-hover p-6 flex items-center gap-4 transition-all hover:scale-[1.02]"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-slate-900 dark:text-white">Patienten-App</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Für Patienten zuhause</p>
          </div>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="/family"
          className="card card-hover p-6 flex items-center gap-4 transition-all hover:scale-[1.02]"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-slate-900 dark:text-white">Familien-Portal</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Für Angehörige</p>
          </div>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Demo hint */}
      <p className="mt-8 text-sm text-slate-400 dark:text-slate-500">
        Demo-Modus: Ctrl+Shift+D für Szenarien
      </p>
    </main>
  )
}
