import { useState, useEffect } from 'react'
import { FaCreativeCommonsSamplingPlus } from "react-icons/fa";

/**
 * Top Navigation Bar Component
 * Displays brand logo, navigation links, issue reporting button,
 * notification indicator, and mobile menu trigger.
 * Includes a scroll-responsive floating pill animation after 40px.
 */
export default function Navbar({ onOpenReportModal, onNavigateSection, onOpenUserManagement }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('explore-map')
  const [isScrolled, setIsScrolled] = useState(false)

  // Track window scroll position to trigger floating pill animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize state on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'explore-map', label: 'Explore Map', sectionId: 'geospatial-radar' },
    { id: 'public-feed', label: 'Public Feed', sectionId: 'public-feed' },
    { id: 'how-it-works', label: 'How It Works', sectionId: 'how-it-works' },
    { id: 'capabilities', label: 'Capabilities', sectionId: 'capabilities' },
    { id: 'admin-portal', label: 'User Admin', action: onOpenUserManagement }
  ]

  const handleNavClick = (item) => {
    setActiveTab(item.id)
    setMobileMenuOpen(false)
    if (item.action) {
      item.action()
    } else if (item.sectionId && onNavigateSection) {
      onNavigateSection(item.sectionId)
    }
  }

  return (
    <header className={`mb-navbar ${isScrolled ? 'floating' : ''}`}>
      <div className="mb-container mb-navbar-inner">
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <a href="#" className="mb-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <FaCreativeCommonsSamplingPlus size={22} />
            <span>MakeBetter</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="mb-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`mb-nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="mb-nav-actions">
          {/* Quick Report CTA */}
          <button
            type="button"
            className="mb-btn-primary"
            onClick={onOpenReportModal}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            <span>Report Issue</span>
          </button>

          {/* Telemetry Notifications Bell */}
          <button
            type="button"
            className="mb-btn-icon"
            title="Telemetry Updates"
            onClick={() => alert('Telemetry Feed: 3 new verified street repairs in your sector.')}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="mb-pulse-dot" />
          </button>

          {/* User Profile Avatar */}
          <button
            type="button"
            className="mb-avatar-btn"
            title="Citizen Profile"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKPipQ8OWuXk2X59ADZiLAIt5_ktvqQAVQNgOFoamHltBuy4oSPTIX13UhCX6-Jtb2jUjpwBcsW8OaWTvBMoKZbV-Ito4WryVz0BbVS4PRjoHH5KueBZuO5lg1ebq2yoXrh4CaVYxYTDhqfq0WZrmLTNb5dvr6e8bKKRVsmF7fSXmmkY4ThBP_WNjxTDAE7jDPq_R2pARLavrBHD03G9p9TTZdLscdGFxAmeKNyXWgHXexesXchtv"
              alt="Citizen Avatar"
              className="mb-avatar-img"
            />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="mb-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mb-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`mb-nav-link ${activeTab === item.id ? 'active' : ''}`}
              style={{ textAlign: 'left', width: '100%' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
