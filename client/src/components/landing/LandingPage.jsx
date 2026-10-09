import { useState } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CapabilitiesSection from './CapabilitiesSection'
import HowItWorksSection from './HowItWorksSection'
import RadarMapSection from './RadarMapSection'
import PublicFeedSection from './PublicFeedSection'
import CtaBanner from './CtaBanner'
import Footer from './Footer'
import ReportIssueModal from './ReportIssueModal'
import AuthModal from '../auth/AuthModal'
import { useAuth } from '../../context/AuthContext'
import './LandingPage.css'

/**
 * Main Landing Page Component for MakeBetter Civic Infrastructure Platform
 * Integrates authentication triggers, conditional navbar options,
 * and automatic transition to the Report Issue page upon successful login.
 */
export default function LandingPage({ onOpenReportIssue, onOpenUserManagement }) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  const { isAuthenticated } = useAuth()

  // Smooth scroll helper to section
  const handleNavigateSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Explore map shortcut
  const handleExploreMap = () => {
    handleNavigateSection('geospatial-radar')
  }

  // Open Auth Modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  // When user clicks "Report Issue" anywhere on the landing page:
  // - If authenticated: push directly to report issue page
  // - If not logged in: open Auth Modal, and push to report page right after login!
  const handleTriggerReport = () => {
    if (isAuthenticated) {
      if (onOpenReportIssue) onOpenReportIssue()
    } else {
      handleOpenAuth('signup')
    }
  }

  // On successful login or signup, push user to report issue page
  const handleAuthSuccess = (user) => {
    setAuthModalOpen(false)
    if (onOpenReportIssue) {
      onOpenReportIssue(user)
    }
  }

  return (
    <div className="landing-wrapper">
      {/* 1. Sticky / Floating Navigation Bar */}
      <Navbar
        onOpenReportModal={handleTriggerReport}
        onOpenReportIssue={handleTriggerReport}
        onNavigateSection={handleNavigateSection}
        onOpenUserManagement={onOpenUserManagement}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Landing Sections */}
      <main className="landing-main">
        {/* 2. Hero Section with Live Telemetry & Floating Incident Card */}
        <HeroSection
          onOpenReportModal={handleTriggerReport}
          onExploreMap={handleExploreMap}
        />

        {/* 3. Platform Capabilities & Autonomous AI Stack */}
        <CapabilitiesSection />

        {/* 4. 4-Step How It Works Cycle */}
        <HowItWorksSection />

        {/* 5. Geospatial Incident Radar Preview with Dynamic Interactive Pins */}
        <RadarMapSection />

        {/* 6. Public Community Remediation Feed Highlights */}
        <PublicFeedSection />

        {/* 7. Final Call to Action Impact Banner */}
        <CtaBanner
          onOpenReportModal={handleTriggerReport}
          onExploreMap={handleExploreMap}
        />
      </main>

      {/* 8. Municipal Footer & Legal Information */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* 9. Interactive Report Civic Incident Quick Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitted={(report) => {
          console.log('New civic report registered:', report)
        }}
      />

      {/* 10. Authentication Modal (Login & Signup) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  )
}
