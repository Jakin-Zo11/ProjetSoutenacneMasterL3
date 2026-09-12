import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  Monitor,
  Wind,
  Mic,
  Wifi,
  Laptop,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Search,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const RoomManagement = () => {
  // État pour la liste des salles
  const [rooms, setRooms] = useState([]);

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // État pour le filtre de disponibilité
  const [availabilityFilter, setAvailabilityFilter] = useState('toutes');

  // État pour la modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    building: '',
    equipments: [],
    status: 'disponible'
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = useState({});

  // Liste des équipements disponibles
  const equipmentOptions = [
    { id: 'projecteur', label: 'Projecteur', icon: Monitor },
    { id: 'wifi_hd', label: 'Wifi HD', icon: Wifi },
    { id: 'climatisation', label: 'Climatisation', icon: Wind },
    { id: 'pc', label: 'PC', icon: Laptop }
  ];

  // Filtrer les salles par recherche et disponibilité
  const filteredRooms = rooms.filter(room => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailability =
      availabilityFilter === 'toutes' ||
      (availabilityFilter === 'disponible' && room.status === 'disponible' && room.is_active) ||
      (availabilityFilter === 'indisponible' && (!room.is_active || room.status === 'indisponible'));

    return matchesSearch && matchesAvailability;
  });

  // Charger les données de démonstration
  useEffect(() => {
    setRooms([
      {
        id: 1,
        name: 'Salle A101',
        building: 'Bâtiment A',
        capacity: 30,
        equipments: ['projecteur', 'wifi_hd', 'climatisation'],
        is_active: true,
        status: 'disponible'
      },
      {
        id: 2,
        name: 'Salle B205',
        building: 'Bâtiment B',
        capacity: 50,
        equipments: ['projecteur', 'wifi_hd', 'climatisation', 'pc'],
        is_active: true,
        status: 'disponible'
      },
      {
        id: 3,
        name: 'Amphithéâtre C1',
        building: 'Bâtiment C',
        capacity: 100,
        equipments: ['projecteur', 'wifi_hd', 'climatisation'],
        is_active: true,
        status: 'indisponible'
      },
      {
        id: 4,
        name: 'Salle D102',
        building: 'Bâtiment D',
        capacity: 25,
        equipments: ['wifi_hd', 'pc'],
        is_active: false,
        status: 'indisponible'
      }
    ]);
  }, []);

  // Gérer l'ouverture de la modale
  const openModal = () => {
    setIsModalOpen(true);
    setFormData({
      name: '',
      capacity: '',
      building: '',
      equipments: [],
      status: 'disponible'
    });
    setErrors({});
  };

  // Gérer la fermeture de la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      capacity: '',
      building: '',
      equipments: [],
      status: 'disponible'
    });
    setErrors({});
  };

  // Gérer les changements du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Gérer la sélection/désélection des équipements
  const toggleEquipment = (equipmentId) => {
    setFormData({
      ...formData,
      equipments: formData.equipments.includes(equipmentId)
        ? formData.equipments.filter(id => id !== equipmentId)
        : [...formData.equipments, equipmentId]
    });
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la salle est requis';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'La capacité est requise';
    } else if (formData.capacity < 1) {
      newErrors.capacity = 'La capacité doit être d\'au moins 1 place';
    } else if (formData.capacity > 500) {
      newErrors.capacity = 'La capacité ne peut pas dépasser 500 places';
    }

    if (!formData.building.trim()) {
      newErrors.building = 'Le bâtiment est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Créer la nouvelle salle
    const newRoom = {
      id: rooms.length + 1,
      name: formData.name,
      building: formData.building,
      capacity: parseInt(formData.capacity),
      equipments: formData.equipments,
      is_active: true,
      status: 'disponible'
    };

    setRooms([...rooms, newRoom]);
    closeModal();
  };

  // Supprimer une salle
  const deleteRoom = (roomId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  // Basculer le statut d'une salle
  const toggleRoomStatus = (roomId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          is_active: !room.is_active,
          status: room.is_active ? 'indisponible' : 'disponible'
        };
      }
      return room;
    }));
  };

  // Obtenir l'icône d'équipement
  const getEquipmentIcon = (equipmentId) => {
    const option = equipmentOptions.find(opt => opt.id === equipmentId);
    return option ? option.icon : null;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#050840] mb-2">Gestion des Salles & Équipements</h1>
            <p className="text-sm text-slate-600">Planification des espaces de soutenance et disponibilités</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une salle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
              />
            </div>

            {/* Add Room Button */}
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-[#95C5F2] text-[#050840] px-6 py-2.5 rounded-full font-bold hover:bg-[#7DB5EC] transition-colors"
            >
              <Plus size={18} />
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Salles */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Salles Totales</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">{rooms.length}</p>
                <p className="text-xs text-slate-400">Total espaces</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#050840] to-[#0a1040] rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-[#95C5F2]" />
              </div>
            </div>
          </div>

          {/* Salles Disponibles */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Disponibles</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">
                  {rooms.filter(r => r.is_active && r.status === 'disponible').length}
                </p>
                <p className="text-xs text-slate-400">Prêtes à l'usage</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#E1F8F0] to-[#10B981] rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* En Maintenance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">En Maintenance</p>
                <p className="text-4xl font-bold text-[#050840] mb-1">
                  {rooms.filter(r => !r.is_active || r.status === 'indisponible').length}
                </p>
                <p className="text-xs text-slate-400">Indisponibles</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#FEF3C7] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Filters */}
      <section className="mb-6">
        <div className="flex items-center gap-2">
          {[
            { id: 'toutes', label: 'Toutes' },
            { id: 'disponible', label: 'Disponibles' },
            { id: 'indisponible', label: 'Indisponibles' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setAvailabilityFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                availabilityFilter === filter.id
                  ? 'bg-[#95C5F2] text-[#050840]'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              {/* En-tête de la carte */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#050840]">{room.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                    <MapPin size={14} />
                    <span>{room.building}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {room.is_active && room.status === 'disponible' ? (
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#F59E0B]" />
                  )}
                </div>
              </div>

              {/* Capacité */}
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[#95C5F2]" />
                <span className="text-sm text-slate-700">
                  {room.capacity} places
                </span>
              </div>

              {/* Équipements */}
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Équipements :</p>
                <div className="flex flex-wrap gap-2">
                  {room.equipments.length > 0 ? (
                    room.equipments.map((eqId) => {
                      const Icon = getEquipmentIcon(eqId);
                      const option = equipmentOptions.find(opt => opt.id === eqId);
                      return Icon ? (
                        <div
                          key={eqId}
                          className="flex items-center gap-1 bg-[#EAF4FF] text-[#050840] px-3 py-1.5 rounded-full text-xs font-medium"
                          title={option?.label}
                        >
                          <Icon size={12} />
                          <span>{option?.label}</span>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <span className="text-xs text-slate-400">Aucun équipement</span>
                  )}
                </div>
              </div>

              {/* Statut */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    room.status === 'disponible' && room.is_active
                      ? 'bg-[#E1F8F0] text-[#065F46]'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  {room.status === 'disponible' && room.is_active ? (
                    <>
                      <CheckCircle size={12} />
                      Disponible
                    </>
                  ) : (
                    <>
                      <XCircle size={12} />
                      Indisponible
                    </>
                  )}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium text-[#050840] bg-[#95C5F2]/10 rounded-xl hover:bg-[#95C5F2]/20 transition-colors"
                  title="Modifier"
                >
                  <Edit size={16} className="inline mr-1" />
                  Modifier
                </button>
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium text-[#050840] bg-[#95C5F2]/10 rounded-xl hover:bg-[#95C5F2]/20 transition-colors"
                  title="Planning"
                >
                  <Calendar size={16} className="inline mr-1" />
                  Planning
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune salle */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-[#050840] mb-2">Aucune salle trouvée</h3>
            <p className="text-slate-600 mb-4">Essayez de modifier votre recherche ou ajoutez une nouvelle salle.</p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-[#95C5F2] text-[#050840] px-5 py-2.5 rounded-full font-bold hover:bg-[#7DB5EC] transition-colors"
            >
              <Plus size={20} />
              Ajouter une salle
            </button>
          </div>
        )}
      </section>

      {/* Modale de création */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête de la modale */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-[#050840]">Ajouter une salle</h2>
          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nom de la salle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nom de la salle *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Ex: Salle A101"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Bâtiment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bâtiment *
            </label>
            <input
              type="text"
              name="building"
              value={formData.building}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] ${
                errors.building ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Ex: Bâtiment A"
            />
            {errors.building && (
              <p className="text-red-500 text-xs mt-1">{errors.building}</p>
            )}
          </div>

          {/* Capacité */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Capacité d'accueil *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
              max="500"
              className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] ${
                errors.capacity ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Ex: 30"
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
            )}
          </div>

          {/* Équipements */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Équipements disponibles
            </label>
            <div className="grid grid-cols-2 gap-3">
              {equipmentOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = formData.equipments.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleEquipment(option.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-colors ${
                      isSelected
                        ? 'border-[#95C5F2] bg-[#95C5F2]/10 text-[#050840]'
                        : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Statut
            </label>
            <select
              name="status"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] bg-white"
            >
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#050840] text-white rounded-xl font-medium hover:bg-[#050840]/90 transition-colors"
            >
              Créer la salle
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
);
};

export default RoomManagement;
