import { useEffect, useState } from 'react'
import { AppLayout } from '../components/AppLayout'
import { api } from '../services/api'

type EvaluationRow = {
  id: number
  student_name?: string
  title?: string
  note?: number
  status?: string
}

export function EvaluationPage() {
  const [items, setItems] = useState<EvaluationRow[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/evaluation-grid')
        setItems(data.items ?? data.grids ?? [])
      } catch (error) {
        console.error('Erreur chargement évaluations', error)
      }
    }

    void load()
  }, [])

  return (
    <AppLayout title="Évaluation">
      <section className="panel">
        <div className="panel-header">
          <h3>Tableau de notation</h3>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Projet</th>
                <th>Note</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.student_name ?? '—'}</td>
                    <td>{item.title ?? '—'}</td>
                    <td>{item.note ?? '—'}</td>
                    <td><span className="pill success">{item.status ?? 'validé'}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">Aucune donnée d’évaluation disponible pour le moment.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  )
}
