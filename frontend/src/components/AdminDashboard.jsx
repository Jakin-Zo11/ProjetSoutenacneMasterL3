import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  TrendingUp,
  Award,
  AlertTriangle,
  ChevronDown,
  GraduationCap,
  UserCheck,
  MapPin,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  FileCheck,
  Download,
  Upload,
  Filter
} from 'lucide-react';

const AdminDashboard = ({ currentPage, setCurrentPage, onLogout }) => {
  // État pour la page active
  const [activePage, setActivePage] = useState(currentPage || 'dashboard');
  const [activeMenu, setActiveMenu] = useState(currentPage || 'dashboard');

  // État pour les statistiques
  const [stats, setStats] = useState({
    totalDepots: 156,
    soutenancesPlanifiees: 42,
    etudiants: 89,
    pvSignes: 38,
    jurysIndisponibles: 3
  });

  // État pour les derniers dépôts
  const [recentDepots, setRecentDepots] = useState([]);

  // État pour les soutenances
  const [soutenances, setSoutenances] = useState([]);

  // État pour les résultats
  const [resultats, setResultats] = useState([]);

  // État pour la modal de reprogrammation
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  // Navigation groups
  const navGroups = [
    {
      label: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Gestion académique',
      items: [
        { id: 'etudiants', label: 'Étudiants', icon: GraduationCap },
        { id: 'enseignants', label: 'Enseignants', icon: UserCheck },
        { id: 'jurys', label: 'Jurys', icon: Users }
      ]
    },
    {
      label: 'Soutenances',
      items: [
        { id: 'soutenances', label: 'Soutenances', icon: CalendarIcon },
        { id: 'salles', label: 'Salles', icon: MapPin },
        { id: 'creneaux', label: 'Créneaux', icon: ClockIcon },
        { id: 'calendrier', label: 'Calendrier', icon: Calendar },
        { id: 'affectation', label: 'Affectation jury', icon: UserCheck }
      ]
    },
    {
      label: 'Résultats',
      items: [
        { id: 'evaluations', label: 'Évaluations', icon: FileCheck },
        { id: 'resultats', label: 'Résultats', icon: Award },
        { id: 'pv', label: 'PV / Rapports', icon: FileText }
      ]
    }
  ];

  // Données de démonstration
  useEffect(() => {
    setRecentDepots([
      {
        id: 1,
        etudiant: 'Rakoto Jean',
        initiales: 'RJ',
        promotion: 'Master 1 - Informatique',
        titre: 'Système de gestion de soutenances en ligne',
        statut: 'en_attente',
        date: '2026-09-10'
      },
      {
        id: 2,
        etudiant: 'Rasoa Marie',
        initiales: 'RM',
        promotion: 'Licence 3 - Gestion',
        titre: 'Impact du digital sur les PME à Fianarantsoa',
        statut: 'valide',
        date: '2026-09-09'
      },
      {
        id: 3,
        etudiant: 'Randria Paul',
        initiales: 'RP',
        promotion: 'Master 2 - Réseaux',
        titre: 'Optimisation des réseaux IoT agricoles',
        statut: 'rejete',
        date: '2026-09-08'
      },
      {
        id: 4,
        etudiant: 'Andriamanitra Cécile',
        initiales: 'AC',
        promotion: 'Licence 3 - Économie',
        titre: 'Analyse de l\'économie informelle à Madagascar',
        statut: 'en_attente',
        date: '2026-09-07'
      }
    ]);

    setSoutenances([
      {
        id: 1,
        reference: 'SOUT-2026-001',
        etudiant: 'Rakoto Jean',
        sujet: 'Système de gestion de soutenances en ligne',
        date: '2026-09-15',
        heure: '09:00',
        salle: 'Salle A101',
        jury: 'Dr. Randria, Pr. Rasoa, M. Andriamanitra',
        statut: 'planifiee'
      },
      {
        id: 2,
        reference: 'SOUT-2026-002',
        etudiant: 'Rasoa Marie',
        sujet: 'Impact du digital sur les PME',
        date: '2026-09-16',
        heure: '14:00',
        salle: 'Amphi B',
        jury: 'Pr. Randria, Dr. Andriamanitra, Mme. Rasoarimanana',
        statut: 'en_cours'
      },
      {
        id: 3,
        reference: 'SOUT-2026-003',
        etudiant: 'Randria Paul',
        sujet: 'Optimisation des réseaux IoT',
        date: '2026-09-17',
        heure: '10:00',
        salle: 'Salle C205',
        jury: 'Dr. Rasoa, Pr. Andriamanitra, M. Ravelonarivo',
        statut: 'annulee'
      },
      {
        id: 4,
        reference: 'SOUT-2026-004',
        etudiant: 'Andriamanitra Cécile',
        sujet: 'Analyse économie informelle',
        date: '2026-09-18',
        heure: '11:00',
        salle: 'Salle D102',
        jury: 'Pr. Rasoarimanana, Dr. Ravelonarivo, Mme. Randria',
        statut: 'reprogrammee'
      }
    ]);

    setResultats([
      {
        id: 1,
        etudiant: 'Rakoto Jean',
        matricule: 'MAT-2023-001',
        moyenne: 16.5,
        mention: 'Très Bien',
        avis: 'Excellent travail, sujet maîtrisé',
        date: '2026-09-10',
        statut: 'publie'
      },
      {
        id: 2,
        etudiant: 'Rasoa Marie',
        matricule: 'MAT-2023-002',
        moyenne: 14.0,
        mention: 'Bien',
        avis: 'Bon travail, quelques améliorations possibles',
        date: '2026-09-11',
        statut: 'termine'
      },
      {
        id: 3,
        etudiant: 'Randria Paul',
        matricule: 'MAT-2023-003',
        moyenne: 12.5,
        mention: 'Assez Bien',
        avis: 'Travail satisfaisant',
        date: '2026-09-12',
        statut: 'en_attente'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge de statut (palette EMIT stricte)
  const getStatusBadge = (statut) => {
    const statusConfig = {
      en_attente: {
        bg: 'bg-[#EAF4FF]',
        text: 'text-[#050840]',
        label: 'En attente'
      },
      planifiee: {
        bg: 'bg-[#EAF4FF]',
        text: 'text-[#050840]',
        label: 'Planifiée'
      },
      en_cours: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'En cours'
      },
      termine: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'Terminé'
      },
      publie: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'Publié'
      },
      annulee: {
        bg: 'bg-[#FFF1F1]',
        text: 'text-[#991B1B]',
        label: 'Annulée'
      },
      reprogrammee: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'Reprogrammée'
      },
      valide: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'Validé'
      },
      rejete: {
        bg: 'bg-[#FFF1F1]',
        text: 'text-[#991B1B]',
        label: 'Rejeté'
      }
    };

    const config = statusConfig[statut] || statusConfig.en_attente;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Fonction pour obtenir le titre de page
  const getPageTitle = () => {
    const titles = {
      dashboard: { title: 'Dashboard', subtitle: 'Vue d\'ensemble du système de gestion des soutenances' },
      soutenances: { title: 'Gestion des Soutenances', subtitle: 'Planification et suivi des soutenances de mémoire' },
      etudiants: { title: 'Gestion des Étudiants', subtitle: 'Administration des étudiants inscrits' },
      enseignants: { title: 'Gestion des Enseignants', subtitle: 'Administration du corps enseignant' },
      jurys: { title: 'Gestion des Jurys', subtitle: 'Administration des membres de jury' },
      resultats: { title: 'Résultats', subtitle: 'Consultation et publication des résultats de soutenance' },
      evaluations: { title: 'Évaluations', subtitle: 'Suivi des évaluations en cours' },
      pv: { title: 'PV / Rapports', subtitle: 'Gestion des procès-verbaux et rapports' },
      salles: { title: 'Gestion des Salles', subtitle: 'Administration des espaces de soutenance' },
      creneaux: { title: 'Gestion des Créneaux', subtitle: 'Planification des créneaux horaires' },
      calendrier: { title: 'Calendrier', subtitle: 'Vue calendrier des soutenances' },
      affectation: { title: 'Affectation Jury', subtitle: 'Affectation des jurys aux soutenances' }
    };
    return titles[activePage] || titles.dashboard;
  };

  return (
    <div className="min-h-screen bg-[#EBF3FA] font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex min-h-screen">
        {/* Sidebar - Navy #0D1F4E */}
        <aside className="w-64 bg-[#0D1F4E] flex flex-col fixed h-full z-10">
          {/* Section 1: Logo Block */}
          <div className="p-6 border-b border-[#1A4BA8]/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#0D1F4E] font-bold text-lg">EM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">EMIT</h1>
                <p className="text-xs text-[#637799]">Fianarantsoa</p>
              </div>
            </div>
            <div className="inline-flex items-center px-2 py-1 bg-[#2D84E0]/20 rounded-lg">
              <span className="text-xs text-[#2D84E0] font-medium">Gestion des Soutenances</span>
            </div>
          </div>

          {/* Section 2: Scrollable Nav with Groups */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <p className="px-4 mb-2 text-xs font-semibold text-[#637799] uppercase tracking-wider">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveMenu(item.id);
                        setActivePage(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                        isActive
                          ? 'border-l-4 border-[#2D84E0] bg-[rgba(45,132,224,0.22)] text-white font-bold'
                          : 'text-[#637799] hover:text-white hover:bg-[#1A4BA8]/30'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Section 3: User Avatar + Name + Logout */}
          <div className="p-4 border-t border-[#1A4BA8]/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#2D84E0] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin Scolarité</p>
                <p className="text-xs text-[#637799]">admin@emit.mg</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#637799] hover:text-white hover:bg-[#1A4BA8]/30 rounded-lg transition-all">
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Right Column */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* White Top Header */}
          <header className="bg-white border-b border-[#DDEAF7] px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Page Title + Subtitle */}
              <div>
                <h1 className="text-xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {getPageTitle().title}
                </h1>
                <p className="text-sm text-[#637799]">{getPageTitle().subtitle}</p>
              </div>

              {/* Right: EMIT/year badge + search + bell + avatar */}
              <div className="flex items-center gap-4">
                {/* year Badge */}
                <div className="hidden sm:flex items-center px-3 py-1.5 bg-[#EAF4FF] rounded-lg">
                  <span className="text-xs font-semibold text-[#1A4BA8]">EMIT 2026</span>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#637799]" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0] focus:border-transparent w-48"
                  />
                </div>

                {/* Bell Icon */}
                <button className="relative w-10 h-10 bg-[#F0F5FB] rounded-lg flex items-center justify-center hover:bg-[#EAF4FF] transition-colors">
                  <Bell className="w-5 h-5 text-[#637799]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
                </button>

                {/* Avatar */}
                <div className="w-10 h-10 bg-[#2D84E0] rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activePage === 'dashboard' && (
              <div>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-[#DDEAF7]">
                    <p className="text-sm text-[#637799] mb-1">Total Soutenances</p>
                    <p className="text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-[#DDEAF7]">
                    <p className="text-sm text-[#637799] mb-1">Planifiées</p>
                    <p className="text-2xl font-bold text-[#1A4BA8]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.filter(s => s.statut === 'planifiee').length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-[#DDEAF7]">
                    <p className="text-sm text-[#637799] mb-1">En cours</p>
                    <p className="text-2xl font-bold text-[#2D84E0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.filter(s => s.statut === 'en_cours').length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-[#DDEAF7]">
                    <p className="text-sm text-[#637799] mb-1">Terminées</p>
                    <p className="text-2xl font-bold text-[#0D1F4E]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.filter(s => s.statut === 'termine').length}
                    </p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-[#DDEAF7] p-6">
                  <h2 className="text-lg font-semibold text-[#0B1D3A] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Activité Récente
                  </h2>
                  <div className="space-y-4">
                    {recentDepots.slice(0, 3).map((depot) => (
                      <div key={depot.id} className="flex items-center gap-4 p-3 bg-[#F0F5FB] rounded-lg">
                        <div className="w-10 h-10 bg-[#2D84E0] rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{depot.initiales}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#0B1D3A]">{depot.etudiant}</p>
                          <p className="text-xs text-[#637799]">{depot.promotion}</p>
                        </div>
                        {getStatusBadge(depot.statut)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePage === 'soutenances' && (
              <div>
                {/* Soutenances Table */}
                <div className="bg-white rounded-lg border border-[#DDEAF7] overflow-hidden">
                  <div className="p-4 border-b border-[#DDEAF7]">
                    <h2 className="text-lg font-semibold text-[#0B1D3A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Liste des Soutenances
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F0F5FB]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Référence</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Étudiant</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Sujet</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Date+Heure</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Salle</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Jury</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDEAF7]">
                    {soutenances.map((soutenance) => (
                      <tr key={soutenance.id} className="hover:bg-[#F0F5FB] transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-[#0B1D3A]">{soutenance.reference}</td>
                        <td className="px-4 py-3 text-sm text-[#0B1D3A]">{soutenance.etudiant}</td>
                        <td className="px-4 py-3 text-sm text-[#637799] max-w-xs truncate">{soutenance.sujet}</td>
                        <td className="px-4 py-3 text-sm text-[#0B1D3A]">{soutenance.date} {soutenance.heure}</td>
                        <td className="px-4 py-3 text-sm text-[#0B1D3A]">{soutenance.salle}</td>
                        <td className="px-4 py-3 text-sm text-[#637799] max-w-xs truncate">{soutenance.jury}</td>
                        <td className="px-4 py-3">{getStatusBadge(soutenance.statut)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {(soutenance.statut === 'planifiee' || soutenance.statut === 'en_cours') && (
                              <>
                                <button className="text-xs text-[#2D84E0] hover:text-[#1A4BA8] font-medium">Reprogrammer</button>
                                <button className="text-xs text-[#DC2626] hover:text-red-700 font-medium">Annuler</button>
                              </>
                            )}
                            {soutenance.statut === 'annulee' && (
                              <button className="text-xs text-[#2D84E0] hover:text-[#1A4BA8] font-medium">Replanifier</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                </div>

                {/* Info Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#FEE2E2] border border-[#B91C1C] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-[#B91C1C]" />
                      <h3 className="text-sm font-semibold text-[#B91C1C]">Soutenances Annulées</h3>
                    </div>
                    <p className="text-2xl font-bold text-[#B91C1C]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.filter(s => s.statut === 'annulee').length}
                    </p>
                  </div>
                  <div className="bg-[#E0F2FE] border border-[#0369A1] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-5 h-5 text-[#0369A1]" />
                      <h3 className="text-sm font-semibold text-[#0369A1]">Soutenances Reprogrammées</h3>
                    </div>
                    <p className="text-2xl font-bold text-[#0369A1]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {soutenances.filter(s => s.statut === 'reprogrammee').length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'resultats' && (
              <div>
                {/* Results Table */}
                <div className="bg-white rounded-lg border border-[#DDEAF7] overflow-hidden">
                  <div className="p-4 border-b border-[#DDEAF7] flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[#0B1D3A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Résultats des Soutenances
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A4BA8] text-white rounded-lg text-sm font-medium hover:bg-[#0D1F4E] transition-colors">
                      <Upload size={16} />
                      Publier tout
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F0F5FB]">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Étudiant</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Matricule</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Moyenne /20</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Mention</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Avis du jury</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Statut</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DDEAF7]">
                        {resultats.map((resultat) => (
                          <tr key={resultat.id} className="hover:bg-[#F0F5FB] transition-colors">
                            <td className="px-4 py-3 text-sm text-[#0B1D3A]">{resultat.etudiant}</td>
                            <td className="px-4 py-3 text-sm font-mono text-[#0B1D3A]">{resultat.matricule}</td>
                            <td className="px-4 py-3 text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {resultat.moyenne}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#0B1D3A]">{resultat.mention}</td>
                            <td className="px-4 py-3 text-sm text-[#637799] max-w-xs truncate">{resultat.avis}</td>
                            <td className="px-4 py-3 text-sm text-[#0B1D3A]">{resultat.date}</td>
                            <td className="px-4 py-3">{getStatusBadge(resultat.statut)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="flex items-center gap- px-2 py-1 bg-[#EAF4FF] text-[#1A4BA8] rounded-lg text-xs font-medium hover:bg-[#2D84E0] hover:text-white transition-colors">
                                  <Download size={14} />
                                  PDF
                                </button>
                                {resultat.statut !== 'publie' && (
                                  <button className="text-xs text-[#2D84E0] hover:text-[#1A4BA8] font-medium">Publier</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(activePage === 'etudiants' || activePage === 'enseignants' || activePage === 'jurys') && (
              <div>
                {/* Warning Banner for Jurys */}
                {activePage === 'jurys' && (
                  <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                      <p className="text-sm font-medium text-[#92400E]">
                        Rappel : Chaque jury doit comporter exactement 3 membres pour être valide.
                      </p>
                    </div>
                  </div>
                )}

                {/* Toolbar */}
                <div className="bg-white rounded-lg border border-[#DDEAF7] p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#637799]" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          className="pl-10 pr-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0] w-64"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-3 py-2 bg-[#EAF4FF] text-[#1A4BA8] rounded-lg text-sm font-medium hover:bg-[#2D84E0] hover:text-white transition-colors">
                        <Download size={16} />
                        Exporter
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A4BA8] text-white rounded-lg text-sm font-medium hover:bg-[#0D1F4E] transition-colors">
                      <Plus size={16} />
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg border border-[#DDEAF7] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F0F5FB]">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Nom</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Statut</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-[#637799] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DDEAF7]">
                        <tr className="hover:bg-[#F0F5FB] transition-colors">
                          <td className="px-4 py-3 text-sm text-[#0B1D3A]">Rakoto Jean</td>
                          <td className="px-4 py-3 text-sm text-[#637799]">rakoto.jean@emit.mg</td>
                          <td className="px-4 py-3">{getStatusBadge('en_attente')}</td>
                          <td className="px-4 py-3">
                            <button className="text-xs text-[#2D84E0] hover:text-[#1A4BA8] font-medium">Modifier</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-[#F0F5FB] transition-colors">
                          <td className="px-4 py-3 text-sm text-[#0B1D3A]">Rasoa Marie</td>
                          <td className="px-4 py-3 text-sm text-[#637799]">rasoa.marie@emit.mg</td>
                          <td className="px-4 py-3">{getStatusBadge('valide')}</td>
                          <td className="px-4 py-3">
                            <button className="text-xs text-[#2D84E0] hover:text-[#1A4BA8] font-medium">Modifier</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4-Step Modal for Rescheduling */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#DDEAF7]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0B1D3A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Reprogrammer la Soutenance
                </h2>
                <button
                  onClick={() => { setModalOpen(false); setModalStep(1); }}
                  className="p-2 text-[#637799] hover:text-[#0B1D3A] hover:bg-[#F0F5FB] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      modalStep >= step ? 'bg-[#2D84E0] text-white' : 'bg-[#F0F5FB] text-[#637799]'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        modalStep > step ? 'bg-[#2D84E0]' : 'bg-[#F0F5FB]'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1D3A] mb-4">Vérification de la disponibilité du jury</h3>
                  <div className="space-y-4">
                    <div className="bg-[#EAF4FF] border border-[#2D84E0] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2D84E0]" />
                        <div>
                          <p className="font-medium text-[#0B1D3A]">Dr. Randria</p>
                          <p className="text-sm text-[#637799]">Disponible le 15/09/2026 à 09:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#EAF4FF] border border-[#2D84E0] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2D84E0]" />
                        <div>
                          <p className="font-medium text-[#0B1D3A]">Pr. Rasoa</p>
                          <p className="text-sm text-[#637799]">Disponible le 15/09/2026 à 09:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FEE2E2] border border-[#B91C1C] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-[#B91C1C]" />
                        <div>
                          <p className="font-medium text-[#0B1D3A]">M. Andriamanitra</p>
                          <p className="text-sm text-[#637799]">Indisponible - Congé du 10/09 au 20/09/2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setModalStep(2)}
                      className="px-6 py-2 bg-[#1A4BA8] text-white rounded-lg text-sm font-medium hover:bg-[#0D1F4E] transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {modalStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1D3A] mb-4">Choisir l'action</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setModalStep(3)}
                      className="w-full p-4 bg-[#EAF4FF] border border-[#2D84E0] rounded-lg text-left hover:bg-[#2D84E0] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ClockIcon className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">Reprogrammer la soutenance</p>
                          <p className="text-sm opacity-80">Choisir une nouvelle date, heure et salle</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setModalStep(4)}
                      className="w-full p-4 bg-[#FEE2E2] border border-[#B91C1C] rounded-lg text-left hover:bg-[#B91C1C] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">Annuler la soutenance</p>
                          <p className="text-sm opacity-80">Annuler définitivement cette soutenance</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setModalStep(1)}
                      className="px-6 py-2 bg-[#F0F5FB] text-[#637799] rounded-lg text-sm font-medium hover:bg-[#EAF4FF] transition-colors"
                    >
                      Précédent
                    </button>
                  </div>
                </div>
              )}

              {modalStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1D3A] mb-4">Nouveau planning</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D3A] mb-1">Nouvelle date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D3A] mb-1">Nouvelle heure</label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D3A] mb-1">Nouvelle salle</label>
                      <select className="w-full px-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0]">
                        <option>Salle A101</option>
                        <option>Salle B205</option>
                        <option>Amphithéâtre C1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D3A] mb-1">Remplacement du jury (optionnel)</label>
                      <select className="w-full px-4 py-2 bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D84E0]">
                        <option>Conserver le même jury</option>
                        <option>Dr. Ravelonarivo</option>
                        <option>Pr. Rasoarimanana</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setModalStep(2)}
                      className="px-6 py-2 bg-[#F0F5FB] text-[#637799] rounded-lg text-sm font-medium hover:bg-[#EAF4FF] transition-colors"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() => setModalStep(4)}
                      className="px-6 py-2 bg-[#1A4BA8] text-white rounded-lg text-sm font-medium hover:bg-[#0D1F4E] transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {modalStep === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1D3A] mb-4">Confirmation de notification</h3>
                  <div className="space-y-4">
                    <div className="bg-[#EAF4FF] border border-[#2D84E0] rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-[#2D84E0]" />
                        <p className="font-medium text-[#0B1D3A]">Récapitulatif des changements</p>
                      </div>
                      <ul className="text-sm text-[#637799] space-y-1 ml-8">
                        <li>• Date: 15/09/2026 → 20/09/2026</li>
                        <li>• Heure: 09:00 → 14:00</li>
                        <li>• Salle: Salle A101 → Amphithéâtre C1</li>
                        <li>• Jury: Remplacement de M. Andriamanitra par Dr. Ravelonarivo</li>
                      </ul>
                    </div>
                    <div className="bg-[#F0F5FB] border border-[#DDEAF7] rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Bell className="w-5 h-5 text-[#2D84E0]" />
                        <p className="font-medium text-[#0B1D3A]">Notifications à envoyer</p>
                      </div>
                      <ul className="text-sm text-[#637799] space-y-1 ml-8">
                        <li>• Étudiant: Rakoto Jean (email)</li>
                        <li>• Jury: Dr. Randria, Pr. Rasoa, Dr. Ravelonarivo (email)</li>
                        <li>• Scolarité: admin@emit.mg (email)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setModalStep(3)}
                      className="px-6 py-2 bg-[#F0F5FB] text-[#637799] rounded-lg text-sm font-medium hover:bg-[#EAF4FF] transition-colors"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() => { setModalOpen(false); setModalStep(1); }}
                      className="px-6 py-2 bg-[#1A4BA8] text-white rounded-lg text-sm font-medium hover:bg-[#0D1F4E] transition-colors"
                    >
                      Confirmer et envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
