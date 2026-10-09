/**
 * Telemetry Snapshot Metrics Card Component
 * Summarizes the technical telemetry protocol, classification level,
 * and dispatch SLA expectations before submission.
 */
export default function TelemetrySnapshotCard({
  protocol = 'AES-256 CivicStream',
  classification = 'High / Disruption-Level-2',
  expectedResponse = '< 24h Triage Window'
}) {
  return (
    <div className="snapshot-card">
      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mb-text-dim)', fontWeight: 600 }}>
        Report Telemetry Snapshot
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className="snapshot-row">
          <span style={{ color: 'var(--mb-text-muted)' }}>Telemetry Protocol</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--mb-text-primary)' }}>
            {protocol}
          </span>
        </div>

        <div className="snapshot-row">
          <span style={{ color: 'var(--mb-text-muted)' }}>Routing Classification</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--mb-primary)', fontWeight: 600 }}>
            {classification}
          </span>
        </div>

        <div className="snapshot-row">
          <span style={{ color: 'var(--mb-text-muted)' }}>Expected Field Response</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--mb-tertiary)', fontWeight: 600 }}>
            {expectedResponse}
          </span>
        </div>
      </div>
    </div>
  )
}
