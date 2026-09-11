import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-react';

const Login = ({ onLogin }) => {
  // État pour le formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // État pour l'affichage du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  // État pour "Se souvenir de moi"
  const [rememberMe, setRememberMe] = useState(false);

  // État de chargement
  const [isLoading, setIsLoading] = useState(false);

  // État d'erreur
  const [error, setError] = useState('');

  // Gestion des changements de formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Réinitialiser l'erreur lors de la saisie
    if (error) setError('');
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'une requête d'authentification
    setTimeout(() => {
      // Validation simulée
      if (formData.email === 'admin@emit.mg' && formData.password === 'password123') {
        // Connexion réussie
        console.log('Connexion réussie');
        onLogin();
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#EBF3FA] font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="w-full max-w-md">
        {/* Carte de connexion */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* En-tête */}
          <div className="text-center mb-8">
            {/* Logo EMIT */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-md ring-2 ring-[#95C5F2]/20 flex items-center justify-center">
                <img 
                  src="/logo.emit.png" 
                  alt="Logo EMIT" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-[#050840] to-[#95C5F2] rounded-xl flex items-center justify-center hidden">
                  <span className="text-white font-bold text-2xl">EM</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-[#050840] mb-2">
              Espace Administration & Scolarité
            </h1>
            <p className="text-sm text-slate-500">
              Module Ntsoa - Accès Sécurisé
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Email */}
            <div>
              <label className="block text-sm font-medium text-[#050840] mb-2">
                Identifiant / Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@emit.mg"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-[#050840] mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95C5F2] focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#050840] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Se souvenir de moi et Mot de passe oublié */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#050840] focus:ring-[#95C5F2]"
                />
                <span className="text-sm text-slate-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-[#95C5F2] hover:text-[#050840] transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#050840] text-white rounded-full font-bold hover:bg-[#0B0C3C] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>

          {/* Pied de page */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              © 2026 EMIT Fianarantsoa - Tous droits réservés
            </p>
          </div>
        </div>

        {/* Informations de connexion de démonstration */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 mb-2">Identifiants de démonstration :</p>
          <p className="text-xs text-slate-600">Email : admin@emit.mg | Mot de passe : password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
