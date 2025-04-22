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

// Show/hide password requirements
document.getElementById('password').addEventListener('focus', function() {
    document.getElementById('password-requirements').classList.add('active');
});

// Password strength validation
document.getElementById('password').addEventListener('input', function() {
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

function updateRequirement(id, isValid) {
    const element = document.getElementById(id);
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
}

// Detect Caps Lock
document.getElementById('password').addEventListener('keyup', function(event) {
    const capsWarning = document.getElementById('caps-warning');
    if (event.getModifierState('CapsLock')) {
        capsWarning.style.display = 'block';
    } else {
        capsWarning.style.display = 'none';
    }
});

// Form validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    
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
        document.getElementById('login-button').innerHTML = 'Logging in... <span class="spinner" id="login-spinner" style="display:inline-block"></span>';
        document.getElementById('login-button').disabled = true;
        
        // Simulate authentication (replace with actual authentication logic)
        simulateAuthentication(email, password);
    }
});

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
    document.getElementById('login-button').innerHTML = 'Login';
    document.getElementById('login-button').disabled = false;
}

// Alert handling
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
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
    document.getElementById('alert').style.display = 'none';
}

// Handle "Forgot Password" link
document.getElementById('forgot-password-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAlert('A password reset link will be sent to your institutional email address.', 'info');
});

// Handle "Register" link
document.getElementById('register-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAlert('Registration functionality will be available soon. Please contact your administrator.', 'info');
});