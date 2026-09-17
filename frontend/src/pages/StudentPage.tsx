import { useEffect, useState } from 'react'
import { AppLayout } from '../components/AppLayout'
import { api } from '../services/api'

type StudentSubmission = {
  id?: number
  title?: string
  description?: string
  status?: string
  submitted_at?: string
  files?: Array<{ id: number; type: string; original_name: string }>
}

export function StudentPage() {
  const [submission, setSubmission] = useState<StudentSubmission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/student/submission')
        setSubmission(data.submission)
      } catch (error) {
        console.error('Erreur récupération dossier étudiant', error)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  if (loading) {
    return (
      <AppLayout title="Espace étudiant">
        <div className="panel"><p>Chargement du dossier...</p></div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Espace étudiant">
      <section className="panel-grid two-columns">
        <article className="panel">
          <div className="panel-header">
            <h3>Profil étudiant</h3>
          </div>

          <div className="student-identity">
            <div className="avatar">ET</div>
            <div>
              <h4>Étudiant</h4>
              <p>Suivi du dépôt de mémoire et des informations de soutenance</p>
            </div>
          </div>

          <div className="mini-grid">
            <div className="mini-card">
              <span>Statut</span>
              <strong className="success">{submission?.status ?? 'draft'}</strong>
            </div>
            <div className="mini-card">
              <span>Soumis le</span>
              <strong className="info">{submission?.submitted_at ?? '—'}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Dépôt de mémoire</h3>
          </div>
          <form className="form-grid">
            <label>
              Titre du mémoire
              <input type="text" defaultValue={submission?.title ?? 'Aucun titre enregistré'} />
            </label>
            <label>
              Description du projet
              <textarea defaultValue={submission?.description ?? 'Aucune description enregistrée.'} />
            </label>
            <button type="button" className="primary-button">
              Enregistrer le dépôt
            </button>
          </form>
        </article>
      </section>
    </AppLayout>
  )
}
