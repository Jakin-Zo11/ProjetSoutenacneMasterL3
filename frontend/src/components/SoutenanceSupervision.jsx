import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  FileText,
  MapPin,
  CheckCircle,
  Clock,
  Send,
  Eye,
  MoreVertical,
  Download,
  Calendar
} from 'lucide-react';

const SoutenanceSupervision = () => {
  // État pour les filtres
  const [filters, setFilters] = useState({
    promotion: '',
    statut: '',
    search: ''
  });

  // État pour les données de soutenance
  const [soutenances, setSoutenances] = useState([]);

  // Liste des promotions disponibles
  const promotions = [
    { id: '', label: 'Toutes les promotions' },
    { id: 'master1-info', label: 'Master 1 - Informatique' },
    { id: 'master2-info', label: 'Master 2 - Informatique' },
    { id: 'licence3-gestion', label: 'Licence 3 - Gestion' },
    { id: 'licence3-eco', label: 'Licence 3 - Économie' }
  ];

  // Liste des statuts disponibles
  const statuts = [
    { id: '', label: 'Tous les statuts' },
    { id: 'depose', label: 'Déposé' },
    { id: 'convoque', label: 'Convoqué' },
    { id: 'soutenu', label: 'Soutenu' },
    { id: 'pv_signe', label: 'PV Signé' }
  ];

  // Charger les données de démonstration
  useEffect(() => {
    setSoutenances([
      {
        id: 1,
        etudiant: 'Rakoto Jean',
        promotion: 'Master 1 - Informatique',
        titre: 'Système de gestion de soutenances en ligne',
        statut: 'depose',
        date_depot: '2026-09-10',
        date_soutenance: null,
        salle: null
      },
      {
        id: 2,
        etudiant: 'Rasoa Marie',
        promotion: 'Licence 3 - Gestion',
        titre: 'Impact du digital sur les PME à Fianarantsoa',
        statut: 'convoque',
        date_depot: '2026-09-09',
        date_soutenance: '2026-09-20',
        salle: 'Salle A101'
      },
      {
        id: 3,
        etudiant: 'Randria Paul',
        promotion: 'Master 2 - Informatique',
        titre: 'Optimisation des réseaux IoT agricoles',
        statut: 'soutenu',
        date_depot: '2026-09-08',
        date_soutenance: '2026-09-15',
        salle: 'Amphithéâtre C1'
      },
      {
        id: 4,
        etudiant: 'Andriamanitra Cécile',
        promotion: 'Licence 3 - Économie',
        titre: 'Analyse de l\'économie informelle à Madagascar',
        statut: 'pv_signe',
        date_depot: '2026-09-07',
        date_soutenance: '2026-09-12',
        salle: 'Salle B205'
      },
      {
        id: 5,
        etudiant: 'Rakotomandimby Marc',
        promotion: 'Master 1 - Informatique',
        titre: 'Application mobile pour le suivi agricole',
        statut: 'depose',
        date_depot: '2026-09-06',
        date_soutenance: null,
        salle: null
      },
      {
        id: 6,
        etudiant: 'Raveloson Fara',
        promotion: 'Master 2 - Informatique',
        titre: 'Sécurité des transactions blockchain',
        statut: 'convoque',
        date_depot: '2026-09-05',
        date_soutenance: '2026-09-22',
        salle: 'Salle D102'
      }
    ]);
  }, []);

  // Gérer les changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Filtrer les soutenances
  const filteredSoutenances = soutenances.filter((soutenance) => {
    const matchPromotion = !filters.promotion || soutenance.promotion === filters.promotion;
    const matchStatut = !filters.statut || soutenance.statut === filters.statut;
    const matchSearch = !filters.search || 
      soutenance.etudiant.toLowerCase().includes(filters.search.toLowerCase()) ||
      soutenance.titre.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchPromotion && matchStatut && matchSearch;
  });

  // Obtenir le badge de statut
  const getStatusBadge = (statut) => {
    const statusConfig = {
      depose: {
        bg: 'bg-blue-50',
        text: 'text-[#050840]',
        border: 'border-[#95C5F2]',
        label: 'Dépôt reçu',
        icon: FileText
      },
      convoque: {
        bg: 'bg-sky-100',
        text: 'text-sky-800',
        border: 'border-sky-300',
        label: 'Convocation transmise',
        icon: Send
      },
      soutenu: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300',
        label: 'Soutenu',
        icon: Clock
      },
      pv_signe: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-300',
        label: 'Terminé & PV Signé',
        icon: CheckCircle
      }
    };

    const config = statusConfig[statut] || statusConfig.depose;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  // Générer la convocation
  const handleGenerateConvocation = (soutenanceId) => {
    console.log('Générer convocation pour:', soutenanceId);
    // Implémenter la logique de génération de convocation
  };

  // Attribuer une salle
  const handleAssignRoom = (soutenanceId) => {
    console.log('Attribuer salle pour:', soutenanceId);
    // Implémenter la logique d'attribution de salle
  };

  // Consulter le PV
  const handleConsultPV = (soutenanceId) => {
    console.log('Consulter PV pour:', soutenanceId);
    // Implémenter la logique de consultation du PV
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      promotion: '',
      statut: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#EBF3FA] font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#050840] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Supervision des Soutenances</h1>
              <p className="text-[#95C5F2] text-sm mt-1">Workflow - EMIT Fianarantsoa</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-[#95C5F2] text-[#050840] px-4 py-2 rounded-lg font-medium hover:bg-[#7DB5EC] transition-colors">
                <Download size={18} />
                <span className="hidden sm:inline">Exporter</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#050840]" />
            <h2 className="text-lg font-semibold text-[#050840]">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Rechercher par étudiant ou titre..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95C5F2]"
                />
              </div>
            </div>

            {/* Filtre Promotion */}
            <div>
              <select
                name="promotion"
                value={filters.promotion}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95C5F2] bg-white"
              >
                {promotions.map((promo) => (
                  <option key={promo.id} value={promo.id}>
                    {promo.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre Statut */}
            <div>
              <select
                name="statut"
                value={filters.statut}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95C5F2] bg-white"
              >
                {statuts.map((statut) => (
                  <option key={statut.id} value={statut.id}>
                    {statut.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bouton de réinitialisation */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-sm text-[#050840] hover:text-[#95C5F2] font-medium transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <p className="text-xs text-gray-600">Déposés</p>
            <p className="text-2xl font-bold text-[#050840]">
              {soutenances.filter(s => s.statut === 'depose').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-sky-500">
            <p className="text-xs text-gray-600">Convoqués</p>
            <p className="text-2xl font-bold text-[#050840]">
              {soutenances.filter(s => s.statut === 'convoque').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
            <p className="text-xs text-gray-600">Soutenus</p>
            <p className="text-2xl font-bold text-[#050840]">
              {soutenances.filter(s => s.statut === 'soutenu').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-emerald-500">
            <p className="text-xs text-gray-600">PV Signés</p>
            <p className="text-2xl font-bold text-[#050840]">
              {soutenances.filter(s => s.statut === 'pv_signe').length}
            </p>
          </div>
        </div>

        {/* Tableau des soutenances */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#050840]">
                État d'avancement des dossiers
              </h2>
              <span className="text-sm text-gray-600">
                {filteredSoutenances.length} résultat(s)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Étudiant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Promotion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Titre du mémoire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Soutenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Salle
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSoutenances.map((soutenance) => (
                  <tr key={soutenance.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{soutenance.etudiant}</p>
                      <p className="text-xs text-gray-500 mt-1">Dépôt: {soutenance.date_depot}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{soutenance.promotion}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-xs truncate">
                        {soutenance.titre}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(soutenance.statut)}
                    </td>
                    <td className="px-6 py-4">
                      {soutenance.date_soutenance ? (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar size={14} />
                          <span>{soutenance.date_soutenance}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {soutenance.salle ? (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin size={14} />
                          <span>{soutenance.salle}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Générer Convocation */}
                        {soutenance.statut === 'depose' && (
                          <button
                            onClick={() => handleGenerateConvocation(soutenance.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#95C5F2] text-[#050840] text-xs font-medium rounded-lg hover:bg-[#7DB5EC] transition-colors"
                            title="Générer convocation"
                          >
                            <Send size={14} />
                            <span className="hidden sm:inline">Convocation</span>
                          </button>
                        )}

                        {/* Attribuer Salle */}
                        {(soutenance.statut === 'convoque' || soutenance.statut === 'depose') && !soutenance.salle && (
                          <button
                            onClick={() => handleAssignRoom(soutenance.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#050840] text-white text-xs font-medium rounded-lg hover:bg-[#050840]/90 transition-colors"
                            title="Attribuer salle"
                          >
                            <MapPin size={14} />
                            <span className="hidden sm:inline">Salle</span>
                          </button>
                        )}

                        {/* Consulter PV */}
                        {soutenance.statut === 'pv_signe' && (
                          <button
                            onClick={() => handleConsultPV(soutenance.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                            title="Consulter PV"
                          >
                            <Eye size={14} />
                            <span className="hidden sm:inline">PV</span>
                          </button>
                        )}

                        {/* Plus d'options */}
                        <button
                          className="p-1.5 text-gray-600 hover:text-[#050840] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Plus d'options"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message si aucun résultat */}
          {filteredSoutenances.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 mb-4">Essayez de modifier vos filtres de recherche.</p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-[#95C5F2] text-[#050840] px-4 py-2 rounded-lg font-medium hover:bg-[#7DB5EC] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SoutenanceSupervision;
