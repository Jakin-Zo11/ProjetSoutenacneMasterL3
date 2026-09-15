import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { authApi } from './services/api/auth'
import { evaluationsApi } from './services/api/evaluations'
import emitLogo from './assets/logo.PNG'
import emitBuilding from './assets/batiment.PNG'

type Criterion = { id: number; name: string; description: string; weight: number; active: boolean }
type Session = { name: string; year: string; master: string; status: 'Active' | 'Brouillon' }
type Student = { name: string; email: string; program: string; status: string }
type FormType = 'criterion' | 'grid' | 'user' | 'defense'

const initialCriteria: Criterion[] = [
  { id: 1, name: 'Qualite du contenu', description: 'Problematique, objectifs et methodologie', weight: 30, active: true },
  { id: 2, name: 'Maitrise du sujet', description: 'Pertinence des reponses et recul critique', weight: 25, active: true },
  { id: 3, name: 'Qualite de la realisation', description: 'Fonctionnalites, choix techniques et resultats', weight: 25, active: true },
  { id: 4, name: 'Presentation orale', description: 'Clarte, structure et gestion du temps', weight: 20, active: true },
]
const sessions: Session[] = [
  { name: 'Soutenances Master 2', year: '2025 - 2026', master: 'Informatique', status: 'Active' },
  { name: 'Soutenances Master 1', year: '2025 - 2026', master: 'Data Science', status: 'Brouillon' },
]
const students: Student[] = [
  { name: 'Miora Rakoto', email: 'miora.rakoto@univ.test', program: 'Master 2 Informatique', status: 'Dossier complet' },
  { name: 'Andry Randrianasolo', email: 'andry.randrianasolo@univ.test', program: 'Master 2 Informatique', status: 'Soutenance planifiee' },
  { name: 'Fanja Ravelonarivo', email: 'fanja.ravelonarivo@univ.test', program: 'Master 1 Data Science', status: 'En attente' },
]

