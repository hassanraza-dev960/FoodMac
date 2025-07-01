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

// Image Slider Functionality
let currentSlideIndex = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))
  slides[index].classList.add("active")
  dots[index].classList.add("active")
}

function changeSlide(direction) {
  currentSlideIndex += direction

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1
  }

  showSlide(currentSlideIndex)
}

function currentSlide(index) {
  currentSlideIndex = index - 1
  showSlide(currentSlideIndex)
}

// Auto-slide functionality
function autoSlide() {
  currentSlideIndex++
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0
  }
  showSlide(currentSlideIndex)
}

setInterval(autoSlide, 5000)

// Home page items data
const homeItems = [
  {
    id: 1,
    name: "Mac Burger",
    description: "Juicy beef patty with fresh vegetables",
    image: "/placeholder.svg?height=200&width=300",
    price: 350,
  },
  {
    id: 2,
    name: "Chicken Wings",
    description: "Crispy wings with special sauce",
    image: "/placeholder.svg?height=200&width=300",
    price: 450,
  },
  {
    id: 3,
    name: "Mac Pizza",
    description: "Loaded with cheese and toppings",
    image: "/placeholder.svg?height=200&width=300",
    price: 650,
  },
]

// Global cart variable
let cart = []

// DOM Elements
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const checkoutModal = document.getElementById("checkoutModal")
const cartItems = document.getElementById("cartItems")
const cartSummary = document.getElementById("cartSummary")
const checkoutBtn = document.getElementById("checkoutBtn")

// Initialize cart display on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay()
})

// Change Quantity Function
function changeQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const decreaseBtn = document.querySelector(`[onclick*="changeQuantity(${itemId}, -1)"]`)
  let currentQuantity = Number.parseInt(quantityElement.textContent)

  currentQuantity += change

  if (currentQuantity < 1) {
    currentQuantity = 1
  }

  quantityElement.textContent = currentQuantity
  decreaseBtn.disabled = currentQuantity <= 1
}

// Add to Cart Function
function addToCart(itemId) {
  const item = homeItems.find((i) => i.id === itemId)
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const quantity = Number.parseInt(quantityElement.textContent)

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === itemId)

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity
  } else {
    cart.push({
      id: itemId,
      name: item.name,
      size: "default",
      price: item.price,
      quantity: quantity,
      image: item.image,
    })
  }

  updateCartDisplay()

  // Reset quantity to 1
  quantityElement.textContent = "1"
  const decreaseBtn = document.querySelector(`[onclick*="changeQuantity(${itemId}, -1)"]`)
  decreaseBtn.disabled = true

  // Show success feedback
  const addBtn = event.target
  const originalText = addBtn.textContent
  addBtn.textContent = "Added!"
  addBtn.style.background = "#27ae60"

  setTimeout(() => {
    addBtn.textContent = originalText
    addBtn.style.background = "#27ae60"
  }, 1000)
}

// Update Cart Display
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `
    cartSummary.style.display = "none"
    checkoutBtn.disabled = true
  } else {
    cartItems.innerHTML = cart.map((item) => createCartItemHTML(item)).join("")
    cartSummary.style.display = "block"
    checkoutBtn.disabled = false
    updateCartSummary()
  }
}

// Create Cart Item HTML
function createCartItemHTML(item) {
  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-details">
          Rs. ${item.price} each
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, 'default', -1)">-</button>
        <span class="cart-quantity-display">${item.quantity}</span>
        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, 'default', 1)">+</button>
        <button class="delete-btn" onclick="removeFromCart(${item.id}, 'default')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `
}

// Update Cart Item Quantity
function updateCartItemQuantity(itemId, size, change) {
  const itemIndex = cart.findIndex((item) => item.id === itemId && item.size === size)

  if (itemIndex > -1) {
    cart[itemIndex].quantity += change

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1)
    }

    updateCartDisplay()
  }
}

// Remove from Cart
function removeFromCart(itemId, size) {
  const itemIndex = cart.findIndex((item) => item.id === itemId && item.size === size)

  if (itemIndex > -1) {
    cart.splice(itemIndex, 1)
    updateCartDisplay()
  }
}

// Update Cart Summary
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 100
  const total = subtotal + delivery

  document.getElementById("subtotal").textContent = `Rs. ${subtotal}`
  document.getElementById("total").textContent = `Rs. ${total}`
}

// Toggle Cart Modal
function toggleCart() {
  cartModal.classList.toggle("active")
}

// Open Checkout Modal
function openCheckout() {
  cartModal.classList.remove("active")
  checkoutModal.classList.add("active")
  updateCheckoutSummary()
}

// Close Checkout Modal
function closeCheckout() {
  checkoutModal.classList.remove("active")
}

// Update Checkout Summary
function updateCheckoutSummary() {
  const checkoutItems = document.getElementById("checkoutItems")
  const checkoutTotal = document.getElementById("checkoutTotal")

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 100
  const total = subtotal + delivery

  checkoutItems.innerHTML =
    cart
      .map(
        (item) => `
    <div class="checkout-item">
      <span>${item.quantity}x ${item.name}</span>
      <span>Rs. ${item.price * item.quantity}</span>
    </div>
  `,
      )
      .join("") +
    `
    <div class="checkout-item">
      <span>Delivery</span>
      <span>Rs. 100</span>
    </div>
  `

  checkoutTotal.textContent = `Rs. ${total}`
}

// Place Order Function
function placeOrder() {
  const customerName = document.getElementById("customerName").value.trim()
  const customerPhone = document.getElementById("customerPhone").value.trim()
  const deliveryAddress = document.getElementById("deliveryAddress").value.trim()

  if (!customerName || !customerPhone || !deliveryAddress) {
    alert("Please fill in all required fields")
    return
  }

  // Create order message
  let orderMessage = "*New Order from Food Mac Website*\n\n"
  orderMessage += "*Order Details:*\n"

  cart.forEach((item) => {
    orderMessage += `${item.quantity}x ${item.name} - Rs. ${item.price * item.quantity}\n`
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 100
  const total = subtotal + delivery

  orderMessage += `\n*Subtotal:* Rs. ${subtotal}\n`
  orderMessage += `*Delivery:* Rs. ${delivery}\n`
  orderMessage += `*Total:* Rs. ${total}\n\n`

  orderMessage += `*Customer Details:*\n`
  orderMessage += `*Name:* ${customerName}\n`
  orderMessage += `*Phone:* ${customerPhone}\n`
  orderMessage += `*Address:* ${deliveryAddress}\n\n`

  orderMessage += `Please confirm this order. Thank you!`

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(orderMessage)
  const whatsappURL = `https://wa.me/923078869698?text=${encodedMessage}`

  // Open WhatsApp
  window.open(whatsappURL, "_blank")

  // Clear cart and close modal
  cart = []
  updateCartDisplay()
  closeCheckout()

  // Show success message
  alert("Order sent to WhatsApp! Please wait for confirmation.")
}

// Close modals when clicking outside
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active")
  }
})

// Prevent modal content clicks from closing modal
document.querySelectorAll(".modal-content").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    event.stopPropagation()
  })
})

// Smooth scrolling for CTA buttons
document.querySelectorAll(".cta-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault()
    const popularSection = document.querySelector(".popular-items")
    popularSection.scrollIntoView({ behavior: "smooth" })
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
