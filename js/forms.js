// Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeEnquiryForm();
    initializeFormAnimations();
});

// Contact Form Validation
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');
        const charCount = document.getElementById('charCount');
        const submitBtn = document.getElementById('contactSubmit');
        
        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        subjectInput.addEventListener('change', validateSubject);
        messageInput.addEventListener('input', function() {
            validateMessage(this);
            updateCharCount(this, charCount, 1000);
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

function validateContactForm() {
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPhone = validatePhone();
    const isValidSubject = validateSubject();
    const isValidMessage = validateMessage();
    
    return isValidName && isValidEmail && isValidPhone && isValidSubject && isValidMessage;
}

function validateName() {
    const nameInput = document.getElementById('contactName');
    const errorElement = document.getElementById('nameError');
    const name = nameInput.value.trim();
    
    if (name === '') {
        showError(nameInput, errorElement, 'Please enter your full name');
        return false;
    } else if (name.length < 2) {
        showError(nameInput, errorElement, 'Name must be at least 2 characters long');
        return false;
    } else {
        clearError(nameInput, errorElement);
        return true;
    }
}

function validateEmail() {
    const emailInput = document.getElementById('contactEmail');
    const errorElement = document.getElementById('emailError');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, errorElement, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        clearError(emailInput, errorElement);
        return true;
    }
}

function validatePhone() {
    const phoneInput = document.getElementById('contactPhone');
    const errorElement = document.getElementById('phoneError');
    const phone = phoneInput.value.trim();
    
    // Phone is optional, but if provided, validate format
    if (phone !== '' && !isValidPhoneNumber(phone)) {
        showError(phoneInput, errorElement, 'Please enter a valid phone number');
        return false;
    } else {
        clearError(phoneInput, errorElement);
        return true;
    }
}

function validateSubject() {
    const subjectInput = document.getElementById('contactSubject');
    const errorElement = document.getElementById('subjectError');
    const subject = subjectInput.value;
    
    if (subject === '') {
        showError(subjectInput, errorElement, 'Please select a subject');
        return false;
    } else {
        clearError(subjectInput, errorElement);
        return true;
    }
}

function validateMessage() {
    const messageInput = document.getElementById('contactMessage');
    const errorElement = document.getElementById('messageError');
    const message = messageInput.value.trim();
    
    if (message === '') {
        showError(messageInput, errorElement, 'Please enter your message');
        return false;
    } else if (message.length < 10) {
        showError(messageInput, errorElement, 'Message must be at least 10 characters long');
        return false;
    } else {
        clearError(messageInput, errorElement);
        return true;
    }
}

// Enquiry Form Validation
function initializeEnquiryForm() {
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        const enquiryType = document.getElementById('enquiryType');
        const enquiryProduct = document.getElementById('enquiryProduct');
        const enquiryMessage = document.getElementById('enquiryMessage');
        const enquiryCharCount = document.getElementById('enquiryCharCount');
        
        // Show/hide product selection based on enquiry type
        enquiryType.addEventListener('change', function() {
            if (this.value === 'product' || this.value === 'quote' || this.value === 'bulk') {
                document.getElementById('productSelection').style.display = 'block';
            } else {
                document.getElementById('productSelection').style.display = 'none';
            }
        });
        
        // Real-time validation
        document.getElementById('enquiryName').addEventListener('blur', validateEnquiryName);
        document.getElementById('enquiryEmail').addEventListener('blur', validateEnquiryEmail);
        document.getElementById('enquiryPhone').addEventListener('blur', validateEnquiryPhone);
        enquiryType.addEventListener('change', validateEnquiryType);
        enquiryMessage.addEventListener('input', function() {
            validateEnquiryMessage(this);
            updateCharCount(this, enquiryCharCount, 2000);
        });
        
        // Form submission
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateEnquiryForm()) {
                submitEnquiryForm();
            }
        });
    }
}

