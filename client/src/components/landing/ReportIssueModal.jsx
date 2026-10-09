import { useState } from 'react'

/**
 * Report Issue Modal Component
 * Interactive modal allowing citizens to submit incident telemetry,
 * simulate edge AI vision classification, and pinpoint geographic coordinates.
 */
export default function ReportIssueModal({ isOpen, onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'pothole',
    location: '',
    description: '',
    hasPhoto: false
  })

  const [aiConfidence, setAiConfidence] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handleCategoryChange = (e) => {
    const cat = e.target.value
    setFormData((prev) => ({ ...prev, category: cat }))
    // Dynamic simulated AI confidence based on selection
    if (formData.hasPhoto) {
      setAiConfidence(95.4 + Math.floor(Math.random() * 40) / 10)
    }
  }

  const handleSimulatePhotoUpload = () => {
    setFormData((prev) => ({ ...prev, hasPhoto: true }))
    setAiConfidence(96.8)
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            location: `GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° W (High Precision)`
          }))
        },
        () => {
          setFormData((prev) => ({
            ...prev,
            location: 'Downtown District • Zone 04 (GIS Triangulated)'
          }))
        }
      )
    } else {
      setFormData((prev) => ({
        ...prev,
        location: 'Downtown District • Zone 04 (GIS Triangulated)'
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please specify an incident title.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage('Incident MB-' + Math.floor(1000 + Math.random() * 9000) + ' dispatched to municipal triage queue!')
      setTimeout(() => {
        setSuccessMessage('')
        onClose()
        if (onSubmitted) onSubmitted(formData)
      }, 1600)
    }, 700)
  }

  return (
    <div className="mb-modal-backdrop" onClick={onClose}>
      <div className="mb-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="mb-modal-header">
          <div className="mb-modal-title">
            <span className="material-symbols-outlined" style={{ color: 'var(--mb-primary)' }}>
              add_alert
            </span>
            <span>Report Civic Infrastructure Incident</span>
          </div>

          <button
            type="button"
            className="mb-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {successMessage ? (
          <div className="mb-ai-preview-card" style={{ borderColor: 'var(--mb-tertiary)', background: 'rgba(69, 223, 164, 0.15)' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--mb-tertiary)', fontSize: '28px' }}>
              check_circle
            </span>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>Report Successfully Submitted</div>
              <div style={{ fontSize: '13px', color: 'var(--mb-tertiary)' }}>{successMessage}</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title */}
            <div className="mb-modal-form-group">
              <label className="mb-modal-label">Incident Title</label>
              <input
                type="text"
                className="mb-modal-input"
                placeholder="e.g. Deep asphalt crater impacting bike lane"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-modal-form-group">
              <label className="mb-modal-label">Hazard Category</label>
              <select
                className="mb-modal-select"
                value={formData.category}
                onChange={handleCategoryChange}
              >
                <option value="pothole">Road Defect / Pothole</option>
                <option value="water">Storm Drain & Water Flooding</option>
                <option value="lighting">Streetlight & Electrical Fault</option>
                <option value="guardrail">Damaged Guardrail / Barrier</option>
                <option value="sidewalk">Sidewalk & Pedestrian Hazard</option>
              </select>
            </div>

            {/* Photo Upload & AI Classifier Preview */}
            <div className="mb-modal-form-group">
              <label className="mb-modal-label">Photographic Telemetry (AI Classifier)</label>
              {formData.hasPhoto ? (
                <div className="mb-ai-preview-card">
                  <span className="material-symbols-outlined" style={{ color: 'var(--mb-tertiary)' }}>
                    psychology
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--mb-text-primary)' }}>
                      Edge CNN Analyzed
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--mb-tertiary)' }}>
                      Confidence Score: {aiConfidence}% • Matches {formData.category.toUpperCase()} vector
                    </div>
                  </div>
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', color: 'var(--mb-text-dim)', cursor: 'pointer' }}
                    onClick={() => { setFormData((p) => ({ ...p, hasPhoto: false })); setAiConfidence(null); }}
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="mb-upload-dropzone" onClick={handleSimulatePhotoUpload}>
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--mb-primary)' }}>
                    add_a_photo
                  </span>
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--mb-text-primary)' }}>
                      Click to capture or attach image
                    </span>
                    <p style={{ fontSize: '12px', color: 'var(--mb-text-dim)', margin: '4px 0 0' }}>
                      Automated EXIF GPS extraction & CNN severity estimation
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Location Geotagging */}
            <div className="mb-modal-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="mb-modal-label">Incident Geolocation</label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--mb-secondary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>my_location</span>
                  Detect Sub-Meter GPS
                </button>
              </div>
              <input
                type="text"
                className="mb-modal-input"
                placeholder="e.g. 5th Avenue & Pine Street or GPS coordinates"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="mb-modal-form-group">
              <label className="mb-modal-label">Observations & Severity Remarks</label>
              <textarea
                rows={3}
                className="mb-modal-textarea"
                placeholder="Describe current traffic impacts, safety hazards, or visible damage..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="mb-btn-primary"
              style={{ justifyContent: 'center', padding: '12px', fontSize: '15px', marginTop: '6px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Registering Telemetry...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  <span>Dispatch Incident Report</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
