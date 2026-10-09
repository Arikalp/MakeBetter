import { useState } from 'react'
import LandingPage from './components/landing/LandingPage'
import DataEntry from './components/DataEntry'
import './App.css'

/**
 * Root Application Component
 * Renders the primary MakeBetter Landing Page with seamless access
 * to the User Management dashboard.
 */
function App() {
  const [currentView, setCurrentView] = useState('landing')

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

  return <LandingPage onOpenUserManagement={() => setCurrentView('data-entry')} />
}

export default App
