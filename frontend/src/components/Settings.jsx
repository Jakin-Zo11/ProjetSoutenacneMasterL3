import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Search,
  Bell,
  User,
  Save,
  X,
  Mail,
  Calendar as CalendarIcon,
  Clock,
  ToggleLeft,
  ToggleRight,
  Edit,
  Eye,
  Shield,
  Lock,
  Key,
  UserCheck
} from 'lucide-react';

const Settings = () => {
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('general');

  // État pour les paramètres généraux
  const [generalSettings, setGeneralSettings] = useState({
    anneeUniversitaire: '2025-2026',
    sessionMasterDebut: '2025-09-01',
    sessionMasterFin: '2026-01-31',
    sessionLicenceDebut: '2025-11-01',
    sessionLicenceFin: '2026-02-28'
  });

  // État pour les périodes de dépôt
  const [depositSettings, setDepositSettings] = useState({
    depotsOuverts: true,
    dateLimiteDepot: '2025-12-15'
  });

  // État pour les modèles d'emails
  const [emailTemplates, setEmailTemplates] = useState({
    convocationJury: `Cher {nom_jury},

Nous avons le plaisir de vous informer que vous avez été désigné comme {role} pour la soutenance de mémoire de {etudiant}.

Détails de la soutenance :
- Date : {date}
- Heure : {heure}
- Salle : {salle}
- Sujet : {sujet}

Nous vous remercions de votre participation.

Cordialement,
La Scolarité EMIT Fianarantsoa`,
    
    convocationEtudiant: `Cher {etudiant},

Nous vous informons que votre soutenance de mémoire a été programmée.

Détails de la soutenance :
- Date : {date}
- Heure : {heure}
- Salle : {salle}

Composition du jury :
- Président : {president}
- Rapporteur : {rapporteur}
- Examinateur : {examinateur}

Nous vous souhaitons bonne chance pour cette soutenance.

Cordialement,
La Scolarité EMIT Fianarantsoa`
  });

  // État pour l'édition de modèle
  const [editingTemplate, setEditingTemplate] = useState(null);

  // État de sauvegarde
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Éléments du menu de navigation
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'depots', label: 'Dépôts', icon: FileText },
    { id: 'soutenances', label: 'Soutenances', icon: Calendar },
    { id: 'formations', label: 'Formations & Promotions', icon: CalendarIcon },
    { id: 'utilisateurs', label: 'Utilisateurs & Jurys', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon }
  ];

  const activeMenu = 'settings';

  // Onglets secondaires
  const secondaryTabs = [
    { id: 'general', label: 'Général & Année Universitaire', icon: CalendarIcon },
    { id: 'depots', label: 'Périodes de Dépôt', icon: Clock },
    { id: 'emails', label: 'Notifications & Emails', icon: Mail },
    { id: 'securite', label: 'Sécurité & Rôles', icon: Shield }
  ];

  // Gestion de la sauvegarde
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
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
                <h1 className="text-3xl font-bold text-[#050840] mb-2">Paramètres du Système</h1>
                <p className="text-slate-500">Configuration générale, périodes de dépôt et modèles de notifications</p>
              </div>
            </div>
          </header>

          {/* Secondary Tabs */}
          <section className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {secondaryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#95C5F2] text-[#050840]'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tab Content */}
          <section className="mb-8">
            {activeTab === 'general' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-[#050840] mb-6">Général & Année Universitaire</h2>
                
                <div className="space-y-6">
                  {/* Année Universitaire */}
                  <div>
                    <label className="block text-sm font-medium text-[#050840] mb-2">
                      Année Universitaire Active
                    </label>
                    <select
                      value={generalSettings.anneeUniversitaire}
                      onChange={(e) => setGeneralSettings({...generalSettings, anneeUniversitaire: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                    </select>
                  </div>

                  {/* Session Master */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#050840] mb-4">Session de Soutenance - Master</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#050840] mb-2">
                          Date de début
                        </label>
                        <input
                          type="date"
                          value={generalSettings.sessionMasterDebut}
                          onChange={(e) => setGeneralSettings({...generalSettings, sessionMasterDebut: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#050840] mb-2">
                          Date de fin
                        </label>
                        <input
                          type="date"
                          value={generalSettings.sessionMasterFin}
                          onChange={(e) => setGeneralSettings({...generalSettings, sessionMasterFin: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Session Licence */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#050840] mb-4">Session de Soutenance - Licence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#050840] mb-2">
                          Date de début
                        </label>
                        <input
                          type="date"
                          value={generalSettings.sessionLicenceDebut}
                          onChange={(e) => setGeneralSettings({...generalSettings, sessionLicenceDebut: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#050840] mb-2">
                          Date de fin
                        </label>
                        <input
                          type="date"
                          value={generalSettings.sessionLicenceFin}
                          onChange={(e) => setGeneralSettings({...generalSettings, sessionLicenceFin: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'depots' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-[#050840] mb-6">Périodes de Dépôt des Mémoires</h2>
                
                <div className="space-y-6">
                  {/* Toggle Dépôts Ouverts */}
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                    <div>
                      <h3 className="font-semibold text-[#050840]">Ouverture des dépôts étudiants</h3>
                      <p className="text-sm text-slate-500">Permettre aux étudiants de déposer leurs mémoires</p>
                    </div>
                    <button
                      onClick={() => setDepositSettings({...depositSettings, depotsOuverts: !depositSettings.depotsOuverts})}
                      className="relative w-14 h-8 rounded-full transition-colors duration-200"
                    >
                      {depositSettings.depotsOuverts ? (
                        <div className="w-full h-full bg-[#95C5F2] rounded-full">
                          <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-slate-300 rounded-full">
                          <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Date Limite */}
                  <div>
                    <label className="block text-sm font-medium text-[#050840] mb-2">
                      Date limite de soumission
                    </label>
                    <input
                      type="date"
                      value={depositSettings.dateLimiteDepot}
                      onChange={(e) => setDepositSettings({...depositSettings, dateLimiteDepot: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Info Banner */}
                  <div className="bg-[#95C5F2]/20 border border-[#95C5F2] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#050840] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#050840]">Information importante</p>
                        <p className="text-sm text-slate-600">
                          Les dépôts seront automatiquement fermés après la date limite. Les étudiants ne pourront plus modifier leurs soumissions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'emails' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-[#050840] mb-6">Modèles d'Emails & Convocations</h2>
                
                <div className="space-y-6">
                  {/* Modèle Convocation Jury */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#050840]" />
                        <h3 className="font-semibold text-[#050840]">Convocation Jury</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTemplate(editingTemplate === 'convocationJury' ? null : 'convocationJury')}
                          className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-200 rounded-lg transition-all"
                        >
                          {editingTemplate === 'convocationJury' ? <X size={18} /> : <Edit size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    {editingTemplate === 'convocationJury' ? (
                      <textarea
                        value={emailTemplates.convocationJury}
                        onChange={(e) => setEmailTemplates({...emailTemplates, convocationJury: e.target.value})}
                        className="w-full h-48 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all text-sm font-mono"
                      />
                    ) : (
                      <div className="bg-white rounded-lg p-4 text-sm text-slate-600 whitespace-pre-wrap">
                        {emailTemplates.convocationJury}
                      </div>
                    )}
                  </div>

                  {/* Modèle Convocation Étudiant */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#050840]" />
                        <h3 className="font-semibold text-[#050840]">Convocation Étudiant</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTemplate(editingTemplate === 'convocationEtudiant' ? null : 'convocationEtudiant')}
                          className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-200 rounded-lg transition-all"
                        >
                          {editingTemplate === 'convocationEtudiant' ? <X size={18} /> : <Edit size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    {editingTemplate === 'convocationEtudiant' ? (
                      <textarea
                        value={emailTemplates.convocationEtudiant}
                        onChange={(e) => setEmailTemplates({...emailTemplates, convocationEtudiant: e.target.value})}
                        className="w-full h-48 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all text-sm font-mono"
                      />
                    ) : (
                      <div className="bg-white rounded-lg p-4 text-sm text-slate-600 whitespace-pre-wrap">
                        {emailTemplates.convocationEtudiant}
                      </div>
                    )}
                  </div>

                  {/* Variables disponibles */}
                  <div className="bg-[#95C5F2]/20 border border-[#95C5F2] rounded-xl p-4">
                    <h4 className="font-semibold text-[#050840] mb-2">Variables disponibles</h4>
                    <p className="text-sm text-slate-600">
                      {'{nom_jury}'}, {'{role}'}, {'{etudiant}'}, {'{date}'}, {'{heure}'}, {'{salle}'}, {'{sujet}'}, {'{president}'}, {'{rapporteur}'}, {'{examinateur}'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'securite' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-[#050840] mb-6">Sécurité & Rôles</h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-[#050840]" />
                      <h3 className="font-semibold text-[#050840]">Rôles et Permissions</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-[#050840]" />
                          <span className="text-sm text-[#050840]">Administrateur</span>
                        </div>
                        <span className="text-xs text-slate-500">Accès complet</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-[#050840]" />
                          <span className="text-sm text-[#050840]">Scolarité</span>
                        </div>
                        <span className="text-xs text-slate-500">Gestion soutenances</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-[#050840]" />
                          <span className="text-sm text-[#050840]">Président Jury</span>
                        </div>
                        <span className="text-xs text-slate-500">Évaluation & PV</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 text-[#050840]" />
                      <h3 className="font-semibold text-[#050840]">Politique de mot de passe</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>• Minimum 8 caractères</p>
                      <p>• Au moins une majuscule et une minuscule</p>
                      <p>• Au moins un chiffre</p>
                      <p>• Au moins un caractère spécial</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#050840] text-white rounded-full font-bold hover:bg-[#0B0C3C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sauvegarde en cours...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Sauvegarder les modifications</span>
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Modifications sauvegardées avec succès</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
