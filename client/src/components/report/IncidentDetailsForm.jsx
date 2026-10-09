/**
 * Incident Details & Attributes Form Component
 * Allows citizens to confirm or override category, choose severity,
 * customize narrative description with live character count, and review target jurisdiction.
 */
export default function IncidentDetailsForm({
  formData,
  onChange,
  onSeverityChange
}) {
  const categories = [
    { value: 'pothole', label: 'Pothole / Road Damage' },
    { value: 'accident', label: 'Accident / Collision Debris' },
    { value: 'electrical', label: 'Electrical / Exposed Wiring' },
    { value: 'transformer', label: 'Transformer Issue' },
    { value: 'streetlight', label: 'Streetlight Outage' },
    { value: 'drainage', label: 'Drainage / Waterlogging' },
    { value: 'obstruction', label: 'Road Obstruction / Fallen Limb' },
    { value: 'other', label: 'Other Infrastructure Anomaly' }
  ]

  const charCount = (formData.description || '').length
  const isOverLimit = charCount > 500

  return (
    <div className="citizen-form-card">
      {/* Header */}
      <div className="citizen-form-header">
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--mb-text-primary)' }}>
          Classification & Attributes
        </h2>
        <span className="citizen-form-tag">Citizen Editable</span>
      </div>

      {/* Grid: Category & Severity */}
      <div className="form-group-grid">
        {/* Category Selector */}
        <div className="form-field-unit">
          <label className="form-field-label" htmlFor="catSelect">
            <span>Confirmed Issue Category</span>
            <span className="field-sub-badge">AI Suggested</span>
          </label>
          <div style={{ position: 'relative' }}>
            <select
              id="catSelect"
              className="form-select-control"
              value={formData.category}
              onChange={(e) => onChange('category', e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Severity Segment */}
        <div className="form-field-unit">
          <label className="form-field-label">
            <span>Observed Severity Impact</span>
            <span className={`field-sub-badge ${formData.severity === 'high' ? 'error' : ''}`}>
              {formData.severity === 'high' ? 'High Priority' : `${formData.severity.toUpperCase()} Priority`}
            </span>
          </label>
          <div className="severity-segment-box">
            <button
              type="button"
              className={`severity-btn ${formData.severity === 'low' ? 'active low' : ''}`}
              onClick={() => onSeverityChange('low')}
            >
              Low
            </button>
            <button
              type="button"
              className={`severity-btn ${formData.severity === 'medium' ? 'active medium' : ''}`}
              onClick={() => onSeverityChange('medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`severity-btn ${formData.severity === 'high' ? 'active high' : ''}`}
              onClick={() => onSeverityChange('high')}
            >
              High (Disruptive)
            </button>
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div className="form-field-unit">
        <label className="form-field-label" htmlFor="titleInput">
          Incident Summary Title
        </label>
        <input
          id="titleInput"
          type="text"
          className="form-input-control"
          placeholder="e.g. Deep pothole causing bike lane disruption on North Ave"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      {/* Narrative Description with Live Counter */}
      <div className="form-field-unit">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label className="form-field-label" htmlFor="descInput">
            Detailed Narrative
          </label>
          <span className={`char-counter-text ${isOverLimit ? 'field-sub-badge error' : ''}`}>
            {charCount} / 500 characters
          </span>
        </div>
        <textarea
          id="descInput"
          rows={3}
          className="form-textarea-control"
          placeholder="Describe visible damage, safety hazards, or traffic disruptions..."
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      {/* Jurisdiction Department Badge */}
      <div className="jurisdiction-chip">
        <div className="jurisdiction-left">
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--mb-primary)' }}>
            corporate_fare
          </span>
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--mb-text-dim)', margin: 0 }}>
              Target Jurisdiction
            </p>
            <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--mb-text-primary)', margin: '2px 0 0' }}>
              Dept of Public Works - Roadways & Maintenance
            </p>
          </div>
        </div>

        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(93, 230, 255, 0.12)',
          color: 'var(--mb-secondary)',
          fontSize: '11.5px',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '9999px'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            auto_fix_high
          </span>
          Auto-Targeted
        </span>
      </div>
    </div>
  )
}
