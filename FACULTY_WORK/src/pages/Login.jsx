import React, { useState, useEffect } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)

  const closeAlert = () => {
    setShowAlert(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleKeyPress = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'))
  }

  useEffect(() => {
    // Add event listener for caps lock
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyPress)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
    // After successful login:
    navigate('/dashboard') // Example: navigate to dashboard
  }

  return (
    <div>
       <div className="login-container">
       
        <div id="alert" className={`alert alert-${alertType}`} role="alert" style={{ display: showAlert ? 'block' : 'none' }}>
            <span id="alert-message">{alertMessage}</span>
            <span className="alert-close" onClick={closeAlert}>&times;</span>
        </div>
        
        <div className="login-header">
            <div className="logo">
                <h2>FWHT</h2>
            </div>
            <h1>Faculty Work Hours Tracker</h1>
            <p>Please login to access your dashboard</p>
        </div>
        
        <form id="loginForm" noValidate onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Institutional Email</label>
                <div className="input-field">
                    <input type="email" id="email" name="email" placeholder="name@institution.edu" required autoComplete="email" />
                    <span className="input-icon">
                        <i className="fas fa-envelope"></i>
                    </span>
                </div>
                <div id="email-error" className="error-message"></div>
            </div>
            
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-field">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        required 
                        autoComplete="current-password" 
                    />
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                        <i id="password-toggle-icon" className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                    </span>
                </div>
                <div id="caps-warning" className="caps-warning" style={{ display: capsLockOn ? 'block' : 'none' }}>
                    <i className="fas fa-exclamation-triangle"></i> Caps Lock is on
                </div>
                <div id="password-error" className="error-message"></div>
                <div id="password-requirements" className="input-requirements">
                    Password must contain:
                    <ul>
                        <li id="length">At least 8 characters long</li>
                        <li id="uppercase">At least 1 uppercase letter</li>
                        <li id="lowercase">At least 1 lowercase letter</li>
                        <li id="number">At least 1 number</li>
                        <li id="special">At least 1 special character</li>
                    </ul>
                </div>
            </div>
            
            <div className="additional-options">
                <div className="remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <div className="forgot-password">
                    <a href="#" id="forgot-password-link">Forgot Password?</a>
                </div>
            </div>
            
            <button type="submit" id="login-button" className="login-btn">
                Login
                <span className="spinner" id="login-spinner"></span>
            </button>
            
            <div className="divider">
                <hr /><span>OR</span><hr />
            </div>
            
            <div className="register-link">
                <p>Don't have an account? <a href="#" id="register-link">Register here</a></p>
            </div>
            
            <div className="footer">
                <p>© 2025 Faculty Work Hours Tracker</p>
                <p>Need help? <Link to="/it">Contact IT Support</Link></p>
                <div className="security-badge">
                    <i className="fas fa-lock"></i> Your connection to this site is secure
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login
