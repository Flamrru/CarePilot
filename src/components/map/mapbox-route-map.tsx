'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Patient } from '@/types'

// Laufental region center
const LAUFENTAL_CENTER: [number, number] = [7.48, 47.42]
const DEFAULT_ZOOM = 11.5

interface MapboxRouteMapProps {
  patients: Patient[]
  selectedPatientId?: string
  onSelectPatient?: (patientId: string) => void
  showRoute?: boolean
  height?: string
  className?: string
}

// Helper to create marker element safely (no innerHTML)
function createMarkerElement(
  index: number,
  status: string,
  isSelected: boolean,
  onClick: () => void
): HTMLElement {
  const container = document.createElement('div')
  container.className = 'mapbox-patient-marker'

  const markerDiv = document.createElement('div')
  markerDiv.className = `marker-container ${status === 'kritisch' ? 'critical' : status === 'beobachten' ? 'watch' : 'stable'} ${isSelected ? 'selected' : ''}`

  const numberDiv = document.createElement('div')
  numberDiv.className = 'marker-number'
  numberDiv.textContent = String(index + 1)

  const pulseDiv = document.createElement('div')
  pulseDiv.className = 'marker-pulse'

  markerDiv.appendChild(numberDiv)
  markerDiv.appendChild(pulseDiv)
  container.appendChild(markerDiv)

  container.addEventListener('click', onClick)

  return container
}

// Helper to create popup content safely (no innerHTML)
function createPopupContent(patient: Patient): HTMLElement {
  const container = document.createElement('div')
  container.className = 'mapbox-popup'

  const header = document.createElement('div')
  header.className = 'popup-header'

  const name = document.createElement('span')
  name.className = 'popup-name'
  name.textContent = `${patient.firstName} ${patient.lastName}`

  const statusSpan = document.createElement('span')
  statusSpan.className = `popup-status ${patient.status}`
  statusSpan.textContent = patient.status

  header.appendChild(name)
  header.appendChild(statusSpan)

  const diagnosis = document.createElement('div')
  diagnosis.className = 'popup-diagnosis'
  diagnosis.textContent = patient.diagnoses[0]?.name || 'Keine Diagnose'

  const address = document.createElement('div')
  address.className = 'popup-address'
  address.textContent = `${patient.address.street} ${patient.address.houseNumber}, ${patient.address.city}`

  container.appendChild(header)
  container.appendChild(diagnosis)
  container.appendChild(address)

  return container
}

