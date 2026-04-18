// ============================================================
//  menu.js  —  Menu Page Script
//  Cart state and all cart functions live in cart.js.
//  This file only handles: menu rendering, filter buttons,
//  mobile nav, size selection, quantity controls, and
//  addToCart bridging.
// ============================================================

// ── Menu Data ─────────────────────────────────────────────────
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

// ── Page-level state ──────────────────────────────────────────
let currentFilter = "all"

// ── DOM References ────────────────────────────────────────────
const menuGrid = document.getElementById("menuGrid")

// ── Initialise on DOM ready ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems()
  setupFilterButtons()
  setupMobileMenu()
  // cart.js has already loaded `cart` from localStorage.
  // Just refresh the badge/display for this page.
  updateCartDisplay()
})

// ── Mobile Menu Setup ─────────────────────────────────────────
function setupMobileMenu() {
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
}

// ── Filter Buttons ────────────────────────────────────────────
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
      currentFilter = button.dataset.category
      renderMenuItems()
    })
  })
}

// ── Menu Rendering ────────────────────────────────────────────
function renderMenuItems() {
  const filteredItems =
    currentFilter === "all"
      ? menuData
      : menuData.filter((item) => item.category === currentFilter)

  menuGrid.innerHTML = filteredItems.map((item) => createMenuItemHTML(item)).join("")
}

function createMenuItemHTML(item) {
  const defaultSize  = item.hasSizes ? "M" : "default"
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
              `
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

// ── Size Selection ────────────────────────────────────────────
function selectSize(itemId, size) {
  const item         = menuData.find((i) => i.id === itemId)
  const sizeButtons  = document.querySelectorAll(`[onclick*="selectSize(${itemId}"]`)
  const priceElement = document.getElementById(`price-${itemId}`)

  sizeButtons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  priceElement.textContent = `Rs. ${item.prices[size]}`
}

// ── Quantity Controls (menu items) ───────────────────────────
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
  const item            = menuData.find((i) => i.id === itemId)
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const quantity        = Number.parseInt(quantityElement.textContent)

  let selectedSize = "default"
  let price        = item.prices.default

  if (item.hasSizes) {
    const activeSizeBtn =
      document.querySelector(`[onclick*="selectSize(${itemId}"] .active`) ||
      document.querySelector(`[onclick*="selectSize(${itemId}"].active`)

    if (activeSizeBtn) {
      selectedSize = activeSizeBtn.textContent
      price        = item.prices[selectedSize]
    } else {
      selectedSize = "M"
      price        = item.prices.M
    }
  }

  // Delegate to the shared cartAdd() defined in cart.js
  cartAdd({
    id:       itemId,
    name:     item.name,
    size:     selectedSize,
    price:    price,
    quantity: quantity,
    image:    item.image,
  })

  // Reset quantity selector to 1
  quantityElement.textContent = "1"
  const decreaseBtn = document.querySelector(`[onclick*="changeQuantity(${itemId}, -1)"]`)
  decreaseBtn.disabled = true

  // Button feedback
  const addBtn       = event.target
  const originalText = addBtn.textContent
  addBtn.textContent      = "Added!"
  addBtn.style.background = "#27ae60"

  setTimeout(() => {
    addBtn.textContent      = originalText
    addBtn.style.background = "#27ae60"
  }, 1000)
}