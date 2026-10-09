import { useState } from 'react'

/**
 * Metropolitan Incident Radar & Geospatial Preview Section
 * Displays an interactive city telemetry map with clickable pins, sector filters,
 * and a floating incident inspection drawer.
 */
export default function RadarMapSection() {
  const [selectedSector, setSelectedSector] = useState('all')

  // Sample incidents mapped onto the geospatial preview
  const pins = [
    {
      id: 'pin-1',
      sector: 'roads',
      type: 'Pothole • 96% AI Conf',
      icon: 'alt_route',
      colorClass: 'violet',
      top: '28%',
      left: '34%',
      title: 'Pine St Severe Pothole Cluster',
      status: 'In Triage',
      zone: 'Zone 04 • High Priority',
      description:
        'Deep lateral pavement fissure impacting public transit and bicycle lanes. Dispatched crew en route.'
    },
    {
      id: 'pin-2',
      sector: 'lighting',
      type: 'Traffic Light Fault • Resolved',
      icon: 'bolt',
      colorClass: 'emerald',
      top: '48%',
      left: '62%',
      title: '4th Ave Signal Controller Overheat',
      status: 'Resolved',
      zone: 'Zone 01 • Priority 2',
      description:
        'Intermittent cycling on pedestrian signal head. Replaced solid-state ballast and re-synced timing.'
    },
    {
      id: 'pin-3',
      sector: 'water',
      type: 'Storm Drain Backup • Active',
      icon: 'water_damage',
      colorClass: 'cyan',
      top: '68%',
      left: '45%',
      title: 'Westlake Storm Drain Blockage',
      status: 'In Triage',
      zone: 'Zone 02 • Priority 1',
      description:
        'Heavy sediment and foliage causing standing water across right lane. Dispatched crew en route with suction equipment.'
    }
  ]

  // Currently active incident shown in drawer (defaults to pin-3)
  const [activePin, setActivePin] = useState(pins[2])

  // Filter pins based on selected sector
  const visiblePins = selectedSector === 'all'
    ? pins
    : pins.filter((p) => p.sector === selectedSector)

  return (
    <section id="geospatial-radar" className="mb-section">
      <div className="mb-container">
        {/* Radar Header with Filter Controls */}
        <div className="mb-radar-header-row">
          <div>
            <span className="mb-section-sub cyan">Live Geospatial Telemetry</span>
            <h2 className="mb-section-title">Metropolitan Incident Radar</h2>
          </div>

          {/* Sector Filter Bar */}
          <div className="mb-filter-pill-bar">
            <button
              type="button"
              className={`mb-filter-tab ${selectedSector === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSector('all')}
            >
              All Sectors
            </button>
            <button
              type="button"
              className={`mb-filter-tab ${selectedSector === 'roads' ? 'active' : ''}`}
              onClick={() => setSelectedSector('roads')}
            >
              <span className="mb-tab-dot roads" />
              Roads
            </button>
            <button
              type="button"
              className={`mb-filter-tab ${selectedSector === 'water' ? 'active' : ''}`}
              onClick={() => setSelectedSector('water')}
            >
              <span className="mb-tab-dot water" />
              Water/Drain
            </button>
            <button
              type="button"
              className={`mb-filter-tab ${selectedSector === 'lighting' ? 'active' : ''}`}
              onClick={() => setSelectedSector('lighting')}
            >
              <span className="mb-tab-dot lighting" />
              Lighting
            </button>
          </div>
        </div>

        {/* Map Canvas Viewport */}
        <div className="mb-map-viewport">
          {/* GIS Satellite Map Background */}
          <div
            className="mb-map-bg"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAO3OEgpwdfXKuiqOPNSIcn8lASEwcD3z13leoOBqhJ1jWN4VoM_hu12vKtU8w6nmDRinaggKX-McAdkhu8MUrUhQ7Zck37sdnzI4SZZv6uHbjVnS_-FX6i3hsgKfqoARHOyNNC0Wdk3omUAsb6dL8C4d2_3exHKp9fRPncVHGtZw_Ewm6gGK6zIiFu5o56wk6k6ao2Pn6wyJ0p7cakxVcaajoc35WrIDGBTHzrzudaO0pvDuoZeWQ')`
            }}
          />

          {/* Dark scrim overlay */}
          <div className="mb-map-scrim" />

          {/* Fullscreen Map Action Trigger */}
          <button
            type="button"
            className="mb-btn-fullscreen-map"
            onClick={() => alert('Full GIS Telemetry Suite loaded for current sector coordinates.')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              fullscreen
            </span>
            <span>Open Geospatial Suite</span>
          </button>

          {/* Render Active Filtered Pins */}
          {visiblePins.map((pin) => {
            const isSelected = activePin?.id === pin.id
            return (
              <div
                key={pin.id}
                className={`mb-map-pin ${isSelected ? 'active' : ''}`}
                style={{ top: pin.top, left: pin.left }}
                onClick={() => setActivePin(pin)}
                title={pin.title}
              >
                {/* Ping wave animation */}
                <div className={`mb-pin-ping ${pin.colorClass}`} />

                {/* Core Pin Icon */}
                <div className={`mb-pin-core ${pin.colorClass}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {pin.icon}
                  </span>
                </div>

                {/* Hover Tooltip */}
                <div className="mb-pin-tooltip">
                  {pin.type}
                </div>
              </div>
            )
          })}

          {/* Floating Incident Drawer */}
          {activePin && (
            <div className="mb-map-drawer">
              <div className="mb-drawer-top">
                <span className="mb-drawer-tag">ACTIVE TELEMETRY PIN</span>
                <span className="mb-drawer-badge">{activePin.status}</span>
              </div>

              <h4 className="mb-drawer-title">{activePin.title}</h4>

              <p className="mb-drawer-desc">{activePin.description}</p>

              <div className="mb-drawer-footer">
                <span className="mb-drawer-zone">{activePin.zone}</span>
                <button
                  type="button"
                  className="mb-drawer-btn"
                  onClick={() => alert(`Details opened for: ${activePin.title}`)}
                >
                  <span>View Full Pin</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                    arrow_outward
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
