import { useState } from 'react'

/**
 * Hero Section Component
 * Displays main platform value proposition, live telemetry indicators,
 * fast CTA triggers, and an interactive floating incident simulation card.
 */
export default function HeroSection({ onOpenReportModal, onExploreMap }) {
  // Interactive citizen confirmation state
  const [confirmedCount, setConfirmedCount] = useState(38)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const handleToggleConfirm = () => {
    if (hasConfirmed) {
      setConfirmedCount((prev) => prev - 1)
      setHasConfirmed(false)
    } else {
      setConfirmedCount((prev) => prev + 1)
      setHasConfirmed(true)
    }
  }

  return (
    <section className="mb-hero-section">
      {/* Ambient Radial Background Glows */}
      <div className="mb-glow-sphere-1" />
      <div className="mb-glow-sphere-2" />

      <div className="mb-container">
        <div className="mb-hero-grid">
          {/* Left Column: Value Proposition */}
          <div className="mb-hero-content">
            {/* Live Telemetry Status Pill */}
            <div className="mb-live-status-pill">
              <span className="mb-live-indicator-dot" />
              <span className="pill-text">Decentralized Civic Intelligence</span>
              <span style={{ color: 'var(--mb-outline)' }}>•</span>
              <span className="pill-sub">v2.4 Telemetry Live</span>
            </div>

            {/* Headline */}
            <h1 className="mb-hero-title">
              Make Your City Better.{' '}
              <br />
              <span className="mb-gradient-text">
                One Report at a Time.
              </span>
            </h1>

            {/* Description */}
            <p className="mb-hero-description">
              Report civic issues, locate them on the map, and follow their journey
              from detection to resolution. AI-powered classification helps make
              every report easier to process.
            </p>

            {/* CTA Action Buttons */}
            <div className="mb-hero-cta-group">
              <button
                type="button"
                className="mb-btn-hero-primary"
                onClick={onOpenReportModal}
              >
                <span>Report an Issue</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <button
                type="button"
                className="mb-btn-hero-secondary"
                onClick={onExploreMap}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--mb-secondary)' }}>
                  explore
                </span>
                <span>Explore Live Map</span>
              </button>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="mb-telemetry-strip">
              <div className="mb-telemetry-card">
                <div className="mb-telemetry-val cyan">94.8%</div>
                <div className="mb-telemetry-label">AI Accuracy</div>
              </div>

              <div className="mb-telemetry-card">
                <div className="mb-telemetry-val violet">18.4 hrs</div>
                <div className="mb-telemetry-label">Median SLA</div>
              </div>

              <div className="mb-telemetry-card">
                <div className="mb-telemetry-val emerald">14,280+</div>
                <div className="mb-telemetry-label">Repairs Verified</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Floating Incident Card */}
          <div className="mb-hero-card-wrapper">
            <div className="mb-card-glow-bg" />

            <div className="mb-hero-incident-card">
              {/* Card Header */}
              <div className="mb-card-header">
                <div className="mb-card-title-group">
                  <div className="mb-card-icon-box">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <span className="mb-card-id-tag">ID #MB-9821</span>
                    <h2 className="mb-card-title">Road damage detected</h2>
                  </div>
                </div>

                <div className="mb-status-pill-verified">
                  <span className="mb-pulse-dot" style={{ position: 'static', width: 6, height: 6 }} />
                  Verified & In Triage
                </div>
              </div>

              {/* Incident Visual Preview with AI Classification pill */}
              <div className="mb-image-preview-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUQnul_7j_YJxt7EzcwUZ2OkyqJ_vjuHkJTS8ngfA2UYK7HozFXHis4eWb4SPYPcT7ifRBKurX-gWmzW3waqUQ0CcjEcLn6sD7-iw24fb4rGvklhIQ2-iavxYqkuGaiK-HbuFFT2uYYIECyAf6sFSLtiG5hfMy7TLegxIAkq5FY3yt6-8ZXJkZ82f9yA9Z9A5jzkdkdNgGBnYamZlwfbBuVM-UGh8_ovjboirF0Ad2Ps_ZZtGLtxFv"
                  alt="High contrast asphalt crack and pothole"
                  className="mb-incident-img"
                />
                <div className="mb-image-gradient-overlay" />

                {/* AI Classification Confidence Pill */}
                <div className="mb-ai-confidence-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                    psychology
                  </span>
                  <span>96.4% Confidence • Pothole</span>
                </div>

                {/* Geo Location Pill */}
                <div className="mb-geo-location-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--mb-primary)' }}>
                    pin_drop
                  </span>
                  <span>Elm St & 5th Ave (Zone 04)</span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-card-desc">
                Pothole & asphalt fissure impacting west bicycle lane and primary carriage lane.
                Dispatched sensor units flagged active traffic deflection.
              </p>

              {/* SLA Progression Bar */}
              <div className="mb-sla-box">
                <div className="mb-sla-header">
                  <span className="mb-sla-target">SLA Resolution Window</span>
                  <span className="mb-sla-eta">48 hrs remaining</span>
                </div>
                <div className="mb-progress-track">
                  <div className="mb-progress-bar" />
                </div>
                <div className="mb-sla-meta">
                  <span>Reported: 2h ago</span>
                  <span>Crew: Alpha-9 En Route</span>
                </div>
              </div>

              {/* Card Interactive Footer */}
              <div className="mb-card-footer">
                <button
                  type="button"
                  onClick={handleToggleConfirm}
                  className={`mb-confirm-btn ${hasConfirmed ? 'confirmed' : ''}`}
                  title="Click to confirm civic issue in your neighborhood"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    {hasConfirmed ? 'check_circle' : 'verified'}
                  </span>
                  <span>{confirmedCount} Citizens Confirmed</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreMap}
                  className="mb-link-inspect"
                >
                  <span>Inspect Telemetry</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    open_in_new
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
