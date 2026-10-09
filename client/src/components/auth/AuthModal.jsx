import { useState } from 'react'
import { FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './AuthModal.css'

/**
 * Authentication Modal Component
 * Renders both Login and Signup forms with dark glassmorphic styling,
 * validation feedback, and seamless integration with the AuthContext.
 */
export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup } = useAuth()

  if (!isOpen) return null

  // Reset form when switching tabs
  const handleSwitchTab = (newMode) => {
    setMode(newMode)
    setError('')
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.')
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setIsLoading(true)

    try {
      let result
      if (mode === 'signup') {
        result = await signup(name, email, password)
      } else {
        result = await login(email, password)
      }

      setIsLoading(false)
      if (result && result.success) {
        onClose()
        if (onAuthSuccess) {
          onAuthSuccess(result.user)
        }
      }
    } catch (err) {
      setIsLoading(false)
      setError(err.message || 'Authentication failed. Please check your credentials.')
    }
  }

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Glow Sphere */}
        <div className="auth-card-glow" />

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-block">
            <FaCreativeCommonsSamplingPlus size={24} style={{ color: 'var(--mb-primary)' }} />
            <span className="auth-brand-title">MakeBetter</span>
          </div>

          <button
            type="button"
            className="auth-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              close
            </span>
          </button>
        </div>

        {/* Tab Switcher: Login / Signup */}
        <div className="auth-tabs-bar">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('signup')}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="auth-error-banner">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name Field (Signup only) */}
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="e.g. Sankalp Saini"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          {/* Email Address */}
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="e.g. citizen@makebetter.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>
                  autorenew
                </span>
                <span>Authenticating...</span>
              </>
            ) : mode === 'login' ? (
              <>
                <span>Sign In to MakeBetter</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  login
                </span>
              </>
            ) : (
              <>
                <span>Create Citizen Account</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="auth-footer-note">
          Secured with municipal telemetry encryption. <br />
          Your account verifies civic reports and syncs real-time SLAs.
        </p>
      </div>
    </div>
  )
}
