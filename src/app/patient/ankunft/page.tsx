'use client'

export default function ArrivalPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-patient-2xl font-bold text-slate-900 dark:text-white">Ankunft verfolgen</h1>
        <p className="text-patient-base text-slate-500 dark:text-slate-400 mt-1">
          Das Team ist unterwegs zu Ihnen
        </p>
      </div>

      <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
        <p className="text-primary-100">Geschätzte Ankunft</p>
        <p className="text-5xl font-bold mt-2">08:30</p>
        <p className="text-primary-100 mt-2">in ca. 15 Minuten</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-medium text-slate-600 dark:text-slate-300">
            MB
          </div>
          <div>
            <p className="text-patient-lg font-semibold text-slate-900 dark:text-white">Marco Bianchi</p>
            <p className="text-patient-base text-slate-500">Pflegefachmann</p>
          </div>
        </div>
        <button className="w-full inline-flex items-center justify-center px-6 py-4 bg-primary-500 text-white text-patient-lg font-medium rounded-xl">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Team anrufen
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-patient-lg font-semibold text-slate-900 dark:text-white mb-4">Heutige Aufgaben</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-patient-base text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Vitalzeichen messen
          </li>
          <li className="flex items-center gap-3 text-patient-base text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Gewichtskontrolle
          </li>
          <li className="flex items-center gap-3 text-patient-base text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Medikamentenkontrolle
          </li>
        </ul>
      </div>

      <div className="card p-8 bg-slate-100 dark:bg-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">Live-Karte wird in Phase 2 implementiert</p>
      </div>
    </div>
  )
}
