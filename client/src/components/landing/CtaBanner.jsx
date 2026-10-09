/**
 * Call-To-Action Banner Component
 * High-impact closing callout to drive citizen reports and map engagement.
 */
export default function CtaBanner({ onOpenReportModal, onExploreMap }) {
  return (
    <section className="mb-cta-section">
      <div className="mb-container">
        <div className="mb-cta-box">
          {/* Internal ambient glowing spheres */}
          <div className="mb-cta-glow-1" />
          <div className="mb-cta-glow-2" />

          {/* Icon Badge */}
          <div className="mb-cta-icon-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              location_city
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-cta-title">
            Your City. Your Voice.{' '}
            <br />
            <span className="mb-gradient-text">Real Progress.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="mb-cta-sub">
            Join thousands of proactive citizens and municipality dispatchers restoring
            infrastructure accountability across every district.
          </p>

          {/* Action CTAs */}
          <div className="mb-cta-actions">
            <button
              type="button"
              className="mb-btn-hero-primary"
              onClick={onOpenReportModal}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Report an Issue Now</span>
            </button>

            <button
              type="button"
              className="mb-btn-hero-secondary"
              onClick={onExploreMap}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--mb-secondary)' }}>
                map
              </span>
              <span>Explore Live Map</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
