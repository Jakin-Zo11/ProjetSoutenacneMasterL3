import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  User,
  Plus,
  X,
  Edit,
  GraduationCap,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  History
} from 'lucide-react';

const UserManagement = () => {
  // État pour les utilisateurs
  const [users, setUsers] = useState([]);

  // État pour la modale
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: '',
    grade: '',
    specialite: ''
  });

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour les onglets de filtrage
  const [activeTab, setActiveTab] = useState('tous');

  // État pour les KPI
  const [kpi, setKpi] = useState({
    totalEnseignantsJurys: 45,
    etudiantsInscrits: 342,
    demandesIndisponibilite: 8
  });

  // Données de démonstration
  useEffect(() => {
    setUsers([
      {
        id: 1,
        nom: 'Randria',
        prenom: 'Jean',
        email: 'randria.jean@emit.mg',
        role: 'president_jury',
        grade: 'Professeur',
        specialite: 'Informatique & TIC',
        departement: 'Département Informatique & TIC',
        disponibilite: 'disponible',
        initiales: 'RJ'
      },
      {
        id: 2,
        nom: 'Rasoa',
        prenom: 'Marie',
        email: 'rasoa.marie@emit.mg',
        role: 'rapporteur',
        grade: 'Maître de Conférences',
        specialite: 'Gestion & Finance',
        departement: 'Département Gestion',
        disponibilite: 'disponible',
        initiales: 'RM'
      },
      {
        id: 3,
        nom: 'Andriamanitra',
        prenom: 'Paul',
        email: 'andriamanitra.paul@emit.mg',
        role: 'enseignant',
        grade: 'Docteur',
        specialite: 'Réseaux & Télécoms',
        departement: 'Département Informatique & TIC',
        disponibilite: 'indisponible',
        initiales: 'AP'
      },
      {
        id: 4,
        nom: 'Ravelonarivo',
        prenom: 'Cécile',
        email: 'ravelonarivo.cécile@emit.mg',
        role: 'scolarite',
        grade: 'Administrateur',
        specialite: 'Administration',
        departement: 'Administration',
        disponibilite: 'disponible',
        initiales: 'RC'
      },
      {
        id: 5,
        nom: 'Rasoarimanana',
        prenom: 'Luc',
        email: 'rasoarimanana.luc@emit.mg',
        role: 'enseignant',
        grade: 'Maître Assistant',
        specialite: 'Économie',
        departement: 'Département Économie',
        disponibilite: 'disponible',
        initiales: 'RL'
      },
      {
        id: 6,
        nom: 'Rakoto',
        prenom: 'Sophie',
        email: 'rakoto.sophie@emit.mg',
        role: 'etudiant',
        grade: 'Master 2',
        specialite: 'Génie Logiciel',
        departement: 'Département Informatique & TIC',
        disponibilite: 'disponible',
        initiales: 'RS'
      }
    ]);
  }, []);

  // Fonction pour obtenir le badge de rôle (palette EMIT stricte)
  const getRoleBadge = (role) => {
    const roleConfig = {
      president_jury: {
        bg: 'bg-[#050840]',
        text: 'text-white',
        label: 'Président de jury'
      },
      rapporteur: {
        bg: 'bg-[#95C5F2]',
        text: 'text-[#050840]',
        label: 'Rapporteur'
      },
      enseignant: {
        bg: 'bg-[#EAF4FF]',
        text: 'text-[#050840]',
        label: 'Enseignant'
      },
      scolarite: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        label: 'Scolarité'
      },
      etudiant: {
        bg: 'bg-[#E1F8F0]',
        text: 'text-[#065F46]',
        label: 'Étudiant'
      }
    };

    const config = roleConfig[role] || roleConfig.enseignant;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Fonction pour obtenir le badge de disponibilité (palette EMIT stricte)
  const getAvailabilityBadge = (disponibilite) => {
    if (disponibilite === 'disponible') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E1F8F0] text-[#065F46]">
          <CheckCircle size={12} className="mr-1" />
          Disponible
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#92400E]">
          <Clock size={12} className="mr-1" />
          Indisponible
        </span>
      );
    }
  };

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.specialite.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = 
      activeTab === 'tous' ||
      (activeTab === 'enseignants_jurys' && (user.role === 'enseignant' || user.role === 'president_jury' || user.role === 'rapporteur')) ||
      (activeTab === 'etudiants' && user.role === 'etudiant') ||
      (activeTab === 'indisponibilites' && user.disponibilite === 'indisponible');

    return matchesSearch && matchesTab;
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
    if (editMode && selectedUser) {
      // Mode édition
      setUsers(users.map(user =>
        user.id === selectedUser.id
          ? {
              ...user,
              nom: formData.nom,
              prenom: formData.prenom,
              email: formData.email,
              role: formData.role,
              grade: formData.grade,
              specialite: formData.specialite,
              initiales: `${formData.prenom[0]}${formData.nom[0]}`.toUpperCase()
            }
          : user
      ));
    } else {
      // Mode création
      const newUser = {
        id: users.length + 1,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        role: formData.role,
        grade: formData.grade,
        specialite: formData.specialite,
        departement: formData.role === 'etudiant' ? 'Département Informatique & TIC' : 'Département Informatique & TIC',
        disponibilite: 'disponible',
        initiales: `${formData.prenom[0]}${formData.nom[0]}`.toUpperCase()
      };
      setUsers([...users, newUser]);
    }
    setModalOpen(false);
    setEditMode(false);
    setSelectedUser(null);
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      role: '',
      grade: '',
      specialite: ''
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      grade: user.grade,
      specialite: user.specialite
    });
    setModalOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#050840] mb-2">Gestion des Utilisateurs & Jurys</h1>
            <p className="text-sm text-slate-600">Comptes enseignants, présidents de jury, rapporteurs et étudiants</p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, rôle ou spécialité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => {
                setEditMode(false);
                setSelectedUser(null);
                setFormData({
                  nom: '',
                  prenom: '',
                  email: '',
                  role: '',
                  grade: '',
                  specialite: ''
                });
                setModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-full hover:bg-[#7DB5EC] transition-all shadow-md"
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
              {/* Total Enseignants/Jurys */}
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Enseignants & Jurys</p>
                    <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.totalEnseignantsJurys}</p>
                    <p className="text-xs text-slate-400">Membres actifs</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#050840] to-[#0a1040] rounded-2xl flex items-center justify-center shadow-lg">
                    <UserCheck className="w-7 h-7 text-[#95C5F2]" />
                  </div>
                </div>
              </div>

              {/* Étudiants Inscrits */}
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Étudiants Inscrits</p>
                    <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.etudiantsInscrits}</p>
                    <p className="text-xs text-slate-400">Actuellement inscrits</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#95C5F2] to-[#7DB5EC] rounded-2xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Demandes d'Indisponibilité */}
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Indisponibilités</p>
                    <p className="text-4xl font-bold text-[#050840] mb-1">{kpi.demandesIndisponibilite}</p>
                    <p className="text-xs text-slate-400">En attente de validation</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* Filter Tabs */}
      <section className="mb-6">
        <div className="flex items-center gap-2">
          {[
            { id: 'tous', label: 'Tous', icon: Users },
            { id: 'enseignants_jurys', label: 'Enseignants / Jurys', icon: UserCheck },
            { id: 'etudiants', label: 'Étudiants', icon: GraduationCap },
            { id: 'indisponibilites', label: 'Indisponibilités', icon: Clock }
          ].map((tab) => {
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

      {/* Users List */}
      <section>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Utilisateur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Département / Spécialité</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Disponibilité</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#050840] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#95C5F2] to-[#050840] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{user.initiales}</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#050840]">{user.prenom} {user.nom}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-[#050840]">{user.departement}</p>
                        <p className="text-xs text-slate-500">{user.specialite}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getAvailabilityBadge(user.disponibilite)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-lg transition-all"
                          title="Historique des jurys"
                        >
                          <History size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Bloquer/Débloquer"
                        >
                          {user.disponibilite === 'disponible' ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal de Création / Édition Utilisateur */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#050840]">
                  {editMode ? 'Modifier l\'Utilisateur' : 'Nouvel Utilisateur'}
                </h2>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditMode(false);
                    setSelectedUser(null);
                    setFormData({
                      nom: '',
                      prenom: '',
                      email: '',
                      role: '',
                      grade: '',
                      specialite: ''
                    });
                  }}
                  className="p-2 text-slate-400 hover:text-[#050840] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#050840] mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Randria"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#050840] mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Jean"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jean.randria@emit.mg"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="enseignant">Enseignant</option>
                  <option value="president_jury">Président de jury</option>
                  <option value="rapporteur">Rapporteur</option>
                  <option value="scolarite">Scolarité</option>
                  <option value="etudiant">Étudiant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="Professeur / Maître de Conférences / Docteur"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#050840] mb-2">Spécialité</label>
                <input
                  type="text"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  placeholder="Informatique & TIC / Gestion / Économie"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditMode(false);
                    setSelectedUser(null);
                    setFormData({
                      nom: '',
                      prenom: '',
                      email: '',
                      role: '',
                      grade: '',
                      specialite: ''
                    });
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#95C5F2] text-[#050840] font-bold rounded-xl hover:bg-[#7DB5EC] transition-all"
                >
                  {editMode ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
