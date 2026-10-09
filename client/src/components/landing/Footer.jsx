/**
 * Footer Component
 * Brand attribution, municipal compliance, telemetry links, and legal notices.
 */
import { FaCreativeCommonsSamplingPlus } from "react-icons/fa";
export default function Footer({ onNavigateSection }) {
  return (
    <footer className="mb-footer">
      <div className="mb-container">
        {/* Top Footer Content */}
        <div className="mb-footer-top">
          {/* Brand & Mission Statement */}
          <div className="mb-footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCreativeCommonsSamplingPlus size={22} />
              <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--mb-text-primary)' }}>
                MakeBetter
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--mb-text-dim)' }}>
              Decentralized municipal command & telemetry. Accelerating civic accountability
              and infrastructure remediation through intelligent edge verification.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="mb-footer-links-col">
            <button
              type="button"
              className="mb-footer-link"
              onClick={() => onNavigateSection && onNavigateSection('geospatial-radar')}
            >
              Map Telemetry
            </button>
            <button
              type="button"
              className="mb-footer-link"
              onClick={() => onNavigateSection && onNavigateSection('public-feed')}
            >
              Civic Stream
            </button>
            <button
              type="button"
              className="mb-footer-link"
              onClick={() => onNavigateSection && onNavigateSection('how-it-works')}
            >
              Citizen SLA
            </button>
            <button
              type="button"
              className="mb-footer-link"
              onClick={() => onNavigateSection && onNavigateSection('capabilities')}
            >
              Municipal Gateway
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mb-footer-bottom">
          <p>© 2025 MakeBetter Civic Systems Inc. All civic disclaimers apply under Municipal Telemetry Code.</p>

          <div className="mb-footer-sublinks">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('MakeBetter adheres to municipal open-data & privacy safeguards.'); }}>
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Civic Telemetry Usage.'); }}>
              Civic Terms
            </a>
            <a href="#api" onClick={(e) => { e.preventDefault(); alert('Public Telemetry API v2.4 endpoint documentation.'); }}>
              Telemetry API
            </a>
          </div>
        </div>

        {/* Developer Credit */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: '12px',
          paddingTop: '14px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--mb-text-dim)',
          letterSpacing: '0.03em'
        }}>
          Developed by{' '}
          <span style={{ color: 'var(--mb-accent, #00e5ff)', fontWeight: 600 }}>Arikalp</span>
        </div>
      </div>
    </footer>
  )
}
