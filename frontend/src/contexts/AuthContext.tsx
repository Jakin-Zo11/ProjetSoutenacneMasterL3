import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, clearAuthToken, setAuthToken } from '../services/api'

type UserRole = 'admin' | 'student' | 'jury'

export type AppUser = {
  id: number
  name: string
  email: string
  role: UserRole
  matricule?: string
  mention?: string
  parcours?: string
  admission_year?: number
  student_status?: string
}

type AuthContextValue = {
  user: AppUser | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  hasRole: (roles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const TOKEN_KEY = 'soutenance_token'
const USER_KEY = 'soutenance_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const restoreSession = useCallback(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY)
    const savedUser = localStorage.getItem(USER_KEY)

    if (savedToken) {
      setAuthToken(savedToken)
      setToken(savedToken)
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as AppUser)
      } catch {
        localStorage.removeItem(USER_KEY)
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  const refreshUser = useCallback(async () => {
    if (!token) {
      return
    }

    const { data } = await api.get('/me')
    const nextUser = data.user as AppUser
    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }, [token])

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const { data } = await api.post('/login', { email, password })

    const authToken = data.token as string
    const nextUser = data.user as AppUser

    setAuthToken(authToken)
    setToken(authToken)
    setUser(nextUser)

    localStorage.setItem(TOKEN_KEY, authToken)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }, [])

  const logout = useCallback(async () => {
    try {
      if (token) {
        await api.post('/logout')
      }
    } catch (error) {
      console.warn('Erreur de déconnexion côté API', error)
    } finally {
      clearAuthToken()
      setToken(null)
      setUser(null)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }, [token])

  const hasRole = useCallback((roles: UserRole[]) => {
    if (!user) {
      return false
    }

    return roles.includes(user.role)
  }, [user])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    logout,
    refreshUser,
    hasRole,
  }), [user, token, loading, login, logout, refreshUser, hasRole])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
