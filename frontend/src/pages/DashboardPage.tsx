import { Link } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()

  const cards = [
    { label: 'Étudiants inscrits', value: '248', tone: 'primary' },
    { label: 'Dossiers validés', value: '196', tone: 'success' },
    { label: 'Jurys affectés', value: '34', tone: 'warning' },
    { label: 'Soutenances prévues', value: '18', tone: 'info' },
  ]

  const quickLinks = [
    { to: '/student', label: 'Espace étudiant', visible: user?.role === 'student' },
    { to: '/admin', label: 'Administration', visible: user?.role === 'admin' },
    { to: '/evaluation', label: 'Évaluation', visible: user?.role === 'jury' || user?.role === 'admin' },
    { to: '/results', label: 'Résultats / PV', visible: user?.role === 'jury' || user?.role === 'admin' },
  ].filter((item) => item.visible)

  return (
    <AppLayout title="Vue d’ensemble">
      <section className="stats-grid">
        {cards.map((card) => (
          <article key={card.label} className={`stat-card ${card.tone}`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel-grid two-columns">
        <article className="panel">
          <div className="panel-header">
            <h3>Profil connecté</h3>
          </div>
          <div className="student-identity">
            <div className="avatar">{user?.name?.slice(0, 2).toUpperCase() ?? 'US'}</div>
            <div>
              <h4>{user?.name ?? 'Utilisateur'}</h4>
              <p>{user?.email ?? 'Aucun email'}</p>
            </div>
          </div>
          <div className="mini-grid">
            <div className="mini-card">
              <span>Rôle</span>
              <strong className="primary">{user?.role ?? 'inconnu'}</strong>
            </div>
            <div className="mini-card">
              <span>Statut</span>
              <strong className="success">{user?.student_status ?? 'actif'}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Accès rapides</h3>
          </div>
          <div className="quick-actions">
            {quickLinks.length > 0 ? (
              quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="action-button">
                  {link.label}
                </Link>
              ))
            ) : (
              <p className="empty-state">Aucun accès rapide pour ce rôle.</p>
            )}
          </div>
        </article>
      </section>
    </AppLayout>
  )
}
