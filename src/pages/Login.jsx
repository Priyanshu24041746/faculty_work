import React, { useState, useEffect } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'

const Login = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profession: '',
    otherProfession: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})

  const professions = [
    { value: 'assistant_professor', label: 'Assistant Professor' },
    { value: 'professor', label: 'Professor' },
    { value: 'other', label: 'Other' }
  ]

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    if (!formData.profession) {
      newErrors.profession = 'Please select your profession'
    } else if (formData.profession === 'other' && !formData.otherProfession) {
      newErrors.otherProfession = 'Please specify your profession'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle login logic here
      console.log('Form submitted:', formData)
      // Redirect to punch page
      navigate('/punch')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <i className="fas fa-clock fa-2x"></i>
            <h2>FWHT</h2>
          </div>
          <h1>Faculty Work Hours Tracker</h1>
          <p>Please login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Institutional Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@institution.edu" 
              required 
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="input-group">
            <label htmlFor="profession">
              <i className="fas fa-user-tie"></i> Profession
            </label>
            <select 
              id="profession" 
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            >
              <option value="">Select your profession</option>
              {professions.map(prof => (
                <option key={prof.value} value={prof.value}>
                  {prof.label}
                </option>
              ))}
            </select>
            {errors.profession && <div className="error-message">{errors.profession}</div>}
          </div>

          {formData.profession === 'other' && (
            <div className="input-group">
              <label htmlFor="otherProfession">
                <i className="fas fa-pencil-alt"></i> Specify Profession
              </label>
              <input 
                type="text" 
                id="otherProfession" 
                name="otherProfession"
                value={formData.otherProfession}
                onChange={handleChange}
                placeholder="Enter your profession" 
              />
              {errors.otherProfession && <div className="error-message">{errors.otherProfession}</div>}
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password" 
                required 
              />
              <i 
                className={`fas fa-${showPassword ? 'eye-slash' : 'eye'} password-toggle`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div id="caps-warning" className="caps-warning" style={{ display: capsLockOn ? 'block' : 'none' }}>
              <i className="fas fa-exclamation-triangle"></i> Caps Lock is on
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="additional-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember">
                Remember me
              </label>
            </div>
            <div className="forgot-password">
              <Link to="/it">
                <i className="fas fa-question-circle"></i> Forgot Password?
              </Link>
            </div>
          </div>
          
          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </form>
        
        <div className="footer">
          <p>© 2025 Faculty Work Hours Tracker</p>
          <p>
            <Link to="/it">
              <i className="fas fa-headset"></i> Need help? Contact IT Support
            </Link>
          </p>
          <div className="security-badge">
            <i className="fas fa-lock"></i> Your connection to this site is secure
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
