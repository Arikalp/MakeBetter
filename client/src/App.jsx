import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './components/landing/LandingPage'
import ReportIssuePage from './components/report/ReportIssuePage'
import DataEntry from './components/DataEntry'
import './App.css'

/**
 * Main application content with current view switcher
 */
function MainApp() {
  const [currentView, setCurrentView] = useState('landing')

  // 1. Report Issue Multi-Step Wizard View
  if (currentView === 'report-issue') {
    return (
      <ReportIssuePage
        onBackToLanding={() => setCurrentView('landing')}
        onOpenUserManagement={() => setCurrentView('data-entry')}
      />
    )
  }

  // 2. Database Administration View
  if (currentView === 'data-entry') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Quick return toolbar */}
        <div
          style={{
            padding: '14px 24px',
            background: 'rgba(12, 14, 21, 0.95)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(10px)'
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13.5px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            <span>Back to MakeBetter Landing</span>
          </button>

          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
            Database Administration & API Subsystem
          </span>
        </div>

        <DataEntry />
      </div>
    )
  }

  // 3. Default Landing Page View
  return (
    <LandingPage
      onOpenReportIssue={() => setCurrentView('report-issue')}
      onOpenUserManagement={() => setCurrentView('data-entry')}
      onLogout={() => setCurrentView('landing')}
    />
  )
}

/**
 * Root Application Component wrapped in AuthProvider
 */
export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}
