import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    weeklyHours: {
      target: 35,
      completed: 25,
      remaining: 10
    },
    dailyAverage: 5,
    monthlyTotal: 120,
    complianceRate: 85
  })

  const [recentPunches, setRecentPunches] = useState([
    { date: '2024-03-20', in: '09:00', out: '17:00', duration: '8h 0m' },
    { date: '2024-03-19', in: '09:30', out: '17:30', duration: '8h 0m' },
    { date: '2024-03-18', in: '09:15', out: '17:15', duration: '8h 0m' }
  ])

  const formatTime = (time) => {
    return time || '--:--'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/punch" className="punch-btn">
          <i className="fas fa-fingerprint"></i>
          Punch In/Out
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>Weekly Hours</h3>
            <p className="stat-value">{stats.weeklyHours.completed}h / {stats.weeklyHours.target}h</p>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(stats.weeklyHours.completed / stats.weeklyHours.target) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-info">
            <h3>Daily Average</h3>
            <p className="stat-value">{stats.dailyAverage}h</p>
            <p className="stat-label">Last 7 days</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h3>Monthly Total</h3>
            <p className="stat-value">{stats.monthlyTotal}h</p>
            <p className="stat-label">Current month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Compliance Rate</h3>
            <p className="stat-value">{stats.complianceRate}%</p>
            <p className="stat-label">Target achievement</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Punches</h2>
        <div className="punches-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentPunches.map((punch, index) => (
                <tr key={index}>
                  <td>{punch.date}</td>
                  <td>{formatTime(punch.in)}</td>
                  <td>{formatTime(punch.out)}</td>
                  <td>{punch.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/punch" className="action-card">
            <i className="fas fa-fingerprint"></i>
            <span>Punch In/Out</span>
          </Link>
          <Link to="/settings" className="action-card">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
          <Link to="/help" className="action-card">
            <i className="fas fa-question-circle"></i>
            <span>Help</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 