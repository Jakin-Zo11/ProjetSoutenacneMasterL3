import { useState } from 'react'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <AdminDashboard 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    />
  )
}

export default App