function App() {
  const [authenticated, setAuthenticated] = useState(() => Boolean(localStorage.getItem('auth_token')))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Vue generale')
  const [criteria, setCriteria] = useState(initialCriteria)
  const [selectedSession, setSelectedSession] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState<FormType>('criterion')
  const [newName, setNewName] = useState('')
  const [newGridName, setNewGridName] = useState('')
  const [newWeight, setNewWeight] = useState('10')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newDefenseName, setNewDefenseName] = useState('')
  const [newDefenseDate, setNewDefenseDate] = useState('')
  const [newDefenseTime, setNewDefenseTime] = useState('')
  const [academicSession, setAcademicSession] = useState('2025 - 2026')
  const [institutionName, setInstitutionName] = useState('EMIT')
  const [notice, setNotice] = useState('')
  const [apiGridId, setApiGridId] = useState<number | null>(null)
  const [apiConnected, setApiConnected] = useState(false)
  const totalWeight = useMemo(() => criteria.filter((item) => item.active).reduce((sum, item) => sum + item.weight, 0), [criteria])

  useEffect(() => {
    evaluationsApi.listGrids().then((grids) => {
      const grid = grids[0]
      if (!grid) return
      setApiGridId(grid.id)
      setApiConnected(true)
      setCriteria(grid.criteria.map((item) => ({ id: item.id, name: item.name, description: item.description ?? 'Critere de la grille', weight: Number(item.coefficient), active: grid.is_active })))
    }).catch(() => setApiConnected(false))
  }, [])

  const notify = (message: string) => setNotice(message)
  const selectMenu = (menu: string) => setActiveMenu(menu)
  const closeForm = () => setShowForm(false)
  const openForm = (type: FormType) => { setFormType(type); setShowForm(true) }
  const toggleCriterion = (id: number) => { setCriteria((current) => current.map((item) => item.id === id ? { ...item, active: !item.active } : item)); notify('La grille a ete mise a jour.') }
  const addCriterion = () => {
    if (!newName.trim()) return
    closeForm()
    const criterion = { name: newName.trim(), description: 'Nouveau critere a preciser', max_score: 20, coefficient: Number(newWeight) || 0, position: criteria.length }
    const finish = (id: number) => { setCriteria((current) => [...current, { id, name: criterion.name, description: criterion.description, weight: criterion.coefficient, active: true }]); setNewName(''); setNewWeight('10'); notify(apiConnected ? 'Le critere a ete ajoute dans Laravel.' : 'Le critere a ete ajoute localement.') }
    if (apiConnected && apiGridId) { evaluationsApi.createCriterion(apiGridId, criterion).then((created) => finish(created.id)).catch(() => notify('Impossible d enregistrer le critere dans Laravel.')); return }
    finish(Date.now())
  }
  const addGrid = () => {
    if (!newGridName.trim()) return
    const name = newGridName.trim()
    closeForm()
    setNewGridName('')
    if (apiConnected) {
      evaluationsApi.createGrid({ name, description: 'Grille de soutenance EMIT', is_active: true }).then(() => notify('La nouvelle grille a ete ajoutee dans Laravel.')).catch(() => notify('Impossible d enregistrer la grille dans Laravel.'))
      return
    }
    notify('La nouvelle grille a ete ajoutee localement.')
  }
  const addUser = () => { if (!newUserEmail.trim()) return; closeForm(); const invited = newUserEmail; setNewUserEmail(''); notify(`Invitation envoyee a ${invited}.`) }
  const addDefense = () => { if (!newDefenseName.trim() || !newDefenseDate || !newDefenseTime) return; const name = newDefenseName; const date = newDefenseDate; const time = newDefenseTime; closeForm(); setNewDefenseName(''); setNewDefenseDate(''); setNewDefenseTime(''); notify(`La soutenance ${name} a ete planifiee le ${date} a ${time}.`) }
  const login = async () => { setLoggingIn(true); setLoginError(''); try { const user = await authApi.login(email, password); if (user.role !== 'admin') { await authApi.logout(); setLoginError('Ce compte ne possède pas les droits de la scolarité.'); return } setAuthenticated(true) } catch { setLoginError('Identifiants invalides ou serveur Laravel indisponible.') } finally { setLoggingIn(false) } }

  if (!authenticated) return <main className="login-page" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,44,61,.86), rgba(20,44,61,.35)), url(${emitBuilding})` }}><section className="login-card"><div className="brand login-brand"><img src={emitLogo} alt="Logo EMIT" /><strong>EMIT</strong></div><p className="eyebrow">ESPACE SCOLARITE</p><h1>Connexion</h1><p className="login-copy">Accédez à la configuration des grilles d’évaluation.</p><label htmlFor="email">Adresse e-mail</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="scolarite@emit.mg" /><label htmlFor="password">Mot de passe</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Votre mot de passe" />{loginError && <p className="login-error">{loginError}</p>}<button className="primary-button login-button" onClick={login} disabled={loggingIn}>{loggingIn ? 'Connexion...' : 'Se connecter'}</button><button className="demo-button" onClick={() => setAuthenticated(true)}>Continuer en mode demonstration</button></section></main>

  const showOverview = activeMenu === 'Vue generale' || activeMenu === 'Grilles d evaluation'
  return <div className={`app-shell ${activeMenu === 'Vue generale' ? 'overview-shell' : ''}`} style={activeMenu === 'Vue generale' ? { backgroundImage: `linear-gradient(rgba(245,247,248,.94), rgba(245,247,248,.98)), url(${emitBuilding})` } : undefined}>
    <aside className="sidebar"><div className="brand"><img src={emitLogo} alt="Logo EMIT" /><span className="brand-name">EMIT</span></div><div className="profile"><div className="avatar">SC</div><div><strong>Service scolarite</strong><span>Administrateur</span></div><span className="online-dot" /></div><nav className="main-nav" aria-label="Navigation administration"><span className="nav-label">ADMINISTRATION</span>{['Vue generale', 'Etudiants', 'Soutenances', 'Grilles d evaluation', 'Utilisateurs'].map((item) => <button key={item} className={`nav-item ${activeMenu === item ? 'active' : ''}`} onClick={() => selectMenu(item)}><span className="nav-icon">{item === 'Grilles d evaluation' ? '[]' : item === 'Etudiants' ? '◎' : '='}</span>{item}{item === 'Grilles d evaluation' && <b>2</b>}</button>)}<span className="nav-label nav-label-spaced">SYSTEME</span>{['Parametres', 'Aide'].map((item) => <button key={item} className={`nav-item ${activeMenu === item ? 'active' : ''}`} onClick={() => selectMenu(item)}><span className="nav-icon">{item === 'Aide' ? '?' : '*'}</span>{item}</button>)}</nav><div className="sidebar-footer"><button className="nav-item" onClick={() => { authApi.logout(); setAuthenticated(false) }}><span className="nav-icon">&lt;</span>Deconnexion</button><small>Session 2025 - 2026</small></div></aside>
    <main className="main-content"><header className="topbar"><div className="top-brand"><img src={emitLogo} alt="Logo EMIT" /><strong>EMIT</strong></div><div className="breadcrumbs">Administration <span>/</span> {activeMenu}</div><div className="top-actions"><button className="icon-button" aria-label="Notifications">!</button><div className="mini-avatar">SC</div></div></header><div className="page-wrap">
      <section className="page-heading"><div><p className="eyebrow">MODULE ADMINISTRATION · SCOLARITE</p><h1>{activeMenu}</h1><p className="subheading">{activeMenu === 'Grilles d evaluation' ? 'Configurez les grilles et criteres utilises par les membres du jury.' : 'Consultez et gerez les informations de votre etablissement.'}</p></div>{activeMenu === 'Grilles d evaluation' && <div className="heading-actions"><button className="outline-button" onClick={() => openForm('grid')}>+ Nouvelle grille</button><button className="primary-button" onClick={() => openForm('criterion')}>+ Nouveau critere</button></div>}</section>
      {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Fermer">x</button></div>}<div className={`connection-status ${apiConnected ? 'connected' : ''}`}>{apiConnected ? 'Connecte a Laravel' : 'Mode demonstration - API non connectee'}</div>
      {activeMenu === 'Etudiants' && <section className="panel page-panel"><div className="panel-heading"><div><h2>Etudiants inscrits</h2><p>Suivez les dossiers des candidats a la soutenance.</p></div></div><div className="data-list">{students.map((student) => <div className="data-row" key={student.email}><div className="row-avatar">{student.name.split(' ').map((part) => part[0]).join('')}</div><div><strong>{student.name}</strong><small>{student.email} · {student.program}</small></div><span className="state-badge state-active">{student.status}</span></div>)}</div></section>}
      {activeMenu === 'Soutenances' && <section className="panel page-panel"><div className="panel-heading"><div><h2>Planning des soutenances</h2><p>Sessions et affectations en cours.</p></div><button className="outline-button" onClick={() => openForm('defense')}>+ Planifier</button></div><div className="data-list">{sessions.map((session) => <div className="data-row" key={session.name}><div className="session-symbol">S</div><div><strong>{session.name}</strong><small>{session.master} · {session.year}</small></div><span className={`state-badge ${session.status === 'Active' ? 'state-active' : 'state-draft'}`}>{session.status}</span></div>)}</div></section>}
      {activeMenu === 'Utilisateurs' && <section className="panel page-panel"><div className="panel-heading"><div><h2>Utilisateurs et roles</h2><p>Comptes autorises a acceder a la plateforme.</p></div><button className="outline-button" onClick={() => openForm('user')}>+ Inviter</button></div><div className="data-list"><div className="data-row"><div className="row-avatar">SC</div><div><strong>Service scolarite</strong><small>admin@mastereval.test</small></div><span className="state-badge state-active">Administrateur</span></div><div className="data-row"><div className="row-avatar">JD</div><div><strong>Jury demo</strong><small>jury@mastereval.test</small></div><span className="state-badge state-draft">Membre du jury</span></div></div></section>}
      {activeMenu === 'Parametres' && <section className="panel page-panel settings-panel"><h2>Parametres generaux</h2><p>Session academique active</p><select value={academicSession} onChange={(event) => setAcademicSession(event.target.value)}><option>2025 - 2026</option><option>2026 - 2027</option><option>2027 - 2028</option></select><p>Nom de l etablissement</p><input value={institutionName} onChange={(event) => setInstitutionName(event.target.value)} /><button className="primary-button" onClick={() => notify(`Parametres ${institutionName} · session ${academicSession} enregistres.`)}>Enregistrer les parametres</button></section>}
      {activeMenu === 'Aide' && <section className="panel page-panel help-panel"><h2>Centre d aide</h2><p>Le module Evaluation permet de configurer les criteres, coefficients et baremes transmis au jury mobile.</p><div className="help-item"><strong>Comment creer une grille ?</strong><span>Ouvrez Grilles d evaluation puis ajoutez les criteres de la session.</span></div><div className="help-item"><strong>Qui saisit les notes ?</strong><span>Les membres du jury utilisent l application mobile.</span></div></section>}
      {showOverview && <><section className="summary-grid"><div className="summary-card"><span className="summary-icon blue">[]</span><div><span>Grilles configurees</span><strong>2</strong></div><small>Cette session</small></div><div className="summary-card"><span className="summary-icon amber">#</span><div><span>Criteres actifs</span><strong>{criteria.filter((item) => item.active).length}</strong></div><small>{totalWeight}% pondere</small></div><div className="summary-card"><span className="summary-icon green">✓</span><div><span>Evaluations en cours</span><strong>12</strong></div><small>Sur 38 etudiants</small></div></section><div className="content-grid"><section className="panel session-panel"><div className="panel-heading"><div><h2>Sessions de soutenance</h2><p>Choisissez une session a configurer.</p></div></div>{sessions.map((session, index) => <button key={session.name} className={`session-card ${selectedSession === index ? 'selected' : ''}`} onClick={() => setSelectedSession(index)}><span className="session-symbol">S{index + 1}</span><span className="session-copy"><strong>{session.name}</strong><span>{session.master} · {session.year}</span></span><span className={`state-badge ${session.status === 'Active' ? 'state-active' : 'state-draft'}`}>{session.status}</span><span className="chevron">&gt;</span></button>)}</section><section className="panel criteria-panel"><div className="panel-heading"><div><p className="eyebrow">GRILLE ACTIVE · {sessions[selectedSession].name.toUpperCase()}</p><h2>Criteres d evaluation</h2><p>Ces criteres seront visibles par le jury sur l application mobile.</p></div></div><div className="weight-status"><span><b>{totalWeight}%</b> des coefficients configures</span><span className={totalWeight === 100 ? 'complete' : 'incomplete'}>{totalWeight === 100 ? 'Grille complete' : 'A verifier'}</span><div className="weight-bar"><span style={{ width: `${Math.min(totalWeight, 100)}%` }} /></div></div><div className="criteria-table"><div className="table-head"><span>CRITERE</span><span>BAREME</span><span>COEFFICIENT</span><span>ETAT</span></div>{criteria.map((item) => <div className="criterion-row" key={item.id}><span className="criterion-name"><strong>{item.name}</strong><small>{item.description}</small></span><span className="scale">0 - 20</span><span className="coefficient">{item.weight}%</span><button className={`toggle ${item.active ? 'on' : ''}`} onClick={() => toggleCriterion(item.id)} aria-label={`${item.active ? 'Desactiver' : 'Activer'} ${item.name}`}><span /></button></div>)}</div><div className="panel-footer"><span>Derniere modification : aujourd hui</span><button className="save-button" onClick={() => notify('La grille a ete enregistree avec succes.')}>Enregistrer la grille</button></div></section></div></>}
    </div></main>
    {showForm && <div className="modal-backdrop" onClick={closeForm}><section className="modal" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">ADMINISTRATION EMIT</p><h2>{formType === 'grid' ? 'Ajouter une grille' : formType === 'user' ? 'Inviter un utilisateur' : formType === 'defense' ? 'Planifier une soutenance' : 'Ajouter un critere'}</h2></div><button onClick={closeForm} aria-label="Fermer">x</button></div>{formType === 'grid' && <><label htmlFor="grid-name">Nom de la grille</label><input id="grid-name" value={newGridName} onChange={(event) => setNewGridName(event.target.value)} placeholder="Ex. Soutenances Master 2" /><ModalActions cancel={closeForm} submit={addGrid} label="Ajouter la grille" /></>}{formType === 'user' && <><label htmlFor="user-email">Adresse e-mail</label><input id="user-email" type="email" value={newUserEmail} onChange={(event) => setNewUserEmail(event.target.value)} placeholder="jury@emit.mg" /><label htmlFor="user-role">Role</label><select defaultValue="jury"><option value="jury">Membre du jury</option><option value="admin">Administrateur</option></select><ModalActions cancel={closeForm} submit={addUser} label="Envoyer l invitation" /></>}{formType === 'defense' && <><label htmlFor="defense-name">Intitule de la soutenance</label><input id="defense-name" value={newDefenseName} onChange={(event) => setNewDefenseName(event.target.value)} placeholder="Ex. Soutenance Miora Rakoto" /><label htmlFor="defense-date">Date</label><input id="defense-date" type="date" value={newDefenseDate} onChange={(event) => setNewDefenseDate(event.target.value)} /><label htmlFor="defense-time">Heure de soutenance</label><input id="defense-time" type="time" value={newDefenseTime} onChange={(event) => setNewDefenseTime(event.target.value)} /><ModalActions cancel={closeForm} submit={addDefense} label="Planifier" /></>}{formType === 'criterion' && <><label htmlFor="criterion-name">Nom du critere</label><input id="criterion-name" value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Ex. Innovation et pertinence" /><label htmlFor="criterion-weight">Coefficient (%)</label><input id="criterion-weight" type="number" min="0" max="100" value={newWeight} onChange={(event) => setNewWeight(event.target.value)} /><ModalActions cancel={closeForm} submit={addCriterion} label="Ajouter le critere" /></>}</section></div>}
  </div>
}

function ModalActions({ cancel, submit, label }: { cancel: () => void; submit: () => void; label: string }) { return <div className="modal-actions"><button className="save-button" onClick={cancel}>Annuler</button><button className="primary-button" onClick={submit}>{label}</button></div> }

export default App
