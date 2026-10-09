import { useState } from 'react'
import Navbar from '../landing/Navbar'
import Footer from '../landing/Footer'
import WizardStepBar from './WizardStepBar'
import AiDetectionCard from './AiDetectionCard'
import IncidentDetailsForm from './IncidentDetailsForm'
import LocationReviewCard from './LocationReviewCard'
import PrivacyDisclosureCard from './PrivacyDisclosureCard'
import TelemetrySnapshotCard from './TelemetrySnapshotCard'
import './ReportWizard.css'

/**
 * Report Civic Issue Multi-Step Wizard Page Component
 * Faithfully implements the design and features from report_civic_issue_multi_step_wizard
 * while honoring NOTE.md:
 * - Highly modular, component-based architecture
 * - Easy to read, self-explanatory code
 * - Real-time state management for category, severity, address, narrative, and privacy
 */
export default function ReportIssuePage({ onBackToLanding, onOpenUserManagement }) {
  // Wizard current active step (Default Step 4: AI Triage)
  const [currentStep, setCurrentStep] = useState(4)

  // Incident form state
  const [formData, setFormData] = useState({
    category: 'pothole',
    severity: 'high',
    title: 'Deep pothole causing bike lane disruption on North Ave',
    description:
      'Approximately 14cm deep crater situated directly on the painted cycling lane heading eastbound. Multiple cyclists forced into vehicle lane. Water collecting inside crevice.',
    address: 'North Ave & 14th St Intersection, Ward 4',
    coordinates: '40.7128° N, 74.0060° W',
    isAnonymous: false
  })

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form field updater helper
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle GPS detection
  const handleSyncGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° W`
          setFormData((prev) => ({
            ...prev,
            coordinates: coords,
            address: 'Triangulated Municipal Coordinate (High Precision)'
          }))
        },
        () => {
          setFormData((prev) => ({
            ...prev,
            coordinates: '40.7128° N, 74.0060° W',
            address: 'North Ave & 14th St Intersection, Ward 4'
          }))
        }
      )
    }
  }

  // Handle final submission
  const handleSubmitReport = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      setTimeout(() => {
        alert('Report #MB-8291 has been verified and dispatched to Ward 4 Public Works!')
        if (onBackToLanding) onBackToLanding()
      }, 1500)
    }, 1200)
  }

  return (
    <div className="report-wizard-wrapper">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenReportModal={() => {}}
        onNavigateSection={() => onBackToLanding && onBackToLanding()}
        onOpenUserManagement={onOpenUserManagement}
        onLogout={() => onBackToLanding && onBackToLanding()}
      />

      {/* 2. Main Wizard Page Body */}
      <main className="report-wizard-content">
        <div className="mb-container">
          {/* Top 5-Step Progress Indicator Bar */}
          <WizardStepBar
            currentStep={currentStep}
            onSelectStep={(stepNum) => setCurrentStep(stepNum)}
          />

          {/* Main 2-Column Split Workspace */}
          <div className="report-grid-layout">
            {/* LEFT COLUMN: Section Header, AI Image Detection Preview & Incident Form */}
            <div className="report-left-col">
              {/* Section Header */}
              <div className="report-header-block">
                <div className="report-badge-strip">
                  <span className="report-badge-pill">
                    Autonomous Neural Review
                  </span>
                  <span className="report-sla-pill">
                    <span className="mb-pulse-dot" style={{ position: 'static', width: 6, height: 6 }} />
                    94.8% SLA Confidence
                  </span>
                </div>

                <h1 className="report-page-title">
                  AI Classification & Incident Review
                </h1>

                <p className="report-page-desc">
                  MakeBetter's edge neural model has reviewed uploaded telemetry. Validate the inferred
                  categorization below or adjust according to observed conditions.
                </p>
              </div>

              {/* AI Image Detection Preview Card */}
              <AiDetectionCard
                confidence={94.8}
                modelName="ResNet-RoadWatch v4.2"
                detectedPattern="Severe Asphalt Depletion"
                depthEst="~14cm"
              />

              {/* Editable Citizen Form Details */}
              <IncidentDetailsForm
                formData={formData}
                onChange={handleFieldChange}
                onSeverityChange={(level) => handleFieldChange('severity', level)}
              />
            </div>

            {/* RIGHT COLUMN: Map Geotag, Privacy Toggle, Telemetry Snapshot & Action Buttons */}
            <div className="report-right-col">
              {/* Location Review Map Viewport */}
              <LocationReviewCard
                address={formData.address}
                coordinates={formData.coordinates}
                onAddressChange={(val) => handleFieldChange('address', val)}
                onSyncGps={handleSyncGps}
              />

              {/* Civic Profile Disclosure (Privacy Mode) */}
              <PrivacyDisclosureCard
                isAnonymous={formData.isAnonymous}
                onToggleAnonymous={(isAnon) => handleFieldChange('isAnonymous', isAnon)}
              />

              {/* Report Telemetry Technical Snapshot */}
              <TelemetrySnapshotCard
                protocol="AES-256 CivicStream"
                classification={
                  formData.severity === 'high'
                    ? 'High / Disruption-Level-2'
                    : `${formData.severity.toUpperCase()} Priority Stream`
                }
                expectedResponse="< 24h Triage Window"
              />

              {/* Wizard Action CTA Buttons */}
              <div className="wizard-actions-group">
                <button
                  type="button"
                  className="wizard-btn-back"
                  onClick={onBackToLanding}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    arrow_back
                  </span>
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  className={`wizard-btn-submit ${submitSuccess ? 'success' : ''}`}
                  onClick={handleSubmitReport}
                  disabled={isSubmitting || submitSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>
                        autorenew
                      </span>
                      <span>Transmitting Telemetry...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        check_circle
                      </span>
                      <span>Report #MB-8291 Logged</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Civic Report</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        send
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer onNavigateSection={() => onBackToLanding && onBackToLanding()} />
    </div>
  )
}
