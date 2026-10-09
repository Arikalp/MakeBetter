/**
 * Civic Profile Disclosure & Privacy Toggle Card Component
 * Allows citizen to choose between Anonymous and Verified Citizen submission.
 */
export default function PrivacyDisclosureCard({ isAnonymous, onToggleAnonymous }) {
  return (
    <div className="privacy-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--mb-text-primary)' }}>
          Civic Profile Disclosure
        </span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--mb-outline)' }}>
          shield
        </span>
      </div>

      {/* Segmented Toggle Buttons */}
      <div className="privacy-toggle-grid">
        <button
          type="button"
          className={`privacy-toggle-btn ${isAnonymous ? 'active anon' : ''}`}
          onClick={() => onToggleAnonymous(true)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            visibility_off
          </span>
          <span>Anonymous</span>
        </button>

        <button
          type="button"
          className={`privacy-toggle-btn ${!isAnonymous ? 'active' : ''}`}
          onClick={() => onToggleAnonymous(false)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            verified_user
          </span>
          <span>Verified Citizen</span>
        </button>
      </div>

      <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--mb-text-muted)', margin: 0 }}>
        {isAnonymous
          ? 'Anonymous reports are scrubbed of citizen identity tokens. Remediation updates will appear on the public radar without personal alerts.'
          : 'Verified accounts gain real-time SMS remediation alerts and earn civic contribution badges. Your address is masked to municipal dispatch crews.'}
      </p>
    </div>
  )
}
