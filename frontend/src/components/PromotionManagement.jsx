import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  X,
  Edit,
  Download,
  GraduationCap,
  BookOpen,
  Calendar as CalendarIcon,
  ChevronRight,
  Users,
  User
} from 'lucide-react';

const PromotionManagement = () => {
  // État pour les promotions
  const [promotions, setPromotions] = useState([]);

  // État pour la modale
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomPromo: '',
    niveau: '',
    parcours: '',
    anneeUniversitaire: '',
    effectif: '',
    delegue: ''
  });

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour le filtre de mention
  const [mentionFilter, setMentionFilter] = useState('toutes');

  // État pour les KPI
  const [kpi, setKpi] = useState({
    promotionsActives: 8,
    totalEtudiants: 342,
    parcoursDeployes: 12
  });

  // Données de démonstration
  useEffect(() => {
    setPromotions([
      {
        id: 1,
        nomPromo: 'FANAMBY',
        niveau: 'Master 2',
        parcours: 'GBD',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        effectif: 45,
        delegue: 'Rakoto Jean',
        statut: 'actif'
      },
      {
        id: 2,
        nomPromo: 'FANAMBY',
        niveau: 'Master 2',
        parcours: 'STR',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        effectif: 38,
        delegue: 'Rasoa Marie',
        statut: 'actif'
      },
      {
        id: 3,
        nomPromo: 'FANAMBY',
        niveau: 'Master 1',
        parcours: 'GBD',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        effectif: 52,
        delegue: 'Randria Paul',
        statut: 'actif'
      },
      {
        id: 4,
        nomPromo: 'FANAMBY',
        niveau: 'Master 2',
        parcours: 'FC',
        mention: 'Management',
        anneeUniversitaire: '2024 - 2025',
        effectif: 41,
        delegue: 'Andriamanitra Cécile',
        statut: 'cloture'
      },
      {
        id: 5,
        nomPromo: 'FANAMBY',
        niveau: 'Licence 3',
        parcours: 'IG',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        effectif: 67,
        delegue: 'Ravelonarivo Luc',
        statut: 'actif'
      },
      {
        id: 6,
        nomPromo: 'FANAMBY',
        niveau: 'Licence 3',
        parcours: 'EM',
        mention: 'Management',
        anneeUniversitaire: '2025 - 2026',
        effectif: 58,
        delegue: 'Rasoarimanana Sophie',
        statut: 'actif'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge de statut (palette EMIT stricte)
  const getStatusBadge = (statut) => {
    const statusConfig = {
      actif: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'Actif'
      },
      cloture: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'Clôturé'
      }
    };

    const config = statusConfig[statut] || statusConfig.actif;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Filtrer les promotions par recherche et mention
  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch =
      promo.nomPromo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.parcours.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.delegue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMention =
      mentionFilter === 'toutes' ||
      (mentionFilter === 'informatique' && promo.mention === 'Informatique') ||
      (mentionFilter === 'management' && promo.mention === 'Management');

    return matchesSearch && matchesMention;
  });

  // Gestion du formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'ajout de promotion
    const newPromotion = {
      id: promotions.length + 1,
      nomPromo: formData.nomPromo,
      niveau: formData.niveau,
      parcours: formData.parcours,
      mention: formData.niveau.includes('Licence') ? 'Informatique' : 'Informatique',
      anneeUniversitaire: formData.anneeUniversitaire,
      effectif: parseInt(formData.effectif) || 0,
      delegue: formData.delegue,
      statut: 'actif'
    };
    setPromotions([...promotions, newPromotion]);
    setModalOpen(false);
    setFormData({
      nomPromo: '',
      niveau: '',
      parcours: '',
      anneeUniversitaire: '',
      effectif: '',
      delegue: ''
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#050840] mb-2">Gestion des Promotions</h1>
            <p className="text-sm text-slate-600">Organisation des parcours Master (GBD, STR, IA) et Licences</p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une promotion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-full hover:bg-[#7DB5EC] transition-all"
            >
              <Plus size={18} />
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Promotions Actives */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Promotions Actives</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.promotionsActives}</p>
                <p className="text-xs text-slate-400">En cours</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#95C5F2] to-[#7DB5EC] rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Étudiants */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Total Étudiants</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.totalEtudiants}</p>
                <p className="text-xs text-slate-400">Inscrits</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#E1F8F0] to-[#10B981] rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Parcours Déployés */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Parcours Déployés</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.parcoursDeployes}</p>
                <p className="text-xs text-slate-400">Disponibles</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#050840] to-[#0a1040] rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-[#95C5F2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mention Filters */}
      <section className="mb-6">
        <div className="flex items-center gap-2">
          {[
            { id: 'toutes', label: 'Toutes' },
            { id: 'informatique', label: 'Informatique' },
            { id: 'management', label: 'Management' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setMentionFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mentionFilter === filter.id
                  ? 'bg-[#95C5F2] text-[#050840]'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Promotion Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <div
              key={promotion.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#050840] text-sm">{promotion.parcours}</p>
                    <p className="text-xs text-slate-500">{promotion.mention}</p>
                  </div>
                </div>
                {getStatusBadge(promotion.statut)}
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="font-bold text-[#050840] mb-2">{promotion.nomPromo}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-medium text-[#050840]">Niveau:</span>
                    <span>{promotion.niveau}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CalendarIcon size={14} />
                    <span>{promotion.anneeUniversitaire}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={14} />
                    <span>{promotion.effectif} étudiants</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <User size={14} />
                    <span>Délégué: {promotion.delegue}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#95C5F2] text-[#050840] rounded-xl text-xs font-medium hover:bg-[#7DB5EC] transition-all">
                  <ChevronRight size={16} />
                  Gérer
                </button>
                <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Création de Promotion */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#050840]">Créer une Promotion</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Nom de la promotion</label>
                <input
                  type="text"
                  name="nomPromo"
                  value={formData.nomPromo}
                  onChange={handleInputChange}
                  placeholder="Ex: FANAMBY"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Parcours</label>
                <select
                  name="parcours"
                  value={formData.parcours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionner un parcours</option>
                  <option value="GBD">GBD - Génie Logiciel & Bases de Données</option>
                  <option value="STR">STR - Systèmes & Réseaux Télécoms</option>
                  <option value="IA">IA - Intelligence Artificielle</option>
                  <option value="IG">IG - Informatique de Gestion</option>
                  <option value="FC">FC - Finance & Comptabilité</option>
                  <option value="EM">EM - Économie & Management</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Année universitaire</label>
                <select
                  name="anneeUniversitaire"
                  value={formData.anneeUniversitaire}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionner une année</option>
                  <option value="2025 - 2026">2025 - 2026</option>
                  <option value="2026 - 2027">2026 - 2027</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Effectif</label>
                <input
                  type="number"
                  name="effectif"
                  value={formData.effectif}
                  onChange={handleInputChange}
                  placeholder="Ex: 45"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Délégué</label>
                <input
                  type="text"
                  name="delegue"
                  value={formData.delegue}
                  onChange={handleInputChange}
                  placeholder="Ex: Rakoto Jean"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-xl hover:bg-[#7DB5EC] transition-all"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManagement;
