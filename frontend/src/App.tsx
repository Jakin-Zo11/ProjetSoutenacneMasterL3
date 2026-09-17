import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AdminPage } from './pages/AdminPage'
import { DashboardPage } from './pages/DashboardPage'
import { EvaluationPage } from './pages/EvaluationPage'
import { LoginPage } from './pages/LoginPage'
import { ResultsPage } from './pages/ResultsPage'
import { StudentPage } from './pages/StudentPage'
import './App.css'

type Role = 'admin' | 'student' | 'jury'

function RootRedirect() {
  const { isAuthenticated } = useAuth()

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: Role[]
}) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <AppLayout title="Chargement">
        <div className="panel">
          <p>Chargement de l’application...</p>
        </div>
      </AppLayout>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/evaluation"
          element={
            <ProtectedRoute roles={['admin', 'jury']}>
              <EvaluationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute roles={['admin', 'jury']}>
              <ResultsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}
