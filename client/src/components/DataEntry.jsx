import { useState } from 'react'

const INITIAL_FORM = { name: '', email: '' }

export default function DataEntry() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Both name and email are required.')
      return
    }

    try {
      const res = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Server error: ' + res.status)

      const saved = await res.json()
      setUsers(prev => [saved, ...prev])
      setForm(INITIAL_FORM)
      setSuccess('User saved successfully!')
    } catch (err) {
      // Offline / server not running — add locally for demo purposes
      const localUser = { id: `local-${Date.now()}`, ...form }
      setUsers(prev => [localUser, ...prev])
      setForm(INITIAL_FORM)
      setSuccess('Added locally (server offline).')
    }
  }

  function handleDelete(id) {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <div className="header-badge">MongoDB · Spring Boot · React</div>
        <h1>User Management</h1>
        <p className="subtitle">Add and manage users stored in your database</p>
      </header>

      <div className="layout">
        {/* Form card */}
        <div className="card form-card">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Arikalp Sankaran"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. user@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {error && <p className="msg error">{error}</p>}
            {success && <p className="msg success">{success}</p>}

            <button type="submit" className="btn-primary">
              <span>Add User</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </form>
        </div>

        {/* User list */}
        <div className="card list-card">
          <div className="list-header">
            <h2>Users</h2>
            <span className="badge">{users.length}</span>
          </div>

          {users.length === 0 ? (
            <div className="empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <p>No users yet. Add one above!</p>
            </div>
          ) : (
            <ul className="user-list">
              {users.map(user => (
                <li key={user.id} className="user-item">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                    <span className="user-id">ID: {user.id}</span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.id)}
                    title="Remove user"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
