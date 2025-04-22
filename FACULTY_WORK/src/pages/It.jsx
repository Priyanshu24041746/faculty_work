import React, { useState } from 'react'
import "./It.css"
import { Link } from 'react-router-dom'

const IT = () => {
    const [formData, setFormData] = useState({
        name: '',
        problem: '',
        contactNo: '',
        email: '',
        description: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.name) {
            newErrors.name = 'Name is required'
        }
        
        if (!formData.problem) {
            newErrors.problem = 'Issue type is required'
        }
        
        if (!formData.contactNo) {
            newErrors.contactNo = 'Contact number is required'
        } else {
            const phoneRegex = /^\d{10,15}$/
            if (!phoneRegex.test(formData.contactNo.replace(/\D/g, ''))) {
                newErrors.contactNo = 'Please enter a valid contact number'
            }
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address'
            }
        }
        
        if (!formData.description) {
            newErrors.description = 'Description is required'
        } else if (formData.description.length < 20) {
            newErrors.description = 'Please provide a more detailed description (at least 20 characters)'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            setIsSubmitting(true)
            
            // Simulate submission delay
            setTimeout(() => {
                setMessage({
                    text: 'Your support request has been submitted successfully. We will contact you soon.',
                    type: 'success'
                })
                setFormData({
                    name: '',
                    problem: '',
                    contactNo: '',
                    email: '',
                    description: ''
                })
                setIsSubmitting(false)
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    setMessage({ text: '', type: '' })
                }, 5000)
            }, 1500)
        }
    }

    return (
        <div>
            <div className="support-container">
                <div className="support-header">
                    <div className="logo">
                        <h2>IT Support</h2>
                    </div>
                    <h2>Contact Us</h2>
                    <p>We're Here to Help for Issues you Encounter</p>
                </div>
                
                <form id="supportForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <div className="input-field">
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name" 
                                required 
                            />
                            <span className="input-icon">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="problem">Issue Type</label>
                        <div className="input-field">
                            <input 
                                type="text" 
                                id="problem" 
                                name="problem" 
                                value={formData.problem}
                                onChange={handleChange}
                                placeholder="Ex: Login Issue, Data Entry Problem, Attendence Issues, etc" 
                                required 
                            />
                            <span className="input-icon">
                                <i className="fas fa-exclamation-circle"></i>
                            </span>
                        </div>
                        {errors.problem && <div className="error-message">{errors.problem}</div>}
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="contactNo">Contact Number</label>
                        <div className="input-field">
                            <input 
                                type="tel" 
                                id="contactNo" 
                                name="contactNo" 
                                value={formData.contactNo}
                                onChange={handleChange}
                                placeholder="Enter your phone number" 
                                required 
                            />
                            <span className="input-icon">
                                <i className="fas fa-phone"></i>
                            </span>
                        </div>
                        {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-field">
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your institutional email" 
                                required 
                            />
                            <span className="input-icon">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your issue in detail" 
                            required 
                        />
                        {errors.description && <div className="error-message">{errors.description}</div>}
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        {isSubmitting && <span className="spinner" id="submit-spinner"></span>}
                    </button>
                </form>
                
                {message.text && (
                    <div className={`form-result ${message.type}`}>
                        {message.text}
                    </div>
                )}
                
                <div className="back-link">
                    <Link to="/login">
                        <i className="fas fa-arrow-left"></i> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default IT
