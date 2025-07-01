// Menu Data
const menuData = [
  // Pizzas
  {
    id: 1,
    name: "Margherita Pizza",
    category: "pizzas",
    description: "Fresh tomatoes, mozzarella cheese, and basil",
    image: "Margherita Pizza.jpg",
    prices: { S: 450, M: 650, L: 850, XL: 1050 },
    hasSizes: true,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "pizzas",
    description: "Pepperoni, mozzarella cheese, and tomato sauce",
    image: "Pepperoni Pizza.jpg",
    prices: { S: 550, M: 750, L: 950, XL: 1150 },
    hasSizes: true,
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    category: "pizzas",
    description: "BBQ chicken, onions, bell peppers, and BBQ sauce",
    image: "BBQ Chicken Pizza.jpg",
    prices: { S: 650, M: 850, L: 1050, XL: 1250 },
    hasSizes: true,
  },
  {
    id: 4,
    name: "Veggie Supreme Pizza",
    category: "pizzas",
    description: "Mixed vegetables, olives, and cheese",
    image: "Veggie Supreme Pizza.jpg",
    prices: { S: 500, M: 700, L: 900, XL: 1100 },
    hasSizes: true,
  },

  // Burgers
  {
    id: 5,
    name: "Classic Beef Burger",
    category: "burgers",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    image: "Classic Beef Burger.jpg",
    prices: { default: 350 },
    hasSizes: false,
  },
  {
    id: 6,
    name: "Chicken Burger",
    category: "burgers",
    description: "Grilled chicken breast with fresh vegetables",
    image: "Chicken Burger.jpg",
    prices: { default: 320 },
    hasSizes: false,
  },
  {
    id: 7,
    name: "Double Cheese Burger",
    category: "burgers",
    description: "Double beef patty with double cheese",
    image: "Double Cheese Burger.jpg",
    prices: { default: 450 },
    hasSizes: false,
  },
  {
    id: 8,
    name: "Fish Burger",
    category: "burgers",
    description: "Crispy fish fillet with tartar sauce",
    image: "Fish Burger.jpeg",
    prices: { default: 380 },
    hasSizes: false,
  },

  // Shawarmas
  {
    id: 9,
    name: "Chicken Shawarma",
    category: "shawarmas",
    description: "Tender chicken with garlic sauce and vegetables",
    image: "Chicken Shawarma.jpg",
    prices: { default: 250 },
    hasSizes: false,
  },
  {
    id: 10,
    name: "Beef Shawarma",
    category: "shawarmas",
    description: "Seasoned beef with tahini sauce",
    image: "Beef Shawarma.jpg",
    prices: { default: 280 },
    hasSizes: false,
  },
  {
    id: 11,
    name: "Mixed Shawarma",
    category: "shawarmas",
    description: "Chicken and beef combo with special sauce",
    image: "Mixed Shawarma.jpg",
    prices: { default: 320 },
    hasSizes: false,
  },

  // Sandwiches
  {
    id: 12,
    name: "Club Sandwich",
    category: "sandwiches",
    description: "Triple layer with chicken, bacon, and vegetables",
    image: "Club Sandwich.jpg",
    prices: { default: 300 },
    hasSizes: false,
  },
  {
    id: 13,
    name: "Grilled Chicken Sandwich",
    category: "sandwiches",
    description: "Grilled chicken breast with mayo and lettuce",
    image: "Grilled Chicken Sandwich.jpg",
    prices: { default: 280 },
    hasSizes: false,
  },
  {
    id: 14,
    name: "Tuna Sandwich",
    category: "sandwiches",
    description: "Fresh tuna with vegetables and mayo",
    image: "Tuna Sandwich.jpg",
    prices: { default: 250 },
    hasSizes: false,
  },

  // Fries
  {
    id: 15,
    name: "Regular Fries",
    category: "fries",
    description: "Crispy golden fries with salt",
    image: "Regular Fries.jpg",
    prices: { S: 120, M: 180, L: 240, XL: 300 },
    hasSizes: true,
  },
  {
    id: 16,
    name: "Cheese Fries",
    category: "fries",
    description: "Fries topped with melted cheese",
    image: "Cheese Fries.jpeg",
    prices: { S: 150, M: 220, L: 290, XL: 360 },
    hasSizes: true,
  },
  {
    id: 17,
    name: "Loaded Fries",
    category: "fries",
    description: "Fries with cheese, bacon, and sour cream",
    image: "Loaded Fries.jpeg",
    prices: { S: 200, M: 280, L: 360, XL: 440 },
    hasSizes: true,
  },
]

