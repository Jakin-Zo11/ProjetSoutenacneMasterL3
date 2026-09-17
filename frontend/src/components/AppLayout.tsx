import { type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'student', 'jury'] },
    { to: '/student', label: 'Étudiant', roles: ['student'] },
    { to: '/admin', label: 'Administration', roles: ['admin'] },
    { to: '/evaluation', label: 'Évaluation', roles: ['admin', 'jury'] },
    { to: '/results', label: 'Résultats', roles: ['admin', 'jury'] },
  ].filter((item) => user && item.roles.includes(user.role))

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">MS</div>
          <div>
            <p className="eyebrow">Master</p>
            <h2>Gestion Soutenance</h2>
          </div>
        </div>

        <nav className="nav-menu" aria-label="Menu principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <span className="pill success">Rôle actif</span>
          <p>{user ? user.role.toUpperCase() : 'INVITE'}</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Tableau de bord</p>
            <h1>{title}</h1>
          </div>

          <div className="topbar-actions">
            <div className="role-switcher" aria-label="Profil utilisateur">
              <span className="user-pill">{user?.name ?? 'Utilisateur'}</span>
            </div>
            <Link to="/dashboard" className="primary-button secondary-button">
              Accueil
            </Link>
            <button type="button" className="primary-button" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
