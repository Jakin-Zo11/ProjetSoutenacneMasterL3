import React, { useState } from 'react';
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
  Download,
  FileSpreadsheet,
  File,
  Eye,
  Calendar as CalendarIcon,
  MapPin,
  CheckCircle,
  Clock,
  Filter,
  X,
  Printer,
  Share2
} from 'lucide-react';

const ExportReports = () => {
  // État pour l'export sélectionné
  const [selectedExport, setSelectedExport] = useState(null);

  // État pour le format sélectionné
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  // État pour la modale d'aperçu
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // État de chargement
  const [isGenerating, setIsGenerating] = useState(false);

  // Options d'exportation
  const exportOptions = [
    {
      id: 'planning',
      title: 'Planning Global des Soutenances',
      description: 'Calendrier complet de toutes les soutenances programmées avec dates, heures, salles et jurys',
      icon: CalendarIcon,
      color: 'from-blue-500 to-blue-600',
      formats: ['pdf', 'excel', 'csv']
    },
    {
      id: 'pvs',
      title: 'Liste des PVs Signés par Promotion',
      description: 'Rapport détaillé des procès-verbaux signés classés par promotion et mention',
      icon: FileText,
      color: 'from-emerald-500 to-emerald-600',
      formats: ['pdf', 'excel']
    },
    {
      id: 'salles',
      title: 'Répartition des Salles et Équipements',
      description: 'Inventaire des salles, équipements disponibles et taux d\'occupation',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      formats: ['pdf', 'excel', 'csv']
    },
    {
      id: 'etudiants',
      title: 'Liste des Étudiants par Promotion',
      description: 'Effectif des étudiants inscrits par niveau, mention et spécialité',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      formats: ['pdf', 'excel', 'csv']
    },
    {
      id: 'jurys',
      title: 'Composition des Jurys',
      description: 'Liste des membres de jury avec leurs disponibilités et affectations',
      icon: CheckCircle,
      color: 'from-cyan-500 to-cyan-600',
      formats: ['pdf', 'excel']
    },
    {
      id: 'statistiques',
      title: 'Rapport Statistique Global',
      description: 'Synthèse des statistiques de la session : soutenances, taux de réussite, moyennes',
      icon: FileSpreadsheet,
      color: 'from-rose-500 to-rose-600',
      formats: ['pdf', 'excel']
    }
  ];

  // Formats disponibles
  const formats = [
    { id: 'pdf', label: 'PDF Institutionnel', icon: File, description: 'Document officiel avec entête EMIT' },
    { id: 'excel', label: 'Excel (.xlsx)', icon: FileSpreadsheet, description: 'Tableur avec mise en forme' },
    { id: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Données brutes séparées par virgules' }
  ];

  // Éléments du menu de navigation
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'depots', label: 'Dépôts', icon: FileText },
    { id: 'soutenances', label: 'Soutenances', icon: Calendar },
    { id: 'formations', label: 'Formations & Promotions', icon: Users },
    { id: 'utilisateurs', label: 'Utilisateurs & Jurys', icon: User },
    { id: 'export', label: 'Export & Rapports', icon: Download },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const activeMenu = 'export';

  // Génération du document
  const handleGenerate = () => {
    if (!selectedExport) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewModalOpen(true);
    }, 2000);
  };

  // Téléchargement du document
  const handleDownload = () => {
    console.log(`Téléchargement ${selectedExport.title} en ${selectedFormat}`);
    setPreviewModalOpen(false);
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
                src="/Logo-emit.png" 
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
                <h1 className="text-3xl font-bold text-[#050840] mb-2">Export & Rapports</h1>
                <p className="text-slate-500">Génération et téléchargement des documents administratifs</p>
              </div>
            </div>
          </header>

          {/* Export Options Grid */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#050840] mb-4">Types d'Export</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedExport?.id === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedExport(option)}
                    className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-[#95C5F2] shadow-md' 
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-[#95C5F2] rounded-full flex items-center justify-center">
                          <CheckCircle size={14} className="text-[#050840]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#050840] mb-2">{option.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{option.description}</p>
                    <div className="flex items-center gap-2">
                      {option.formats.map((format) => (
                        <span key={format} className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                          {format.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Format Selection */}
          {selectedExport && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-[#050840] mb-4">Format d'Export</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formats.map((format) => {
                    const Icon = format.icon;
                    const isFormatSupported = selectedExport.formats.includes(format.id);
                    const isSelected = selectedFormat === format.id;
                    
                    return (
                      <button
                        key={format.id}
                        onClick={() => isFormatSupported && setSelectedFormat(format.id)}
                        disabled={!isFormatSupported}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          !isFormatSupported
                            ? 'border-slate-100 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-[#95C5F2] bg-[#95C5F2]/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={20} className={isSelected ? 'text-[#050840]' : 'text-slate-400'} />
                          <span className={`font-medium ${isSelected ? 'text-[#050840]' : 'text-slate-600'}`}>
                            {format.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{format.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Generate Button */}
          {selectedExport && (
            <section className="mb-8">
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setSelectedExport(null)}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-100 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-8 py-3 bg-[#050840] text-white rounded-full font-bold hover:bg-[#0B0C3C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Génération en cours...</span>
                    </>
                  ) : (
                    <>
                      <Eye size={20} />
                      <span>Aperçu & Télécharger</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          )}

          {/* Recent Exports */}
          <section>
            <h2 className="text-lg font-semibold text-[#050840] mb-4">Exports Récents</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Planning Global Soutenances', date: '2026-09-15 14:30', format: 'PDF', size: '2.4 MB' },
                  { name: 'PVs Signés Master 2', date: '2026-09-14 10:15', format: 'Excel', size: '1.8 MB' },
                  { name: 'Répartition Salles', date: '2026-09-13 16:45', format: 'CSV', size: '45 KB' }
                ].map((export, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#95C5F2] rounded-lg flex items-center justify-center">
                        <File size={20} className="text-[#050840]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#050840]">{export.name}</p>
                        <p className="text-xs text-slate-500">{export.date} • {export.format} • {export.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all">
                        <Share2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Preview Modal */}
      {previewModalOpen && selectedExport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#050840]">Aperçu du Document</h2>
                  <p className="text-sm text-slate-500">{selectedExport.title} • {selectedFormat.toUpperCase()}</p>
                </div>
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Document Preview */}
              <div className="bg-slate-50 rounded-2xl p-8 mb-6">
                {/* EMIT Header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#050840] to-[#95C5F2] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">EM</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#050840]">EMIT Fianarantsoa</h3>
                    <p className="text-sm text-slate-500">École de Management et d'Innovation Technologique</p>
                  </div>
                </div>

                {/* Document Title */}
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-[#050840] mb-2">{selectedExport.title}</h4>
                  <p className="text-sm text-slate-500">Généré le {new Date().toLocaleDateString('fr-FR')}</p>
                </div>

                {/* Sample Content */}
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="font-medium text-[#050840]">Total des enregistrements</span>
                    <span className="text-slate-600">42</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="font-medium text-[#050840]">Session universitaire</span>
                    <span className="text-slate-600">2025-2026</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="font-medium text-[#050840]">Format</span>
                    <span className="text-slate-600">{selectedFormat.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-medium text-[#050840]">Statut</span>
                    <span className="text-emerald-600 font-medium">Prêt à télécharger</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-100 transition-all"
                >
                  Modifier
                </button>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-100 transition-all">
                    <Printer size={18} />
                    Imprimer
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-[#050840] text-white rounded-full font-bold hover:bg-[#0B0C3C] transition-all"
                  >
                    <Download size={18} />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportReports;
