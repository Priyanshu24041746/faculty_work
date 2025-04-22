import React, { useState, useEffect } from 'react'
import "./Punch.css"
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'

const Punch = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [punchStatus, setPunchStatus] = useState({
    isPunchedIn: false,
    lastPunchTime: null,
    todayPunches: []
  })
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [weeklyStats, setWeeklyStats] = useState({
    targetHours: 35, // Default for Assistant Professor
    completedHours: 0,
    remainingHours: 35,
    workingDays: 5,
    projectedShortfall: 0
  })

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate weekly stats
  useEffect(() => {
    calculateWeeklyStats()
  }, [punchStatus.todayPunches])

  const calculateWeeklyStats = () => {
    // Calculate completed hours from today's punches
    const completedHours = punchStatus.todayPunches.reduce((total, punch) => {
      if (punch.type === 'in' && punch.endTime) {
        const duration = (punch.endTime - punch.time) / (1000 * 60 * 60) // Convert to hours
        return total + duration
      }
      return total
    }, 0)

    // Calculate remaining hours and projected shortfall
    const remainingHours = weeklyStats.targetHours - completedHours
    const daysLeft = getWorkingDaysLeft()
    const projectedShortfall = remainingHours / daysLeft

    setWeeklyStats(prev => ({
      ...prev,
      completedHours,
      remainingHours,
      projectedShortfall
    }))
  }

  const getWorkingDaysLeft = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const daysLeft = 5 - currentDay // Assuming 5 working days
    return Math.max(0, daysLeft)
  }

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDuration = (hours) => {
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    return `${wholeHours}h ${minutes}m`
  }

  const handlePunch = () => {
    const now = new Date()
    const newPunch = {
      time: now,
      type: punchStatus.isPunchedIn ? 'out' : 'in',
      location: location,
      notes: notes
    }

    if (punchStatus.isPunchedIn) {
      // Update the last punch with end time
      const updatedPunches = [...punchStatus.todayPunches]
      const lastPunch = updatedPunches[updatedPunches.length - 1]
      lastPunch.endTime = now
      setPunchStatus(prev => ({
        ...prev,
        isPunchedIn: false,
        lastPunchTime: now,
        todayPunches: updatedPunches
      }))
    } else {
      setPunchStatus(prev => ({
        ...prev,
        isPunchedIn: true,
        lastPunchTime: now,
        todayPunches: [...prev.todayPunches, newPunch]
      }))
    }

    // Clear form after punch
    setLocation('')
    setNotes('')
  }

  return (
    <div className="punch-container">
      <div className="punch-header">
        <div className="logo">
          <i className="fas fa-clock fa-2x"></i>
          <h2>FWHT</h2>
        </div>
        <h1>Time Punch</h1>
        <div className="current-time">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
      </div>

      <div className="weekly-stats">
        <div className="stat-card">
          <h3>Weekly Target</h3>
          <p className="stat-value">{formatDuration(weeklyStats.targetHours)}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-value">{formatDuration(weeklyStats.completedHours)}</p>
        </div>
        <div className="stat-card">
          <h3>Remaining</h3>
          <p className={`stat-value ${weeklyStats.remainingHours > 0 ? 'warning' : 'success'}`}>
            {formatDuration(weeklyStats.remainingHours)}
          </p>
        </div>
      </div>

      <div className="punch-status">
        <div className={`status-indicator ${punchStatus.isPunchedIn ? 'punched-in' : 'punched-out'}`}>
          <i className={`fas fa-${punchStatus.isPunchedIn ? 'check-circle' : 'times-circle'}`}></i>
          <span>{punchStatus.isPunchedIn ? 'Punched In' : 'Punched Out'}</span>
        </div>
        {punchStatus.lastPunchTime && (
          <div className="last-punch">
            Last {punchStatus.isPunchedIn ? 'Punch Out' : 'Punch In'} at {formatTime(punchStatus.lastPunchTime)}
          </div>
        )}
      </div>

      <div className="punch-form">
        <div className="input-group">
          <label htmlFor="location">
            <i className="fas fa-map-marker-alt"></i> Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your current location"
          />
        </div>

        <div className="input-group">
          <label htmlFor="notes">
            <i className="fas fa-sticky-note"></i> Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes (optional)"
            rows="3"
          />
        </div>

        <button 
          className={`punch-button ${punchStatus.isPunchedIn ? 'punch-out' : 'punch-in'}`}
          onClick={handlePunch}
        >
          <i className={`fas fa-${punchStatus.isPunchedIn ? 'sign-out-alt' : 'sign-in-alt'}`}></i>
          {punchStatus.isPunchedIn ? 'Punch Out' : 'Punch In'}
        </button>
      </div>

      <div className="punch-history">
        <h3>Today's Punches</h3>
        {punchStatus.todayPunches.length === 0 ? (
          <p className="no-punches">No punches recorded today</p>
        ) : (
          <div className="punches-list">
            {punchStatus.todayPunches.map((punch, index) => (
              <div key={index} className="punch-record">
                <div className="punch-time">
                  <i className={`fas fa-${punch.type === 'in' ? 'sign-in-alt' : 'sign-out-alt'}`}></i>
                  {formatTime(punch.time)}
                  {punch.endTime && (
                    <span className="duration">
                      ({formatDuration((punch.endTime - punch.time) / (1000 * 60 * 60))})
                    </span>
                  )}
                </div>
                <div className="punch-details">
                  {punch.location && <span><i className="fas fa-map-marker-alt"></i> {punch.location}</span>}
                  {punch.notes && <span><i className="fas fa-sticky-note"></i> {punch.notes}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {weeklyStats.remainingHours > 0 && getWorkingDaysLeft() < 2 && (
        <div className="reminder-alert">
          <i className="fas fa-exclamation-triangle"></i>
          <p>You need to work {formatDuration(weeklyStats.projectedShortfall)} per day to meet your weekly target.</p>
        </div>
      )}

      <div className="footer">
        <Link to="/dashboard">
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </Link>
        <div className="security-badge">
          <i className="fas fa-lock"></i> Your connection is secure
        </div>
      </div>
    </div>
  )
}

export default Punch 