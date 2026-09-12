import { useState } from 'react'
import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  Scale,
  MapPin,
  Calendar,
  Clock,
  Calendar as CalendarIcon,
  Users,
  BarChart3,
  Award,
  FileText,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Home
} from 'lucide-react'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import RoomManagement from './components/RoomManagement'
import Supervision from './components/Supervision'
import PromotionManagement from './components/PromotionManagement'
import UserManagement from './components/UserManagement'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  // Configuration du menu de navigation avec groupes
  const navGroups = [
    {
      label: 'Principal',
      items: [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Gestion académique',
      items: [
        { id: 'etudiants', label: 'Étudiants', icon: GraduationCap },
        { id: 'enseignants', label: 'Enseignants', icon: UserCheck },
        { id: 'jurys', label: 'Jurys', icon: Scale }
      ]
    },
    {
      label: 'Soutenances',
      items: [
        { id: 'salles', label: 'Salles', icon: MapPin },
        { id: 'soutenances', label: 'Soutenances', icon: Calendar },
        { id: 'creneaux', label: 'Créneaux', icon: Clock },
        { id: 'calendrier', label: 'Calendrier', icon: CalendarIcon },
        { id: 'affectation', label: 'Affectation jury', icon: Users }
      ]
    },
    {
      label: 'Résultats',
      items: [
        { id: 'evaluations', label: 'Évaluations', icon: BarChart3 },
        { id: 'resultats', label: 'Résultats', icon: Award },
        { id: 'pv', label: 'PV / Rapports', icon: FileText }
      ]
    }
  ]

  // Fil d'Ariane basé sur l'onglet actif
  const getBreadcrumb = () => {
    for (const group of navGroups) {
      const item = group.items.find(i => i.id === activeTab)
      if (item) return item.label
    }
    return 'Tableau de bord'
  }

  // Fonction de rendu dynamique du contenu
  const renderContent = () => {
    switch (activeTab) {
      case 'salles':
        return <RoomManagement />
      case 'soutenances':
        return <Supervision />
      case 'promotions':
        return <PromotionManagement />
      case 'utilisateurs':
        return <UserManagement />
      case 'dashboard':
      case 'etudiants':
      case 'enseignants':
      case 'jurys':
      case 'creneaux':
      case 'calendrier':
      case 'affectation':
      case 'evaluations':
      case 'resultats':
      case 'pv':
      default:
        return <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
    }
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-[#EBF3FA]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-[#050840] flex flex-col fixed h-full z-10">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md flex-shrink-0">
                <img 
                  src="/Logo-emit.png" 
                  alt="Logo EMIT" 
                  className="w-full h-full object-contain"
                  onError={(e: any) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    ((e.target as HTMLElement).nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-[#050840] to-[#95C5F2] rounded-xl flex items-center justify-center hidden">
                  <span className="text-white font-bold text-lg">EM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">EMIT</h1>
                <p className="text-sm text-[#95C5F2]">Gestion des Soutenances</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu with Groups */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <p className="px-4 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 mb-1 ${
                        isActive
                          ? 'bg-[#95C5F2] text-[#050840] shadow-md font-medium'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Bottom Block: User Avatar + Name + Role + Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#95C5F2] rounded-full flex items-center justify-center">
                <Users size={20} className="text-[#050840]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin Scolarité</p>
                <p className="text-xs text-[#95C5F2]">admin@emit.mg</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          {/* Topbar */}
          <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-5">
            <div className="flex items-center justify-between">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Home size={16} className="text-slate-400" />
                <ChevronRight size={16} className="text-slate-400" />
                <span className="text-[#050840] font-medium">{getBreadcrumb()}</span>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Global Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all text-sm"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Session Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#050840] text-white rounded-full text-sm">
                  <span className="font-medium">2025-2026</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
