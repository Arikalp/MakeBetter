/**
 * How It Works Section Component
 * 4-Step civic lifecycle timeline from photo capture to municipal sign-off.
 */
export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      badgeClass: 'one',
      icon: 'photo_camera',
      title: 'Capture',
      description: 'Citizens snap a photo of damaged infrastructure via smartphone or quick web upload.',
      tag: 'EXIF & GPS Extracted'
    },
    {
      step: '02',
      badgeClass: 'two',
      icon: 'model_training',
      title: 'Classify',
      description: 'Edge vision models instantly assign categorization, risk score, and target public works unit.',
      tag: 'Zero-lag Dispatch Route'
    },
    {
      step: '03',
      badgeClass: 'three',
      icon: 'engineering',
      title: 'Track',
      description: 'Municipal dispatchers approve assignment and deploy field crews with SLA countdown timers.',
      tag: 'Real-time Public Updates'
    },
    {
      step: '04',
      badgeClass: 'four',
      icon: 'task_alt',
      title: 'Resolve',
      description: 'Crews upload verification proof. Community confirms completion, closing the feedback loop.',
      tag: 'Closed Audit Record'
    }
  ]

  return (
    <section id="how-it-works" className="mb-section">
      <div className="mb-container">
        <div className="mb-workflow-panel">
          {/* Header */}
          <div className="mb-workflow-header">
            <div>
              <span className="mb-section-sub cyan">Step-by-Step Cycle</span>
              <h2 className="mb-section-title">How Civic Issues Get Resolved</h2>
            </div>
            <p className="mb-workflow-desc">
              A seamless transition from citizen alert to municipal heavy machinery on the ground.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="mb-steps-grid">
            {steps.map((st) => (
              <div key={st.step} className="mb-step-card">
                <div className="mb-step-top">
                  <span className={`mb-step-badge ${st.badgeClass}`}>{st.step}</span>
                  <span className="material-symbols-outlined mb-step-icon">
                    {st.icon}
                  </span>
                </div>

                <h3 className="mb-step-title">{st.title}</h3>
                <p className="mb-step-text">{st.description}</p>
                <div className={`mb-step-tag ${st.badgeClass}`}>{st.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
