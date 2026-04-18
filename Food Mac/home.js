// ============================================================
//  home.js  —  Homepage Script
//  Cart state and all cart functions live in cart.js.
//  This file only handles: slider, mobile nav, home item
//  rendering, quantity controls, and addToCart bridging.
// ============================================================

// ── Mobile Navigation Toggle ──────────────────────────────────
const hamburger = document.querySelector(".hamburger")
const navMenu   = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
)

// ── Image Slider ──────────────────────────────────────────────
let currentSlideIndex = 0
const slides = document.querySelectorAll(".slide")
const dots   = document.querySelectorAll(".dot")

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot)   => dot.classList.remove("active"))
  slides[index].classList.add("active")
  dots[index].classList.add("active")
}

function changeSlide(direction) {
  currentSlideIndex += direction
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0
  else if (currentSlideIndex < 0)         currentSlideIndex = slides.length - 1
  showSlide(currentSlideIndex)
}

function currentSlide(index) {
  currentSlideIndex = index - 1
  showSlide(currentSlideIndex)
}

function autoSlide() {
  currentSlideIndex++
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0
  showSlide(currentSlideIndex)
}

setInterval(autoSlide, 5000)

// ── Home Page Items Data ──────────────────────────────────────
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

// ── Initialise on DOM ready ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // cart.js has already loaded `cart` from localStorage.
  // Just refresh the badge/display for this page.
  updateCartDisplay()
})

// ── Quantity Controls (home items) ───────────────────────────
function changeQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const decreaseBtn     = document.querySelector(`[onclick*="changeQuantity(${itemId}, -1)"]`)
  let currentQuantity   = Number.parseInt(quantityElement.textContent)

  currentQuantity += change
  if (currentQuantity < 1) currentQuantity = 1

  quantityElement.textContent = currentQuantity
  decreaseBtn.disabled        = currentQuantity <= 1
}

// ── Add to Cart (delegates to cart.js cartAdd) ────────────────
function addToCart(itemId) {
  const item            = homeItems.find((i) => i.id === itemId)
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const quantity        = Number.parseInt(quantityElement.textContent)

  // Delegate to the shared cartAdd() defined in cart.js
  cartAdd({
    id:       itemId,
    name:     item.name,
    size:     "default",
    price:    item.price,
    quantity: quantity,
    image:    item.image,
  })

  // Reset quantity selector to 1
  quantityElement.textContent = "1"
  const decreaseBtn = document.querySelector(`[onclick*="changeQuantity(${itemId}, -1)"]`)
  decreaseBtn.disabled = true

  // Button feedback
  const addBtn     = event.target
  const originalText = addBtn.textContent
  addBtn.textContent  = "Added!"
  addBtn.style.background = "#27ae60"

  setTimeout(() => {
    addBtn.textContent      = originalText
    addBtn.style.background = "#27ae60"
  }, 1000)
}

// ── Scroll / Header Effect ────────────────────────────────────
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background     = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background     = "#fff"
    header.style.backdropFilter = "none"
  }
})

// ── Smooth Scroll for CTA Buttons ────────────────────────────
document.querySelectorAll(".cta-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault()
    const popularSection = document.querySelector(".popular-items")
    popularSection.scrollIntoView({ behavior: "smooth" })
  })
})