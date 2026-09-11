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
  Plus,
  X,
  Edit,
  Download,
  GraduationCap,
  BookOpen,
  Calendar as CalendarIcon,
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const PromotionManagement = () => {
  // État pour les promotions
  const [promotions, setPromotions] = useState([]);

  // État pour la modale
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomMention: '',
    niveau: '',
    anneeUniversitaire: '',
    responsable: ''
  });

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour les KPI
  const [kpi, setKpi] = useState({
    totalFormations: 12,
    promotionsActives: 8,
    totalEtudiants: 342
  });

  // Données de démonstration
  useEffect(() => {
    setPromotions([
      {
        id: 1,
        intitule: 'Master 2 - Génie Logiciel & Bases de Données',
        code: 'GB',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        etudiantsInscrits: 45,
        statut: 'inscriptions_ouvertes'
      },
      {
        id: 2,
        intitule: 'Master 2 - Systèmes & Réseaux Télécoms',
        code: 'STR',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        etudiantsInscrits: 38,
        statut: 'sessions_en_cours'
      },
      {
        id: 3,
        intitule: 'Master 1 - Gestion & Business Intelligence',
        code: 'GB',
        mention: 'Gestion',
        anneeUniversitaire: '2025 - 2026',
        etudiantsInscrits: 52,
        statut: 'inscriptions_ouvertes'
      },
      {
        id: 4,
        intitule: 'Master 2 - Finance & Comptabilité',
        code: 'FC',
        mention: 'Gestion',
        anneeUniversitaire: '2024 - 2025',
        etudiantsInscrits: 41,
        statut: 'cloturee'
      },
      {
        id: 5,
        intitule: 'Licence 3 - Informatique de Gestion',
        code: 'IG',
        mention: 'Informatique',
        anneeUniversitaire: '2025 - 2026',
        etudiantsInscrits: 67,
        statut: 'sessions_en_cours'
      },
      {
        id: 6,
        intitule: 'Licence 3 - Économie & Management',
        code: 'EM',
        mention: 'Économie',
        anneeUniversitaire: '2025 - 2026',
        etudiantsInscrits: 58,
        statut: 'inscriptions_ouvertes'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (statut) => {
    const statusConfig = {
      inscriptions_ouvertes: {
        bg: 'bg-[#95C5F2]',
        text: 'text-[#050840]',
        label: 'Inscriptions ouvertes'
      },
      sessions_en_cours: {
        bg: 'bg-[#050840]',
        text: 'text-white',
        label: 'Sessions en cours'
      },
      cloturee: {
        bg: 'bg-slate-200',
        text: 'text-slate-600',
        label: 'Clôturée'
      }
    };

    const config = statusConfig[statut] || statusConfig.inscriptions_ouvertes;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Éléments du menu de navigation
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'depots', label: 'Dépôts', icon: FileText },
    { id: 'soutenances', label: 'Soutenances', icon: Calendar },
    { id: 'formations', label: 'Formations & Promotions', icon: GraduationCap },
    { id: 'etudiants', label: 'Étudiants', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const activeMenu = 'formations';

  // Filtrer les promotions
  const filteredPromotions = promotions.filter(promo =>
    promo.intitule.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.mention.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      intitule: `${formData.niveau} - ${formData.nomMention}`,
      code: formData.nomMention.substring(0, 2).toUpperCase(),
      mention: formData.niveau.includes('Licence') ? 'Informatique' : 'Gestion',
      anneeUniversitaire: formData.anneeUniversitaire,
      etudiantsInscrits: 0,
      statut: 'inscriptions_ouvertes'
    };
    setPromotions([...promotions, newPromotion]);
    setModalOpen(false);
    setFormData({
      nomMention: '',
      niveau: '',
      anneeUniversitaire: '',
      responsable: ''
    });
  };

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
                <h1 className="text-3xl font-bold text-[#050840] mb-2">Gestion des Formations & Promotions</h1>
                <p className="text-slate-500">Organisation des parcours Master (GB, IG, STR) et Licences</p>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une mention..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-full hover:bg-[#7DB5EC] transition-all shadow-md"
                >
                  <Plus size={20} />
                  <span>Créer une Promotion</span>
                </button>
              </div>
            </div>
          </header>

          {/* KPI Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Formations */}
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Total Formations</p>
                    <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.totalFormations}</p>
                    <p className="text-xs text-slate-400">Parcours disponibles</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#050840] to-[#0a1040] rounded-2xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-7 h-7 text-[#95C5F2]" />
                  </div>
                </div>
              </div>

              {/* Promotions Actives */}
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Promotions Actives</p>
                    <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.promotionsActives}</p>
                    <p className="text-xs text-slate-400">En cours d'inscription</p>
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
                    <p className="text-xs text-slate-400">Inscrits aux soutenances</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mentions & Parcours Cards */}
          <section>
            <h2 className="text-lg font-semibold text-[#050840] mb-4">Mentions & Parcours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPromotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#050840] text-sm">{promotion.code}</p>
                        <p className="text-xs text-slate-500">{promotion.mention}</p>
                      </div>
                    </div>
                    {getStatusBadge(promotion.statut)}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#050840] mb-2">{promotion.intitule}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <CalendarIcon size={16} />
                      <span>{promotion.anneeUniversitaire}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} />
                      <span>{promotion.etudiantsInscrits} étudiants inscrits</span>
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
        </main>
      </div>

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
                <label className="block text-sm font-medium text-[#050840] mb-2">Nom de la mention</label>
                <input
                  type="text"
                  name="nomMention"
                  value={formData.nomMention}
                  onChange={handleInputChange}
                  placeholder="Ex: Génie Logiciel & Bases de Données"
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
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
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
                <label className="block text-sm font-medium text-[#050840] mb-2">Responsable de parcours</label>
                <input
                  type="text"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleInputChange}
                  placeholder="Ex: Dr. Randria Jean"
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
