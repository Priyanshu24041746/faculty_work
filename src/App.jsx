import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Punch from './pages/Punch'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/punch" element={<Punch />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
