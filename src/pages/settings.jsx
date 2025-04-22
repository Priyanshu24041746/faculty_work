import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    weeklyTarget: 35,
    timezone: 'UTC+5:30',
    language: 'English'
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="settings">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Notifications</h3>
              <p>Receive alerts for punch reminders and weekly targets</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Email Alerts</h3>
              <p>Receive weekly reports and important updates via email</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Dark Mode</h3>
              <p>Switch to dark theme for better visibility</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Work Settings</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Weekly Target Hours</h3>
              <p>Set your weekly working hours target</p>
            </div>
            <div className="setting-input">
              <input
                type="number"
                name="weeklyTarget"
                value={settings.weeklyTarget}
                onChange={handleChange}
                min="0"
                max="60"
              />
              <span>hours</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Timezone</h3>
              <p>Set your local timezone for accurate time tracking</p>
            </div>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="setting-select"
            >
              <option value="UTC+5:30">UTC+5:30 (IST)</option>
              <option value="UTC+0">UTC+0 (GMT)</option>
              <option value="UTC-5">UTC-5 (EST)</option>
              <option value="UTC-8">UTC-8 (PST)</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Language</h3>
              <p>Choose your preferred language</p>
            </div>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="setting-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Change Password</h3>
              <p>Update your account password</p>
            </div>
            <button className="action-btn">
              <i className="fas fa-key"></i>
              Change Password
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Export Data</h3>
              <p>Download your punch history and reports</p>
            </div>
            <button className="action-btn">
              <i className="fas fa-download"></i>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 