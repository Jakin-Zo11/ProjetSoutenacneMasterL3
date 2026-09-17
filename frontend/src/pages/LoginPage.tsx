import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form)
      navigate('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connexion impossible.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-mark">MS</div>
          <div>
            <p className="eyebrow accent">Master</p>
            <h2>Gestion des soutenances</h2>
          </div>
        </div>

        <p className="subtitle">
          Connectez-vous pour accéder à votre espace selon votre rôle.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="vous@exemple.com"
              required
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-hints">
          <span>Admin</span>
          <span>Étudiant</span>
          <span>Jury</span>
        </div>
      </div>
    </div>
  )
}
