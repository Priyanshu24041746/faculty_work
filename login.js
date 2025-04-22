

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const icon = document.getElementById('password-toggle-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password requirements validation functions
function setupPasswordValidation() {
    // Show/hide password requirements
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('focus', function() {
        const requirements = document.getElementById('password-requirements');
        if (requirements) requirements.classList.add('active');
    });
    
    // Password strength validation
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Length check
        const lengthValid = password.length >= 8;
        updateRequirement('length', lengthValid);
        
        // Uppercase check
        const uppercaseValid = /[A-Z]/.test(password);
        updateRequirement('uppercase', uppercaseValid);
        
        // Lowercase check
        const lowercaseValid = /[a-z]/.test(password);
        updateRequirement('lowercase', lowercaseValid);
        
        // Number check
        const numberValid = /[0-9]/.test(password);
        updateRequirement('number', numberValid);
        
        // Special character check
        const specialValid = /[^A-Za-z0-9]/.test(password);
        updateRequirement('special', specialValid);
    });
    
    // Detect Caps Lock
    passwordInput.addEventListener('keyup', function(event) {
        const capsWarning = document.getElementById('caps-warning');
        if (!capsWarning) return;
        
        if (event.getModifierState('CapsLock')) {
            capsWarning.style.display = 'block';
        } else {
            capsWarning.style.display = 'none';
        }
    });
}

function updateRequirement(id, isValid) {
    const element = document.getElementById(id);
    if (!element) return;
    
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
}

// Alert handling functions
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    if (!alert) return;
    
    const alertMessage = document.getElementById('alert-message');
    
    alert.className = 'alert';
    alert.classList.add(`alert-${type}`);
    alertMessage.textContent = message;
    alert.style.display = 'block';
    
    if (type === 'success' || type === 'info') {
        setTimeout(closeAlert, 5000);
    }
}

function closeAlert() {
    const alert = document.getElementById('alert');
    if (alert) alert.style.display = 'none';
}

// Initialize common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Setup password validation if on a page with password field
    setupPasswordValidation();
    
    // Setup login form if it exists
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateLoginForm(event);
        });
    }
    
    // Setup forgot password link if it exists
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('A password reset link will be sent to your institutional email address.', 'info');
        });
    }
    
    // Setup register link if it exists
    const registerLink = document.getElementById('register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Registration functionality will be available soon. Please contact your administrator.', 'info');
        });
    }
});

// Login form validation
function validateLoginForm(event) {
    let isValid = true;
    
    // Reset all error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.edu')) {
        emailError.textContent = 'Please enter a valid institutional email address';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Password validation
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    if (isValid) {
        // Show loading spinner
        const loginButton = document.getElementById('login-button');
        loginButton.innerHTML = 'Logging in... <span class="spinner" id="login-spinner" style="display:inline-block"></span>';
        loginButton.disabled = true;
        
        // Simulate authentication (replace with actual authentication logic)
        simulateAuthentication(email, password);
    }
}

// Simulate authentication (for demonstration purposes)
function simulateAuthentication(email, password) {
    // This is a simulation - in a real app, you would call your authentication API
    setTimeout(function() {
        // Simulate a failed login
        if (password === 'wrongpassword') {
            showAlert('Invalid email or password. Please try again.', 'error');
            resetLoginButton();
        } else {
            // Simulate successful login
            showAlert('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(function() {
                // Redirect to dashboard (in a real app)
                // window.location.href = 'dashboard.html';
                
                // For demo, just reset the form
                document.getElementById('loginForm').reset();
                resetLoginButton();
            }, 2000);
        }
    }, 1500);
}

function resetLoginButton() {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.innerHTML = 'Login';
        loginButton.disabled = false;
    }
}

// Form validation helper
function showInputError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Form result message display
function showMessage(message, type, elementId = 'formResult') {
    const resultDiv = document.getElementById(elementId);
    if (!resultDiv) return;
    
    resultDiv.innerHTML = message;
    resultDiv.style.display = 'block';
    
    resultDiv.className = '';
    resultDiv.classList.add(type === 'error' ? 'result-error' : 'result-success');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}