/**
 * Global loading state for CarePilot
 * Refined, professional aesthetic with subtle animation
 */

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          {/* Pulse ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-primary-500/20 animate-ping" style={{ animationDuration: '2s' }} />

          {/* Logo container */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            CarePilot
          </h2>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm text-slate-500 dark:text-slate-400">Wird geladen</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        </div>

        {/* Skeleton preview - subtle hint of content loading */}
        <div className="mt-12 w-72 space-y-3 opacity-40">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-3/5 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </main>
  )
}