export function MapboxRouteMap({
  patients,
  selectedPatientId,
  onSelectPatient,
  showRoute = true,
  height = '400px',
  className = '',
}: MapboxRouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [noToken, setNoToken] = useState(false)

  // Check for Mapbox token
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (!mapContainer.current) return
    if (!mapboxToken || mapboxToken === 'YOUR_MAPBOX_TOKEN_HERE') {
      setNoToken(true)
      return
    }

    // Initialize map
    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: LAUFENTAL_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      markersRef.current.forEach(marker => marker.remove())
      map.current?.remove()
    }
  }, [mapboxToken])

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded || noToken) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add patient markers
    patients.forEach((patient, index) => {
      if (!patient.address.coordinates) return

      const { lat, lng } = patient.address.coordinates

      // Create custom marker element using safe DOM methods
      const el = createMarkerElement(
        index,
        patient.status,
        selectedPatientId === patient.id,
        () => onSelectPatient?.(patient.id)
      )

      // Create popup content using safe DOM methods
      const popupContent = createPopupContent(patient)

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
      popup.setDOMContent(popupContent)

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current!)

      markersRef.current.push(marker)
    })

    // Draw route line if enabled
    if (showRoute && patients.length >= 2) {
      const coordinates = patients
        .filter(p => p.address.coordinates)
        .map(p => [p.address.coordinates!.lng, p.address.coordinates!.lat])

      // Remove existing route layer
      if (map.current.getSource('route')) {
        map.current.removeLayer('route-line')
        map.current.removeLayer('route-line-outline')
        map.current.removeSource('route')
      }

      // Add route source and layers
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      })

      // Route outline (for depth)
      map.current.addLayer({
        id: 'route-line-outline',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1e40af',
          'line-width': 6,
          'line-opacity': 0.3,
        },
      })

      // Route main line
      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#2563eb',
          'line-width': 3,
          'line-dasharray': [2, 1],
        },
      })
    }

    // Fit bounds to show all patients
    if (patients.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      patients.forEach(patient => {
        if (patient.address.coordinates) {
          bounds.extend([patient.address.coordinates.lng, patient.address.coordinates.lat])
        }
      })
      map.current.fitBounds(bounds, { padding: 60, maxZoom: 13 })
    }
  }, [patients, selectedPatientId, mapLoaded, showRoute, onSelectPatient, noToken])

  // Fallback if no token
  if (noToken) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 ${className}`}
        style={{ height }}
      >
        <FallbackMap patients={patients} selectedPatientId={selectedPatientId} onSelectPatient={onSelectPatient} />
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .mapbox-patient-marker {
          cursor: pointer;
        }

        .marker-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.2s ease;
        }

        .marker-container:hover {
          transform: scale(1.15);
        }

        .marker-container.stable {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        }

        .marker-container.watch {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }

        .marker-container.critical {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          animation: pulse-critical 2s ease-in-out infinite;
        }

        .marker-container.selected {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
        }

        .marker-number {
          color: white;
          font-weight: 700;
          font-size: 14px;
          z-index: 1;
        }

        .marker-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid currentColor;
          opacity: 0;
        }

        .marker-container.critical .marker-pulse {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          border-color: #ef4444;
        }

        @keyframes pulse-critical {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        .mapbox-popup {
          padding: 4px 0;
          min-width: 180px;
        }

        .popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 4px;
        }

        .popup-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 14px;
        }

        .popup-status {
          font-size: 10px;
          font-weight: 500;
          padding: 2px 6px;
          border-radius: 9999px;
          text-transform: capitalize;
        }

        .popup-status.stabil {
          background: #dcfce7;
          color: #166534;
        }

        .popup-status.beobachten {
          background: #fef3c7;
          color: #92400e;
        }

        .popup-status.kritisch {
          background: #fee2e2;
          color: #991b1b;
        }

        .popup-diagnosis {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .popup-address {
          font-size: 11px;
          color: #94a3b8;
        }

        .mapboxgl-popup-content {
          padding: 12px 14px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
      <div
        ref={mapContainer}
        className={`rounded-2xl overflow-hidden ${className}`}
        style={{ height }}
      />
    </>
  )
}

// Fallback map when no Mapbox token is available
function FallbackMap({
  patients,
  selectedPatientId,
  onSelectPatient,
}: {
  patients: Patient[]
  selectedPatientId?: string
  onSelectPatient?: (patientId: string) => void
}) {
  // Simple SVG-based map visualization
  const minLat = Math.min(...patients.map(p => p.address.coordinates?.lat || 47.42))
  const maxLat = Math.max(...patients.map(p => p.address.coordinates?.lat || 47.42))
  const minLng = Math.min(...patients.map(p => p.address.coordinates?.lng || 7.48))
  const maxLng = Math.max(...patients.map(p => p.address.coordinates?.lng || 7.48))

  const padding = 0.02
  const latRange = (maxLat - minLat) || 0.1
  const lngRange = (maxLng - minLng) || 0.1

  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng + padding) / (lngRange + padding * 2)) * 100
    const y = (1 - (lat - minLat + padding) / (latRange + padding * 2)) * 100
    return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) }
  }

  const statusColors = {
    stabil: '#22c55e',
    beobachten: '#f59e0b',
    kritisch: '#ef4444',
  }

  return (
    <div className="relative w-full h-full">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative roads */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#475569" strokeWidth="8" />
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#475569" strokeWidth="6" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#475569" strokeWidth="4" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#475569" strokeWidth="4" />
      </svg>

      {/* Route line */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {patients.length >= 2 && (
          <polyline
            points={patients
              .filter(p => p.address.coordinates)
              .map(p => {
                const pos = getPosition(p.address.coordinates!.lat, p.address.coordinates!.lng)
                return `${pos.x}%,${pos.y}%`
              })
              .join(' ')}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8,4"
          />
        )}
      </svg>

      {/* Patient markers */}
      {patients.map((patient, index) => {
        if (!patient.address.coordinates) return null
        const pos = getPosition(patient.address.coordinates.lat, patient.address.coordinates.lng)
        const isSelected = selectedPatientId === patient.id
        const color = statusColors[patient.status]

        return (
          <button
            key={patient.id}
            onClick={() => onSelectPatient?.(patient.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              isSelected ? 'scale-125 z-10' : 'hover:scale-110'
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                boxShadow: `0 4px 12px ${color}66`,
              }}
            >
              {index + 1}
            </div>
            {patient.status === 'kritisch' && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: color, opacity: 0.3 }}
              />
            )}
          </button>
        )
      })}

      {/* Region label */}
      <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
        Laufental, BL
      </div>

      {/* No token notice */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Für interaktive Karte: Mapbox Token in Umgebungsvariablen setzen
          </p>
        </div>
      </div>
    </div>
  )
}
