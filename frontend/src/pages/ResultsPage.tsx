import { AppLayout } from '../components/AppLayout'

export function ResultsPage() {
  const results = [
    { name: 'Mialy RAZAFY', project: 'Analyse de données IoT', note: '17/20', jury: 'Validation jury 1' },
    { name: 'Tiana ANDRIANARIVELO', project: 'Plateforme de gestion universitaire', note: '18/20', jury: 'Validation jury 2' },
  ]

  return (
    <AppLayout title="Résultats / PV">
      <section className="panel">
        <div className="panel-header">
          <h3>Résultats de soutenance</h3>
        </div>

        <div className="list-stack">
          {results.map((result) => (
            <div key={result.name} className="approval-item">
              <div>
                <strong>{result.name}</strong>
                <small>{result.project}</small>
              </div>
              <div className="approval-meta">
                <span className="pill success">{result.note}</span>
                <span>{result.jury}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
