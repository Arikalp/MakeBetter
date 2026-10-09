/**
 * Multi-Step Indicator Wizard Bar Component
 * Displays the 5 phases of the civic reporting lifecycle:
 * Step 1: Upload Photo
 * Step 2: Details
 * Step 3: Geotag Map
 * Step 4: AI Triage (Current Active)
 * Step 5: Review & Submit
 */
export default function WizardStepBar({ currentStep = 4, onSelectStep }) {
  const steps = [
    { number: 1, label: 'Upload Photo' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Geotag Map' },
    { number: 4, label: 'AI Triage' },
    { number: 5, label: 'Review & Submit' }
  ]

  return (
    <section className="wizard-stepper-panel">
      <div className="wizard-stepper-grid">
        {steps.map((st) => {
          const isCompleted = st.number < currentStep
          const isActive = st.number === currentStep
          const isUpcoming = st.number > currentStep

          let statusClass = 'upcoming'
          if (isCompleted) statusClass = 'completed'
          if (isActive) statusClass = 'active'

          return (
            <div
              key={st.number}
              className={`wizard-step-item ${statusClass}`}
              onClick={() => onSelectStep && onSelectStep(st.number)}
              title={`Jump to Step ${st.number}: ${st.label}`}
            >
              {/* Circle Status Badge */}
              <div className={`wizard-step-circle ${statusClass}`}>
                {isCompleted ? (
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    check
                  </span>
                ) : (
                  <span>{st.number}</span>
                )}
              </div>

              {/* Step Meta and Title */}
              <div style={{ minWidth: 0 }}>
                <p className={`wizard-step-sub ${statusClass}`}>
                  {isActive
                    ? `Step 0${st.number} · Active`
                    : `Step 0${st.number}`}
                </p>
                <p className="wizard-step-title">{st.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
