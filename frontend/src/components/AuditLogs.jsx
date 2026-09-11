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
  Filter,
  Clock,
  Shield,
  MapPin,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  RefreshCw
} from 'lucide-react';

const AuditLogs = () => {
  // État pour les journaux d'activité
  const [auditLogs, setAuditLogs] = useState([]);

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour les filtres
  const [actionFilter, setActionFilter] = useState('toutes');
  const [userFilter, setUserFilter] = useState('tous');

  // Données de démonstration
  useEffect(() => {
    setAuditLogs([
      {
        id: 1,
        date: '2026-09-15',
        heure: '09:15:32',
        utilisateur: 'Admin Scolarité',
        role: 'scolarite',
        action: 'Modification de jury',
        details: 'Remplacement de M. Andriamanitra par Dr. Ravelonarivo',
        ip: '192.168.1.105',
        initiales: 'AS'
      },
      {
        id: 2,
        date: '2026-09-15',
        heure: '08:45:10',
        utilisateur: 'Dr. Randria',
        role: 'president_jury',
        action: 'PV signé',
        details: 'Signature électronique du PV pour Rakoto Jean',
        ip: '192.168.1.42',
        initiales: 'DR'
      },
      {
        id: 3,
        date: '2026-09-14',
        heure: '16:30:45',
        utilisateur: 'Admin Scolarité',
        role: 'scolarite',
        action: 'Attribution de salle',
        details: 'Salle A102 attribuée à la soutenance de Rasoa Marie',
        ip: '192.168.1.105',
        initiales: 'AS'
      },
      {
        id: 4,
        date: '2026-09-14',
        heure: '14:20:18',
        utilisateur: 'Pr. Rasoa',
        role: 'rapporteur',
        action: 'Dépôt de rapport',
        details: 'Rapport d\'évaluation soumis pour Randria Paul',
        ip: '192.168.1.67',
        initiales: 'PR'
      },
      {
        id: 5,
        date: '2026-09-14',
        heure: '11:10:55',
        utilisateur: 'Admin Scolarité',
        role: 'scolarite',
        action: 'Création de promotion',
        details: 'Nouvelle promotion Master 2 - Génie Logiciel créée',
        ip: '192.168.1.105',
        initiales: 'AS'
      },
      {
        id: 6,
        date: '2026-09-13',
        heure: '15:45:30',
        utilisateur: 'Dr. Andriamanitra',
        role: 'enseignant',
        action: 'Indisponibilité déclarée',
        details: 'Congé du 10/09 au 20/09/2026',
        ip: '192.168.1.89',
        initiales: 'DA'
      },
      {
        id: 7,
        date: '2026-09-13',
        heure: '10:25:42',
        utilisateur: 'Admin Scolarité',
        role: 'scolarite',
        action: 'Convocation envoyée',
        details: 'Convocation envoyée au jury pour Andriamanitra Cécile',
        ip: '192.168.1.105',
        initiales: 'AS'
      },
      {
        id: 8,
        date: '2026-09-12',
        heure: '09:00:15',
        utilisateur: 'Rakoto Jean',
        role: 'etudiant',
        action: 'Dépôt de mémoire',
        details: 'Fichier "Système de gestion de soutenances.pdf" déposé',
        ip: '192.168.1.234',
        initiales: 'RJ'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge d'action
  const getActionBadge = (action) => {
    const actionConfig = {
      'Modification de jury': {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        icon: Edit
      },
      'PV signé': {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        icon: CheckCircle
      },
      'Attribution de salle': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: MapPin
      },
      'Dépôt de rapport': {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        icon: FileText
      },
      'Création de promotion': {
        bg: 'bg-[#95C5F2]',
        text: 'text-[#050840]',
        icon: Users
      },
      'Indisponibilité déclarée': {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: AlertTriangle
      },
      'Convocation envoyée': {
        bg: 'bg-cyan-100',
        text: 'text-cyan-700',
        icon: Bell
      },
      'Dépôt de mémoire': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: FileText
      }
    };

    const config = actionConfig[action] || actionConfig['Dépôt de mémoire'];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} />
        {action}
      </span>
    );
  };

  // Fonction pour obtenir le badge de rôle
  const getRoleBadge = (role) => {
    const roleConfig = {
      scolarite: {
        bg: 'bg-[#050840]',
        text: 'text-white',
        label: 'Scolarité'
      },
      president_jury: {
        bg: 'bg-[#95C5F2]',
        text: 'text-[#050840]',
        label: 'Président Jury'
      },
      rapporteur: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        label: 'Rapporteur'
      },
      enseignant: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        label: 'Enseignant'
      },
      etudiant: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'Étudiant'
      }
    };

    const config = roleConfig[role] || roleConfig.enseignant;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Éléments du menu de navigation
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'depots', label: 'Dépôts', icon: FileText },
    { id: 'soutenances', label: 'Soutenances', icon: Calendar },
    { id: 'formations', label: 'Formations & Promotions', icon: Users },
    { id: 'utilisateurs', label: 'Utilisateurs & Jurys', icon: User },
    { id: 'audit_logs', label: 'Journaux d\'Activité', icon: Shield },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const activeMenu = 'audit_logs';

  // Types d'actions uniques pour les filtres
  const actionTypes = ['toutes', ...new Set(auditLogs.map(log => log.action))];

  // Utilisateurs uniques pour les filtres
  const userTypes = ['tous', ...new Set(auditLogs.map(log => log.utilisateur))];

  // Filtrer les journaux
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.utilisateur.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === 'toutes' || log.action === actionFilter;
    const matchesUser = userFilter === 'tous' || log.utilisateur === userFilter;

    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="min-h-screen bg-[#EBF3FA] font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
          {/* Logo Section */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.emit.png" 
                alt="Logo EMIT" 
                className="w-12 h-12 rounded-2xl object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-12 h-12 bg-gradient-to-br from-[#050840] to-[#95C5F2] rounded-2xl flex items-center justify-center shadow-lg hidden">
                <span className="text-white font-bold text-lg">EM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#050840]">EMIT</h1>
                <p className="text-xs text-slate-500">Fianarantsoa</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#95C5F2] text-[#050840] shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-200">
              <LogOut size={20} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72 p-8 overflow-y-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#050840] mb-2">Journaux d'Activité</h1>
                <p className="text-slate-500">Historique complet des actions effectuées dans le système</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-100 transition-all">
                  <RefreshCw size={18} />
                  <span>Actualiser</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#050840] text-white rounded-full font-bold hover:bg-[#0B0C3C] transition-all">
                  <Download size={18} />
                  <span>Exporter</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par utilisateur, action ou détails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
              />
            </div>
          </header>

          {/* Filters */}
          <section className="mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">Filtres :</span>
                </div>
                
                <div className="flex-1">
                  <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  >
                    {actionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type === 'toutes' ? 'Toutes les actions' : type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  >
                    {userTypes.map((user) => (
                      <option key={user} value={user}>
                        {user === 'tous' ? 'Tous les utilisateurs' : user}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActionFilter('toutes');
                    setUserFilter('tous');
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition-all"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </section>

          {/* Audit Logs Table */}
          <section>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Heure</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Utilisateur</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Détails</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Adresse IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-[#050840]">
                              <Calendar size={14} />
                              <span>{log.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock size={12} />
                              <span>{log.heure}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">{log.initiales}</span>
                            </div>
                            <div>
                              <p className="font-medium text-[#050840]">{log.utilisateur}</p>
                              {getRoleBadge(log.role)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getActionBadge(log.action)}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 max-w-xs truncate">{log.details}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={14} />
                            <span className="font-mono">{log.ip}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredLogs.length === 0 && (
                <div className="p-12 text-center">
                  <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Aucun journal d'activité trouvé</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-slate-500">
                Affichage de {filteredLogs.length} sur {auditLogs.length} entrées
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-all disabled:opacity-50" disabled>
                  Précédent
                </button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-all">
                  Suivant
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuditLogs;
