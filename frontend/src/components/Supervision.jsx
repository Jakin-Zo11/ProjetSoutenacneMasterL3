import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Download,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  CheckCircle,
  Mail,
  FileCheck,
  Printer,
  Eye,
  Shield,
  UserCheck,
  User,
  ArrowRight,
  FileText
} from 'lucide-react';

const Supervision = () => {
  // État pour les soutenances
  const [soutenances, setSoutenances] = useState([]);

  // État pour la modale PV
  const [pvModalOpen, setPvModalOpen] = useState(false);
  const [selectedPv, setSelectedPv] = useState(null);

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour les filtres de statut
  const [statusFilter, setStatusFilter] = useState('toutes');

  // État pour les KPI
  const [kpi, setKpi] = useState({
    totalSoutenances: 42,
    soutenancesDuJour: 8,
    pvsEnAttente: 12,
    pvsValides: 18
  });

  // Données de démonstration
  useEffect(() => {
    setSoutenances([
      {
        id: 1,
        etudiant: 'Rakoto Jean',
        sujet: 'Système de gestion de soutenances en ligne',
        date: '2026-09-15',
        heure: '09:00',
        salle: 'Salle A101',
        jury: {
          president: 'Dr. Randria',
          rapporteur: 'Pr. Rasoa',
          examinateur: 'M. Andriamanitra'
        },
        statut: 'pv_signe',
        note: 16.5,
        mention: 'Très Bien',
        initiales: 'RJ'
      },
      {
        id: 2,
        etudiant: 'Rasoa Marie',
        sujet: 'Impact du digital sur les PME à Fianarantsoa',
        date: '2026-09-16',
        heure: '14:00',
        salle: 'Amphi B',
        jury: {
          president: 'Pr. Randria',
          rapporteur: 'Dr. Andriamanitra',
          examinateur: 'Mme. Rasoarimanana'
        },
        statut: 'soutenue',
        note: null,
        mention: null,
        initiales: 'RM'
      },
      {
        id: 3,
        etudiant: 'Randria Paul',
        sujet: 'Optimisation des réseaux IoT agricoles',
        date: '2026-09-17',
        heure: '10:00',
        salle: 'Salle C205',
        jury: {
          president: 'Dr. Rasoa',
          rapporteur: 'Pr. Andriamanitra',
          examinateur: 'M. Ravelonarivo'
        },
        statut: 'convoquee',
        note: null,
        mention: null,
        initiales: 'RP'
      },
      {
        id: 4,
        etudiant: 'Andriamanitra Cécile',
        sujet: 'Analyse de l\'économie informelle à Madagascar',
        date: '2026-09-18',
        heure: '11:00',
        salle: 'Salle D102',
        jury: {
          president: 'Pr. Rasoarimanana',
          rapporteur: 'Dr. Ravelonarivo',
          examinateur: 'Mme. Randria'
        },
        statut: 'depose',
        note: null,
        mention: null,
        initiales: 'AC'
      },
      {
        id: 5,
        etudiant: 'Ravelonarivo Luc',
        sujet: 'Intelligence artificielle pour l\'éducation',
        date: '2026-09-19',
        heure: '15:00',
        salle: 'Salle E301',
        jury: {
          president: 'Dr. Randria',
          rapporteur: 'Pr. Rasoa',
          examinateur: 'M. Andriamanitra'
        },
        statut: 'pv_signe',
        note: 14.0,
        mention: 'Bien',
        initiales: 'RL'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge de statut (palette EMIT stricte)
  const getStatusBadge = (statut) => {
    const statusConfig = {
      depose: {
        bg: 'bg-[#EAF4FF]',
        text: 'text-[#050840]',
        label: 'Mémoire Déposé',
        step: 1
      },
      convoquee: {
        bg: 'bg-[#EAF4FF]',
        text: 'text-[#050840]',
        label: 'Programmée',
        step: 2
      },
      soutenue: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'En cours',
        step: 3
      },
      pv_signe: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'PV Validé',
        step: 4
      },
      attente_pv: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'Attente PV',
        step: 3
      }
    };

    const config = statusConfig[statut] || statusConfig.depose;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Fonction pour obtenir le stepper de progression
  const getProgressStepper = (statut) => {
    const steps = [
      { id: 'depose', label: 'Dépôt', icon: FileText },
      { id: 'convoquee', label: 'Convocation', icon: Mail },
      { id: 'soutenue', label: 'Soutenue', icon: CalendarIcon },
      { id: 'pv_signe', label: 'PV Signé', icon: FileCheck }
    ];

    const currentStep = steps.findIndex(step => step.id === statut);

    return (
      <div className="flex items-center gap-1">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                isActive ? 'bg-[#95C5F2] text-[#050840]' : 'bg-slate-200 text-slate-400'
              }`}>
                <Icon size={12} />
              </div>
              {index < steps.length - 1 && (
                <ArrowRight size={12} className={isActive ? 'text-[#95C5F2]' : 'text-slate-200'} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Filtrer les soutenances
  const filteredSoutenances = soutenances.filter(soutenance => {
    const matchesSearch = 
      soutenance.etudiant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soutenance.sujet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soutenance.jury.president.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'toutes' || soutenance.statut === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Ouvrir la modale PV
  const openPvModal = (soutenance) => {
    setSelectedPv(soutenance);
    setPvModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#050840] mb-2">Supervision des Soutenances</h1>
            <p className="text-sm text-slate-600">Suivi du workflow complet, convocation des jurys et validation des procès-verbaux</p>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par étudiant, sujet ou jury..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={18} />
              <span>Exporter</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-full hover:bg-[#7DB5EC] transition-all">
              <Mail size={18} />
              <span>Convocations</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Soutenances */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Total Soutenances</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.totalSoutenances}</p>
                <p className="text-xs text-slate-400">Session en cours</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#050840] to-[#0a1040] rounded-2xl flex items-center justify-center shadow-lg">
                <CalendarIcon className="w-7 h-7 text-[#95C5F2]" />
              </div>
            </div>
          </div>

          {/* Soutenances du jour */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Soutenances du jour</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.soutenancesDuJour}</p>
                <p className="text-xs text-slate-400">Aujourd'hui</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#95C5F2] to-[#7DB5EC] rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* PVs en attente */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">PVs en attente</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.pvsEnAttente}</p>
                <p className="text-xs text-slate-400">À valider</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#FEF3C7] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg">
                <FileCheck className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* PVs Validés */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">PVs Validés</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.pvsValides}</p>
                <p className="text-xs text-slate-400">Archivés</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#E1F8F0] to-[#10B981] rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Filter Badges */}
      <section className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'toutes', label: 'Toutes' },
            { id: 'depose', label: 'Programmée' },
            { id: 'convoquee', label: 'En cours' },
            { id: 'attente_pv', label: 'Attente PV' },
            { id: 'pv_signe', label: 'PV Validé' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === filter.id
                  ? 'bg-[#95C5F2] text-[#050840]'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Workflow Table */}
      <section>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Étudiant & Sujet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Date, Heure & Salle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Jury</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Note</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSoutenances.map((soutenance) => (
                  <tr key={soutenance.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{soutenance.initiales}</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#050840]">{soutenance.etudiant}</p>
                          <p className="text-xs text-slate-500 max-w-xs truncate">{soutenance.sujet}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-[#050840]">
                          <CalendarIcon size={14} />
                          <span>{soutenance.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={14} />
                          <span>{soutenance.heure}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin size={14} />
                          <span>{soutenance.salle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <Shield size={12} className="text-[#050840]" />
                          <span className="text-slate-600">Prés: {soutenance.jury.president}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck size={12} className="text-[#050840]" />
                          <span className="text-slate-600">Rapp: {soutenance.jury.rapporteur}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(soutenance.statut)}
                    </td>
                    <td className="px-6 py-4">
                      {soutenance.note ? (
                        <span className="text-sm font-semibold text-[#050840]">{soutenance.note}/20</span>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all" title="Détails du dossier">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all" title="Convoquer">
                          <Mail size={16} />
                        </button>
                        {soutenance.statut === 'pv_signe' && (
                          <button
                            onClick={() => openPvModal(soutenance)}
                            className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all"
                            title="Consulter le PV"
                          >
                            <FileCheck size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal Aperçu PV */}
      {pvModalOpen && selectedPv && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#050840]">Procès-Verbal de Soutenance</h2>
                <button
                  onClick={() => setPvModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{selectedPv.initiales}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#050840]">{selectedPv.etudiant}</h3>
                    <p className="text-sm text-slate-600">{selectedPv.sujet}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <CalendarIcon size={14} />
                      <span className="text-xs text-slate-500">{selectedPv.date} à {selectedPv.heure}</span>
                      <MapPin size={14} />
                      <span className="text-xs text-slate-500">{selectedPv.salle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade & Mention */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#95C5F2] rounded-xl p-4 text-center">
                  <p className="text-sm text-[#050840] mb-1">Note Attribuée</p>
                  <p className="text-4xl font-bold text-[#050840]">{selectedPv.note}/20</p>
                </div>
                <div className="bg-[#050840] rounded-xl p-4 text-center">
                  <p className="text-sm text-white mb-1">Mention</p>
                  <p className="text-2xl font-bold text-white">{selectedPv.mention}</p>
                </div>
              </div>

              {/* Jury Signatures */}
              <div>
                <h4 className="text-sm font-semibold text-[#050840] mb-3">Signatures Électroniques</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#050840]" />
                      <div>
                        <p className="text-sm font-medium text-[#050840]">{selectedPv.jury.president}</p>
                        <p className="text-xs text-slate-500">Président du Jury</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-[#050840]" />
                      <div>
                        <p className="text-sm font-medium text-[#050840]">{selectedPv.jury.rapporteur}</p>
                        <p className="text-xs text-slate-500">Rapporteur</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-[#050840]" />
                      <div>
                        <p className="text-sm font-medium text-[#050840]">{selectedPv.jury.examinateur}</p>
                        <p className="text-xs text-slate-500">Examinateur</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-all">
                  <Download size={18} />
                  Télécharger PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#95C5F2] text-[#050840] font-bold rounded-xl hover:bg-[#7DB5EC] transition-all">
                  <Printer size={18} />
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supervision;
