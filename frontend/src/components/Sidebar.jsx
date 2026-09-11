import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  GraduationCap,
  Users,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  // Éléments de navigation
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'salles', label: 'Salles & Équipements', icon: MapPin },
    { id: 'formations', label: 'Formations & Promotions', icon: GraduationCap },
    { id: 'utilisateurs', label: 'Utilisateurs & Jurys', icon: Users },
    { id: 'soutenances', label: 'Suivi des Soutenances', icon: Calendar },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#050840] h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden">
      {/* En-tête avec Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Conteneur de logo */}
          <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md ring-2 ring-[#95C5F2]/20 flex-shrink-0">
            <img 
              src="/logo.emit.png" 
              alt="Logo EMIT" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback gradient si l'image ne charge pas */}
            <div className="w-full h-full bg-gradient-to-br from-[#050840] to-[#95C5F2] rounded-xl flex items-center justify-center hidden">
              <span className="text-white font-bold text-lg">EM</span>
            </div>
          </div>
          
          {/* Texte à côté du logo */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white">EMIT</h1>
            <p className="text-sm text-[#95C5F2]">Fianarantsoa</p>
          </div>
        </div>
      </div>

      {/* Navigation Principale */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Titre de section */}
        <p className="text-xs font-semibold text-[#95C5F2] uppercase tracking-wider mb-4 px-2">
          Administration
        </p>
        
        {/* Liens de navigation */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#95C5F2] text-[#050840] shadow-md scale-[1.02]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Pied de Sidebar */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200">
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
