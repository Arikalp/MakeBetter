/**
 * Public Impact & Remediation Feed Section Component
 * Displays verified community incident reports, stage progression, and SLA metrics.
 */
export default function PublicFeedSection() {
  const feedItems = [
    {
      id: 'feed-1',
      title: 'Streetlight outage near school crosswalk',
      location: 'Pine Street & 4th',
      timeAgo: '35m ago',
      status: 'Resolved',
      statusClass: 'resolved',
      snippet:
        'Ballast replacement verified via certified photometric luminance upload. Crosswalk safety restored.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYBfmb1-lepdbnb0Qiunn8t1ZoDmQ-kWOUHPjwN0dsrCbi3b0dDpLwMR_bfsV3p1v5EaGJ0Gu9qio86ExF2Gmxvh2Vb7WPSp-k_4oblcsxCXq2ReCVvmwNc-kbYhxfZ4XxcuODaC7Bv0zIX9aSCsFzs7RZjITr_coLWWYXTxs6y3kuvu9aoPmAaWvFlR1OzT_m9r-4e0zHZQ0_YBya4UE4aTspgJefI_1AsLB1uLcGl2KZdOC7zFOW',
      alt: 'Streetlight maintenance work under twilight sky',
      slaText: 'Closed in 4.2h',
      slaIcon: 'check_circle',
      slaColor: 'emerald',
      crew: 'Crew #201'
    },
    {
      id: 'feed-2',
      title: 'Guardrail deformation on exit ramp',
      location: 'East Parkway Overpass',
      timeAgo: '1h ago',
      status: 'In Progress',
      statusClass: 'in-progress',
      snippet:
        'Impact absorption barrier bent following minor vehicular collision. Structural welding crew on site.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDp7jm7-2gJUOM-bzE2GClp2mv7WArJ65ju98mCMPdm5J30nixLgeR21PW7BgNfZ8Ek8du3U5M0XcmN4gpld8eEzRu0IVII3Wwf0sP4rdmf-4AZiITUsT_WsFXQMAE9WXbnpeOWs6kryVyk8SxTgDcgv7hmwpCH1Zeplcw5rC2gCExsKsytzJa6C_PZ4nal_Ev5EsDHoCiJUAJE5WvSqIvF7ypA5lc2iUTWNkg-x_m4PnJyItx8x82_',
      alt: 'Impacted roadside metal guardrail with caution cones',
      slaText: 'ETA 3h remaining',
      slaIcon: 'hourglass_top',
      slaColor: 'violet',
      crew: 'Crew #084'
    },
    {
      id: 'feed-3',
      title: 'Severe sidewalk root heave hazard',
      location: 'Belltown Sector 11',
      timeAgo: '3h ago',
      status: 'Verified',
      statusClass: 'verified',
      snippet:
        'Root system lifted concrete flags by 7cm. AI prioritized hazard level to Grade-2 pedestrian alert.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAuMQcESpGPRkRjf4R6EdBIyZhTSj1nxPqmkpbwoMBou8c7qIs38f6IJY9Upn8vWyDo0xc3GgBZqO3Fq8IPhjoHg3A7sL5xzkuAV6QbE1zWWFZRIs7ea8xtWLITOj89DZr_KuQ5XR8Zx7En5YJ1zzPVyVGQZgezzhcjko0gbwK2dtIhpE0TBeduu3YkaJNprMiiWtpI8NlLCew5r5i0gxk6OAL4BjzSKs_9OxmEppdnlUeENQgDnffo',
      alt: 'Heaved concrete sidewalk slabs marked with municipal chalk',
      slaText: 'Scheduled dispatch',
      slaIcon: 'schedule',
      slaColor: 'cyan',
      crew: 'Arbor/Paving Team'
    }
  ]

  return (
    <section id="public-feed" className="mb-section">
      <div className="mb-container">
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="mb-section-sub">Live Community Activity</span>
            <h2 className="mb-section-title">Recent Civic Remediation Feed</h2>
          </div>

          <a
            href="#public-feed"
            className="mb-nav-link"
            style={{ color: 'var(--mb-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={(e) => {
              e.preventDefault()
              alert('Showing all 2,410 active & resolved civic remediation records.')
            }}
          >
            <span>View all 2,410 reports</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </a>
        </div>

        {/* 3 Bento Feed Cards */}
        <div className="mb-feed-grid">
          {feedItems.map((item) => (
            <div key={item.id} className="mb-feed-card">
              {/* Photo Box */}
              <div className="mb-feed-img-box">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="mb-feed-img"
                  loading="lazy"
                />
                <span className={`mb-feed-status-badge ${item.statusClass}`}>
                  {item.status}
                </span>
              </div>

              {/* Meta row */}
              <div className="mb-feed-meta-row">
                <span>{item.location}</span>
                <span>{item.timeAgo}</span>
              </div>

              {/* Title & Snippet */}
              <h3 className="mb-feed-title">{item.title}</h3>
              <p className="mb-feed-snippet">{item.snippet}</p>

              {/* Footer SLA & Crew */}
              <div className="mb-feed-footer-row">
                <span className={`mb-feed-sla-pill ${item.slaColor}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    {item.slaIcon}
                  </span>
                  <span>{item.slaText}</span>
                </span>
                <span className="mb-feed-crew-id">{item.crew}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
