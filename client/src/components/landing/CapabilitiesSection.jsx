/**
 * Capabilities & Platform Pillars Section Component
 * Displays the 4 core pillars of the autonomous infrastructure stack.
 */
export default function CapabilitiesSection() {
  const capabilities = [
    {
      id: 'ai-detection',
      icon: 'neurology',
      colorClass: 'violet',
      title: 'AI-Powered Detection',
      description:
        'Convolutional neural nets score photographic hazard severity, categorizing defect vectors in milliseconds.',
      metric: '>96% CNN Precision'
    },
    {
      id: 'geotagging',
      icon: 'location_searching',
      colorClass: 'cyan',
      title: 'Precise Geotagging',
      description:
        'Instant sub-meter GPS pinpointing cross-referenced against authoritative municipal GIS zoning grids.',
      metric: 'Sub-meter accuracy'
    },
    {
      id: 'tracking',
      icon: 'timeline',
      colorClass: 'emerald',
      title: 'Transparent Tracking',
      description:
        'Public stage progression from receipt to crew dispatch with immutable timestamps and real-time SLA accountability.',
      metric: 'Live Public Ledger'
    },
    {
      id: 'resolution',
      icon: 'verified_user',
      colorClass: 'lavender',
      title: 'Verified Resolution',
      description:
        'Cryptographic before-and-after photographic audit trails ensure real structural completion before case closure.',
      metric: 'Audited Sign-Off'
    }
  ]

  return (
    <section id="capabilities" className="mb-section">
      <div className="mb-container">
        {/* Section Heading */}
        <div className="mb-section-header">
          <span className="mb-section-sub">Autonomous Infrastructure Stack</span>
          <h2 className="mb-section-title">Engineered for Rapid Response</h2>
        </div>

        {/* 4 Glass Cards Grid */}
        <div className="mb-capabilities-grid">
          {capabilities.map((cap) => (
            <div key={cap.id} className="mb-cap-card">
              <div className={`mb-cap-icon-box ${cap.colorClass}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                  {cap.icon}
                </span>
              </div>

              <div>
                <h3 className="mb-cap-title">{cap.title}</h3>
                <p className="mb-cap-body">{cap.description}</p>
              </div>

              <div className={`mb-cap-metric ${cap.colorClass}`}>
                <span>{cap.metric}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