// Global Variables
let cart = []
let currentFilter = "all"

// DOM Elements
const menuGrid = document.getElementById("menuGrid")
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const checkoutModal = document.getElementById("checkoutModal")
const cartItems = document.getElementById("cartItems")
const cartSummary = document.getElementById("cartSummary")
const checkoutBtn = document.getElementById("checkoutBtn")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems()
  setupFilterButtons()
  setupMobileMenu()
  updateCartDisplay()
})

// Mobile Menu Setup
function setupMobileMenu() {
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
}

// Setup Filter Buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      // Update current filter and render items
      currentFilter = button.dataset.category
      renderMenuItems()
    })
  })
}

// Render Menu Items
function renderMenuItems() {
  const filteredItems = currentFilter === "all" ? menuData : menuData.filter((item) => item.category === currentFilter)

  menuGrid.innerHTML = filteredItems.map((item) => createMenuItemHTML(item)).join("")
}

// Create Menu Item HTML
function createMenuItemHTML(item) {
  const defaultSize = item.hasSizes ? "M" : "default"
  const defaultPrice = item.prices[defaultSize]

  return `
    <div class="menu-item" data-category="${item.category}">
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-description">${item.description}</p>
        <div class="item-price" id="price-${item.id}">Rs. ${defaultPrice}</div>
        
        ${
          item.hasSizes
            ? `
          <div class="size-selection">
            <label>Size:</label>
            <div class="size-options">
              ${Object.keys(item.prices)
                .map(
                  (size) => `
                <button class="size-btn ${size === "M" ? "active" : ""}" 
                        onclick="selectSize(${item.id}, '${size}')">${size}</button>
              `,
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
        
        <div class="quantity-selection">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)" disabled>-</button>
            <span class="quantity-display" id="quantity-${item.id}">1</span>
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        
        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `
}

// Select Size Function
function selectSize(itemId, size) {
  const item = menuData.find((i) => i.id === itemId)
  const sizeButtons = document.querySelectorAll(`[onclick*="selectSize(${itemId}"]`)
  const priceElement = document.getElementById(`price-${itemId}`)

  // Update active size button
  sizeButtons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Update price display
  priceElement.textContent = `Rs. ${item.prices[size]}`
}

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
  const item = menuData.find((i) => i.id === itemId)
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const quantity = Number.parseInt(quantityElement.textContent)

  let selectedSize = "default"
  let price = item.prices.default

  if (item.hasSizes) {
    const activeSizeBtn =
      document.querySelector(`[onclick*="selectSize(${itemId}"] .active`) ||
      document.querySelector(`[onclick*="selectSize(${itemId}"].active`)
    if (activeSizeBtn) {
      selectedSize = activeSizeBtn.textContent
      price = item.prices[selectedSize]
    } else {
      selectedSize = "M"
      price = item.prices.M
    }
  }

  // Check if item with same size already exists in cart
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === itemId && cartItem.size === selectedSize)

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity
  } else {
    cart.push({
      id: itemId,
      name: item.name,
      size: selectedSize,
      price: price,
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
          ${item.size !== "default" ? `Size: ${item.size} | ` : ""}
          Rs. ${item.price} each
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, '${item.size}', -1)">-</button>
        <span class="cart-quantity-display">${item.quantity}</span>
        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, '${item.size}', 1)">+</button>
        <button class="delete-btn" onclick="removeFromCart(${item.id}, '${item.size}')">
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
      <span>${item.quantity}x ${item.name} ${item.size !== "default" ? `(${item.size})` : ""}</span>
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
    orderMessage += `${item.quantity}x ${item.name}`
    if (item.size !== "default") {
      orderMessage += ` (${item.size})`
    }
    orderMessage += ` - Rs. ${item.price * item.quantity}\n`
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

  orderMessage += `Order Confirmed. Thank you!`

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
