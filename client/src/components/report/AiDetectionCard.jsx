/**
 * AI Image Detection & Telemetry Preview Card
 * Shows uploaded photographic proof, edge model bounding box,
 * CNN confidence rating (94.8%), latency specs, and municipal advisory guarantee.
 */
export default function AiDetectionCard({
  imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc4euW3wD55zyefpEcG8FRb2jn7pmeq34i-JGQDiWntyQcxxU3OkUr0gemmXlkw5gENnSeo-rlnVkzH435AohzibqJONZRaOXCC2UWUYCFao59Wij7OMDuHb8czNnjFFfF2rKOon-2lLpvHjPx6-LkN2_2XkBKOJA_PjipEAs53OQm8vx7EabBB87qZiAZB4-u6ytzkWhW3DLtR5TxsfqJz4C6H9vG3A_7qsS6ijr5LKXUWcL-LR_k',
  confidence = 94.8,
  modelName = 'ResNet-RoadWatch v4.2',
  detectedPattern = 'Severe Asphalt Depletion',
  depthEst = '~14cm'
}) {
  return (
    <div className="ai-preview-card">
      {/* Visual Image Viewport with Bounding Box Overlay */}
      <div className="ai-image-viewport">
        <img
          src={imageUrl}
          alt="Close-up municipal photograph of asphalt roadway with severe pothole"
          className="ai-detected-img"
        />

        {/* Bounding Box Simulation */}
        <div className="ai-bounding-box">
          <div className="ai-bbox-top">
            <span className="ai-tag-roi">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
                crop_free
              </span>
              ROI #01
            </span>
            <span className="ai-tag-conf">
              Confidence {confidence}%
            </span>
          </div>

          <div className="ai-bbox-bottom">
            <span className="ai-tag-pattern">
              Detected Pattern: {detectedPattern}
            </span>
            <span className="ai-tag-depth">
              Est. Depth {depthEst}
            </span>
          </div>
        </div>

        {/* Visual Telemetry Stamp */}
        <div className="ai-verified-stamp">
          <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--mb-secondary)' }}>
            verified
          </span>
          <span>Visual Telemetry Verified</span>
        </div>
      </div>

      {/* Inference Telemetry & Score Breakdown */}
      <div className="ai-telemetry-stats">
        <div className="ai-score-row">
          <div className="ai-model-info">
            <div className="ai-icon-chip">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                psychology
              </span>
            </div>
            <div>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--mb-text-dim)', letterSpacing: '0.06em', margin: 0 }}>
                AI Model Suggestion
              </p>
              <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--mb-text-primary)', margin: '2px 0 0' }}>
                Pothole / Road Damage
              </p>
            </div>
          </div>

          <div>
            <div className="ai-score-number">{confidence}%</div>
            <p style={{ fontSize: '11px', color: 'var(--mb-text-dim)', fontFamily: 'ui-monospace, monospace', margin: '2px 0 0', textAlign: 'right' }}>
              Vector Match Score
            </p>
          </div>
        </div>

        {/* Confidence Gradient Track */}
        <div>
          <div className="ai-confidence-track">
            <div className="ai-confidence-fill" style={{ width: `${confidence}%` }} />
          </div>
          <div className="ai-model-meta-row" style={{ marginTop: '6px' }}>
            <span>Model: {modelName}</span>
            <span>Latency: 182ms · Auto-Routed</span>
          </div>
        </div>

        {/* Advisory Guarantee Banner */}
        <div className="ai-advisory-alert">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--mb-secondary)', marginTop: '2px' }}>
            info
          </span>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--mb-text-primary)' }}>Advisory Guarantee:</strong> AI predictions are advisory suggestions. Citizens and dispatchers can confirm or override the classification before dispatching public works crews.
          </p>
        </div>
      </div>
    </div>
  )
}
