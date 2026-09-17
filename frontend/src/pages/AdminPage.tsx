import { useEffect, useState } from 'react'
import { AppLayout } from '../components/AppLayout'
import { api } from '../services/api'

type PendingStudent = {
  id: number
  name: string
  email: string
  matricule: string
  mention: string
  parcours: string
  admission_year: number
}

export function AdminPage() {
  const [students, setStudents] = useState<PendingStudent[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/admin/students/pending')
        setStudents(data.students ?? [])
      } catch (error) {
        console.error('Erreur administrateur', error)
      }
    }

    void load()
  }, [])

  return (
    <AppLayout title="Administration">
      <section className="panel-grid two-columns">
        <article className="panel">
          <div className="panel-header">
            <h3>Approbations en attente</h3>
          </div>

          <div className="list-stack">
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.id} className="approval-item">
                  <div>
                    <strong>{student.name}</strong>
                    <small>{student.matricule}</small>
                  </div>
                  <div className="approval-meta">
                    <span>{student.parcours}</span>
                    <span className="pill neutral">{student.mention}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">Aucune demande en attente.</p>
            )}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Planning des soutenances</h3>
          </div>

          <div className="schedule-list">
            {[
              { slot: '09:00', room: 'Salle A01', candidate: 'Mialy RAZAFY', jury: 'Dr. Randrianarison / M. Benali / Mme. Fanjaniaina' },
              { slot: '10:30', room: 'Salle A02', candidate: 'Tiana ANDRIANARIVELO', jury: 'Dr. Tovondrainy / M. Raveloson / Mme. Andriamampianina' },
            ].map((entry) => (
              <div key={entry.slot} className="schedule-item">
                <div className="time-tag">{entry.slot}</div>
                <div>
                  <strong>{entry.candidate}</strong>
                  <small>{entry.room}</small>
                </div>
                <p>{entry.jury}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppLayout>
  )
}
