import { useState } from 'react'

/**
 * Location Review & Geotagging Card Component
 * Map viewport with pinpoint coordinates, radar ping animation,
 * and GPS sub-meter sync controls.
 */
export default function LocationReviewCard({
  address = 'North Ave & 14th St Intersection, Ward 4',
  coordinates = '40.7128° N, 74.0060° W',
  onAddressChange,
  onSyncGps
}) {
  const [zoomLevel, setZoomLevel] = useState(16)

  return (
    <div className="location-review-card">
      {/* Header */}
      <div className="location-review-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--mb-secondary)' }}>
            pin_drop
          </span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--mb-text-primary)' }}>
            Location Review
          </span>
        </div>

        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(69, 223, 164, 0.15)',
          color: 'var(--mb-tertiary)',
          fontSize: '11px',
          fontFamily: 'ui-monospace, monospace',
          padding: '3px 9px',
          borderRadius: '9999px',
          fontWeight: 600
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mb-tertiary)' }} />
          GPS ±2.5m Accurate
        </span>
      </div>

      {/* Map Viewport with Center Pin Overlay */}
      <div className="location-map-viewport">
        {/* Map GIS Satellite Background */}
        <div
          className="location-map-bg"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAO3OEgpwdfXKuiqOPNSIcn8lASEwcD3z13leoOBqhJ1jWN4VoM_hu12vKtU8w6nmDRinaggKX-McAdkhu8MUrUhQ7Zck37sdnzI4SZZv6uHbjVnS_-FX6i3hsgKfqoARHOyNNC0Wdk3omUAsb6dL8C4d2_3exHKp9fRPncVHGtZw_Ewm6gGK6zIiFu5o56wk6k6ao2Pn6wyJ0p7cakxVcaajoc35WrIDGBTHzrzudaO0pvDuoZeWQ')`,
            transform: `scale(${zoomLevel / 16})`,
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Floating Center Radar Pin */}
        <div className="map-center-pin-overlay">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="map-coords-pill">
              {coordinates}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="map-pin-ping-wave" />
              <div className="map-pin-bubble">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  location_on
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Zoom Controls */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          background: 'rgba(12, 14, 21, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '3px'
        }}>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 1, 20))}
            style={{ width: 28, height: 28, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: 4 }}
            title="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 1, 12))}
            style={{ width: 28, height: 28, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: 4 }}
            title="Zoom out"
          >
            -
          </button>
        </div>
      </div>

      {/* Address Input & Sync Row */}
      <div className="location-form-body">
        <div className="form-field-unit">
          <label className="form-field-label" htmlFor="addrInput">
            Pin Address Position
          </label>
          <div className="address-row">
            <input
              id="addrInput"
              type="text"
              className="form-input-control"
              value={address}
              onChange={(e) => onAddressChange && onAddressChange(e.target.value)}
            />
            <button
              type="button"
              className="gps-sync-btn"
              onClick={onSyncGps}
              title="Re-sync Current GPS Coordinates"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                my_location
              </span>
            </button>
          </div>
        </div>

        {/* Dispatch Grid Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          background: 'var(--mb-surface-lowest)',
          padding: '10px 12px',
          borderRadius: '8px',
          color: 'var(--mb-text-dim)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>history</span>
            Ward 4 Dispatch Grid 12-B
          </span>
          <span style={{ color: 'var(--mb-tertiary)', fontWeight: 600 }}>Standard 48h SLA</span>
        </div>
      </div>
    </div>
  )
}
