import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('faculty')
  const [facultyList, setFacultyList] = useState([
    { id: 1, name: 'John Doe', email: 'john@university.edu', role: 'Professor', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@university.edu', role: 'Assistant Professor', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@university.edu', role: 'Professor', status: 'Inactive' }
  ])

  const [holidays, setHolidays] = useState([
    { date: '2024-01-01', name: 'New Year', type: 'National' },
    { date: '2024-03-21', name: 'Holi', type: 'National' },
    { date: '2024-08-15', name: 'Independence Day', type: 'National' }
  ])

  const [systemSettings, setSystemSettings] = useState({
    weeklyTargets: {
      professor: 30,
      assistantProfessor: 35,
      other: 40
    },
    notificationSettings: {
      emailReminders: true,
      pushNotifications: true,
      weeklyReports: true
    }
  })

  const handleAddFaculty = () => {
    // Implementation for adding new faculty
  }

  const handleAddHoliday = () => {
    // Implementation for adding new holiday
  }

  const handleUpdateSettings = (setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'faculty' ? 'active' : ''}`}
          onClick={() => setActiveTab('faculty')}
        >
          <i className="fas fa-users"></i>
          Faculty Management
        </button>
        <button
          className={`tab-btn ${activeTab === 'holidays' ? 'active' : ''}`}
          onClick={() => setActiveTab('holidays')}
        >
          <i className="fas fa-calendar-alt"></i>
          Holiday Calendar
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i>
          System Settings
        </button>
      </div>

      {activeTab === 'faculty' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Faculty Management</h2>
            <button className="add-btn" onClick={handleAddFaculty}>
              <i className="fas fa-plus"></i>
              Add Faculty
            </button>
          </div>

          <div className="faculty-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map(faculty => (
                  <tr key={faculty.id}>
                    <td>{faculty.name}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.role}</td>
                    <td>
                      <span className={`status-badge ${faculty.status.toLowerCase()}`}>
                        {faculty.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'holidays' && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Holiday Calendar</h2>
            <button className="add-btn" onClick={handleAddHoliday}>
              <i className="fas fa-plus"></i>
              Add Holiday
            </button>
          </div>

          <div className="holidays-list">
            {holidays.map((holiday, index) => (
              <div key={index} className="holiday-card">
                <div className="holiday-date">
                  <span className="day">{new Date(holiday.date).getDate()}</span>
                  <span className="month">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="holiday-info">
                  <h3>{holiday.name}</h3>
                  <span className={`holiday-type ${holiday.type.toLowerCase()}`}>
                    {holiday.type}
                  </span>
                </div>
                <button className="delete-btn">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="admin-section">
          <h2>System Settings</h2>
          
          <div className="settings-group">
            <div className="setting-item">
              <h3>Weekly Target Hours</h3>
              <div className="target-inputs">
                <div className="input-group">
                  <label>Professor</label>
                  <input
                    type="number"
                    value={systemSettings.weeklyTargets.professor}
                    onChange={(e) => handleUpdateSettings('weeklyTargets', {
                      ...systemSettings.weeklyTargets,
                      professor: e.target.value
                    })}
                  />
                </div>
                <div className="input-group">
                  <label>Assistant Professor</label>
                  <input
                    type="number"
                    value={systemSettings.weeklyTargets.assistantProfessor}
                    onChange={(e) => handleUpdateSettings('weeklyTargets', {
                      ...systemSettings.weeklyTargets,
                      assistantProfessor: e.target.value
                    })}
                  />
                </div>
                <div className="input-group">
                  <label>Other</label>
                  <input
                    type="number"
                    value={systemSettings.weeklyTargets.other}
                    onChange={(e) => handleUpdateSettings('weeklyTargets', {
                      ...systemSettings.weeklyTargets,
                      other: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="setting-item">
              <h3>Notification Settings</h3>
              <div className="notification-settings">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={systemSettings.notificationSettings.emailReminders}
                    onChange={(e) => handleUpdateSettings('notificationSettings', {
                      ...systemSettings.notificationSettings,
                      emailReminders: e.target.checked
                    })}
                  />
                  Email Reminders
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={systemSettings.notificationSettings.pushNotifications}
                    onChange={(e) => handleUpdateSettings('notificationSettings', {
                      ...systemSettings.notificationSettings,
                      pushNotifications: e.target.checked
                    })}
                  />
                  Push Notifications
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={systemSettings.notificationSettings.weeklyReports}
                    onChange={(e) => handleUpdateSettings('notificationSettings', {
                      ...systemSettings.notificationSettings,
                      weeklyReports: e.target.checked
                    })}
                  />
                  Weekly Reports
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin 