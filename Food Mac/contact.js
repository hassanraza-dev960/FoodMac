// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
const submitBtn = document.querySelector(".submit-btn")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Validate form
  if (validateForm(formObject)) {
    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    // Simulate form submission
    setTimeout(() => {
      showSuccessMessage()
      contactForm.reset()
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'
    }, 2000)
  }
})

function validateForm(data) {
  const requiredFields = ["name", "email", "subject", "message"]
  let isValid = true

  requiredFields.forEach((field) => {
    const input = document.getElementById(field)
    if (!data[field] || data[field].trim() === "") {
      showFieldError(input, "This field is required")
      isValid = false
    } else {
      clearFieldError(input)
    }
  })

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    showFieldError(document.getElementById("email"), "Please enter a valid email address")
    isValid = false
  }

  return isValid
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showFieldError(input, message) {
  clearFieldError(input)
  input.style.borderColor = "#e74c3c"

  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.style.color = "#e74c3c"
  errorDiv.style.fontSize = "0.9rem"
  errorDiv.style.marginTop = "0.5rem"
  errorDiv.textContent = message

  input.parentNode.appendChild(errorDiv)
}

function clearFieldError(input) {
  input.style.borderColor = "#ddd"
  const existingError = input.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
}

function showSuccessMessage() {
  // Create success message
  const successDiv = document.createElement("div")
  successDiv.className = "success-message show"
  successDiv.innerHTML =
    '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We\'ll get back to you soon.'

  // Insert before form
  contactForm.parentNode.insertBefore(successDiv, contactForm)

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.remove()
  }, 5000)

  // Scroll to success message
  successDiv.scrollIntoView({ behavior: "smooth", block: "center" })
}

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all FAQ items
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})

// Phone number formatting
const phoneInput = document.getElementById("phone")
phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")
  if (value.startsWith("92")) {
    value = "+" + value
  } else if (value.startsWith("0")) {
    value = "+92" + value.substring(1)
  }
  e.target.value = value
})
