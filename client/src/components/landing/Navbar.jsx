import { useState, useEffect } from 'react'
import { FaCreativeCommonsSamplingPlus } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

/**
 * Top Navigation Bar Component
 * Dynamically displays options based on authentication state:
 * - When NOT logged in: Shows ONLY brand logo and Login / Signup buttons.
 * - When authenticated: Shows ALL navigation links, report actions, and user profile with logout.
 */
export default function Navbar({
  onOpenReportModal,
  onOpenReportIssue,
  onNavigateSection,
  onOpenUserManagement,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('explore-map')
  const [isScrolled, setIsScrolled] = useState(false)

  const { currentUser, isAuthenticated, logout } = useAuth()

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
    { id: 'report-issue', label: 'Report Issue', action: onOpenReportIssue || onOpenReportModal },
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

  const handleLogout = () => {
    logout()
    setUserDropdownOpen(false)
    setMobileMenuOpen(false)
    if (onNavigateSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className={`mb-navbar ${isScrolled ? 'floating' : ''}`}>
      <div className="mb-container mb-navbar-inner">
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#"
            className="mb-brand"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <FaCreativeCommonsSamplingPlus size={22} style={{ color: 'var(--mb-primary)' }} />
            <span>MakeBetter</span>
          </a>
        </div>

        {/* 1. When Authenticated: Show Full Navigation Links */}
        {isAuthenticated && (
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
        )}

        {/* 2. Header Right Actions */}
        <div className="mb-nav-actions">
          {isAuthenticated ? (
            <>
              {/* Report Issue Action Button */}
              <button
                type="button"
                className="mb-btn-primary"
                onClick={onOpenReportIssue || onOpenReportModal}
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

              {/* User Profile Avatar with Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="mb-avatar-btn"
                  title={currentUser?.name || 'Citizen Profile'}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKPipQ8OWuXk2X59ADZiLAIt5_ktvqQAVQNgOFoamHltBuy4oSPTIX13UhCX6-Jtb2jUjpwBcsW8OaWTvBMoKZbV-Ito4WryVz0BbVS4PRjoHH5KueBZuO5lg1ebq2yoXrh4CaVYxYTDhqfq0WZrmLTNb5dvr6e8bKKRVsmF7fSXmmkY4ThBP_WNjxTDAE7jDPq_R2pARLavrBHD03G9p9TTZdLscdGFxAmeKNyXWgHXexesXchtv"
                    alt="Citizen Avatar"
                    className="mb-avatar-img"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      background: 'rgba(22, 24, 33, 0.95)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      minWidth: '200px',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      zIndex: 200
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
                      <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--mb-text-primary)' }}>
                        {currentUser?.name || 'Citizen'}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: 'var(--mb-text-dim)' }}>
                        {currentUser?.email || ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--mb-error, #ffb4ab)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        padding: '6px 0',
                        fontWeight: 600
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* When NOT Logged In: Show ONLY Login / Signup Buttons */
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="mb-nav-link"
                onClick={() => onOpenAuth && onOpenAuth('login')}
                style={{ fontWeight: 600, color: 'var(--mb-text-primary)' }}
              >
                Sign In
              </button>

              <button
                type="button"
                className="mb-btn-primary"
                onClick={() => onOpenAuth && onOpenAuth('signup')}
              >
                <span>Sign Up</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  arrow_forward
                </span>
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          {isAuthenticated && (
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
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer (Authenticated only) */}
      {isAuthenticated && mobileMenuOpen && (
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
          <button
            type="button"
            onClick={handleLogout}
            className="mb-nav-link"
            style={{ textAlign: 'left', width: '100%', color: 'var(--mb-error, #ffb4ab)' }}
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}
