/**
 * Central export for all Zustand stores
 */

export { usePatientStore } from './patient-store'
export { useAlertStore } from './alert-store'
export { useRouteStore } from './route-store'
export { useUIStore } from './ui-store'
export { useDemoStore, scenarioMetadata, type ScenarioId } from './demo-store'

// Reset all stores (for demo)
export const resetAllStores = () => {
  const { usePatientStore } = require('./patient-store')
  const { useAlertStore } = require('./alert-store')
  const { useRouteStore } = require('./route-store')
  const { useUIStore } = require('./ui-store')

  usePatientStore.getState().reset()
  useAlertStore.getState().reset()
  useRouteStore.getState().reset()
  useUIStore.getState().reset()
}