function validateEnquiryForm() {
    const isValidName = validateEnquiryName();
    const isValidEmail = validateEnquiryEmail();
    const isValidPhone = validateEnquiryPhone();
    const isValidType = validateEnquiryType();
    const isValidMessage = validateEnquiryMessage();
    
    return isValidName && isValidEmail && isValidPhone && isValidType && isValidMessage;
}

function validateEnquiryName() {
    const nameInput = document.getElementById('enquiryName');
    const errorElement = document.getElementById('enquiryNameError');
    return validateNameField(nameInput, errorElement);
}

function validateEnquiryEmail() {
    const emailInput = document.getElementById('enquiryEmail');
    const errorElement = document.getElementById('enquiryEmailError');
    return validateEmailField(emailInput, errorElement);
}

function validateEnquiryPhone() {
    const phoneInput = document.getElementById('enquiryPhone');
    const errorElement = document.getElementById('enquiryPhoneError');
    const phone = phoneInput.value.trim();
    
    if (phone === '') {
        showError(phoneInput, errorElement, 'Please enter your phone number');
        return false;
    } else if (!isValidPhoneNumber(phone)) {
        showError(phoneInput, errorElement, 'Please enter a valid South African phone number');
        return false;
    } else {
        clearError(phoneInput, errorElement);
        return true;
    }
}

function validateEnquiryType() {
    const typeInput = document.getElementById('enquiryType');
    const errorElement = document.getElementById('enquiryTypeError');
    const type = typeInput.value;
    
    if (type === '') {
        showError(typeInput, errorElement, 'Please select an enquiry type');
        return false;
    } else {
        clearError(typeInput, errorElement);
        return true;
    }
}

function validateEnquiryMessage() {
    const messageInput = document.getElementById('enquiryMessage');
    const errorElement = document.getElementById('enquiryMessageError');
    const message = messageInput.value.trim();
    
    if (message === '') {
        showError(messageInput, errorElement, 'Please provide details about your enquiry');
        return false;
    } else if (message.length < 20) {
        showError(messageInput, errorElement, 'Please provide more details (at least 20 characters)');
        return false;
    } else {
        clearError(messageInput, errorElement);
        return true;
    }
}

// Utility Functions
function validateNameField(input, errorElement) {
    const name = input.value.trim();
    
    if (name === '') {
        showError(input, errorElement, 'Please enter your full name');
        return false;
    } else if (name.length < 2) {
        showError(input, errorElement, 'Name must be at least 2 characters long');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function validateEmailField(input, errorElement) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(input, errorElement, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(input, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        clearError(input, errorElement);
        return true;
    }
}

function isValidPhoneNumber(phone) {
    // South African phone number validation
    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function updateCharCount(textarea, countElement, maxLength) {
    const count = textarea.value.length;
    countElement.textContent = count;
    
    if (count > maxLength * 0.9) {
        countElement.style.color = '#e74c3c';
    } else if (count > maxLength * 0.75) {
        countElement.style.color = '#f39c12';
    } else {
        countElement.style.color = '#666';
    }
}

// Form Submission Handlers
function submitContactForm() {
    const submitBtn = document.getElementById('contactSubmit');
    const submitText = submitBtn.querySelector('.submit-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    submitText.textContent = 'Sending...';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // Reset button state (for demo purposes)
        setTimeout(() => {
            submitText.textContent = 'Send Message';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
}

function submitEnquiryForm() {
    const submitBtn = document.getElementById('enquirySubmit');
    const submitText = submitBtn.querySelector('.submit-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    submitText.textContent = 'Submitting...';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Generate reference number
    const refNumber = 'WS' + Date.now().toString().slice(-6);
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        document.getElementById('enquiryForm').style.display = 'none';
        document.getElementById('enquirySuccess').style.display = 'block';
        document.getElementById('referenceNumber').textContent = refNumber;
        
        // Reset button state (for demo purposes)
        setTimeout(() => {
            submitText.textContent = 'Submit Enquiry';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    }, 3000);
}

// Form animations
function initializeFormAnimations() {
    const formSections = document.querySelectorAll('.form-section');
    
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}