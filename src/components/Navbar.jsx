import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole')

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <i className="fas fa-clock"></i>
          <span>FWHT</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/punch" className={location.pathname === '/punch' ? 'active' : ''}>
          <i className="fas fa-fingerprint"></i>
          <span>Punch</span>
        </Link>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </Link>
        {userRole === 'admin' && (
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
            <i className="fas fa-user-shield"></i>
            <span>Admin</span>
          </Link>
        )}
        <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </Link>
      </div>

      <div className="navbar-user">
        <span className="user-role">{userRole}</span>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
