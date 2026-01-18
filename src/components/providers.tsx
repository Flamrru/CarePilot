'use client'

import { DemoOverlay } from './demo'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <DemoOverlay />
    </>
  )
}
