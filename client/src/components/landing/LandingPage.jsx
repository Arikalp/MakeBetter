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
import './LandingPage.css'

/**
 * Main Landing Page Component for MakeBetter Civic Infrastructure Platform
 * Clean, modular component architecture adhering strictly to NOTE.md principles:
 * - Highly readable, self-documenting code
 * - Component-based separation of concerns
 * - Sleek, modern dark-mode aesthetics with live interactions
 */
export default function LandingPage({ onOpenUserManagement }) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

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

  return (
    <div className="landing-wrapper">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenUserManagement={onOpenUserManagement}
      />

      {/* Main Landing Sections */}
      <main className="landing-main">
        {/* 2. Hero Section with Live Telemetry & Floating Incident Card */}
        <HeroSection
          onOpenReportModal={() => setIsReportModalOpen(true)}
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
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onExploreMap={handleExploreMap}
        />
      </main>

      {/* 8. Municipal Footer & Legal Information */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* 9. Interactive Report Civic Incident Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitted={(report) => {
          console.log('New civic report registered:', report)
        }}
      />
    </div>
  )
}
