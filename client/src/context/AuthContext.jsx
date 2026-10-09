import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Authentication Context
 * Manages user authentication state, tokens, and login/signup/logout actions.
 * Adheres to NOTE.md: modular, readable, and simple to understand.
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('makebetter_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('makebetter_token') || null
  })

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('makebetter_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('makebetter_user')
    }
  }, [currentUser])

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('makebetter_token', authToken)
    } else {
      localStorage.removeItem('makebetter_token')
    }
  }, [authToken])

  /**
   * Log in user using Spring Boot API with offline demo fallback
   */
  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials')
      }

      setCurrentUser(data.user)
      setAuthToken(data.token)
      return { success: true, user: data.user }
    } catch (err) {
      // If server is offline / unreachable, fallback to local test login for smooth preview
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const fallbackUser = {
          id: 'mb_local_' + Date.now(),
          name: email.split('@')[0],
          email: email,
          role: 'CITIZEN'
        }
        setCurrentUser(fallbackUser)
        setAuthToken('mb_local_token_' + Date.now())
        return { success: true, user: fallbackUser, isOffline: true }
      }
      throw err
    }
  }

  /**
   * Register a new user using Spring Boot API with offline demo fallback
   */
  async function signup(name, email, password) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed')
      }

      setCurrentUser(data.user)
      setAuthToken(data.token)
      return { success: true, user: data.user }
    } catch (err) {
      // If server is offline / unreachable, fallback to local test registration
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const fallbackUser = {
          id: 'mb_local_' + Date.now(),
          name: name,
          email: email,
          role: 'CITIZEN'
        }
        setCurrentUser(fallbackUser)
        setAuthToken('mb_local_token_' + Date.now())
        return { success: true, user: fallbackUser, isOffline: true }
      }
      throw err
    }
  }

  /**
   * Log out user
   */
  function logout() {
    setCurrentUser(null)
    setAuthToken(null)
    localStorage.removeItem('makebetter_user')
    localStorage.removeItem('makebetter_token')
  }

  const value = {
    currentUser,
    authToken,
    isAuthenticated: Boolean(currentUser),
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
