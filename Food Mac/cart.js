// ============================================================
//  cart.js  —  Shared Cart Module
//  Handles all cart state using localStorage so items persist
//  across page navigation (home ↔ menu).
//
//  Include this file in EVERY page that uses a cart, before
//  the page-specific script (home.js / menu.js):
//    <script src="cart.js"></script>
//    <script src="home.js"></script>   <!-- or menu.js -->
// ============================================================

const CART_STORAGE_KEY = "foodmac_cart"

// ── Internal helpers ──────────────────────────────────────────

/** Load cart array from localStorage (returns [] if nothing saved). */
function _loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Persist the current cart array to localStorage. */
function _saveCart(cartArray) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray))
  } catch {
    // localStorage unavailable (private-browsing quota, etc.) — fail silently
  }
}

// ── Public cart state ─────────────────────────────────────────
//  Both home.js and menu.js reference this global `cart` variable.
//  It is initialised from localStorage the moment cart.js loads.

var cart = _loadCart()

// ── Cart mutation functions ───────────────────────────────────

/**
 * Add an item to the cart (or increment quantity if it already exists).
 * @param {object} itemToAdd  — { id, name, size, price, quantity, image }
 */
function cartAdd(itemToAdd) {
  const existingIndex = cart.findIndex(
    (ci) => ci.id === itemToAdd.id && ci.size === itemToAdd.size
  )

  if (existingIndex > -1) {
    cart[existingIndex].quantity += itemToAdd.quantity
  } else {
    cart.push(itemToAdd)
  }

  _saveCart(cart)
  updateCartDisplay()
}

/**
 * Update the quantity of a specific cart line.
 * Removes the line if quantity drops to 0 or below.
 */
function updateCartItemQuantity(itemId, size, change) {
  const itemIndex = cart.findIndex(
    (item) => item.id === itemId && item.size === size
  )

  if (itemIndex > -1) {
    cart[itemIndex].quantity += change

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1)
    }

    _saveCart(cart)
    updateCartDisplay()
  }
}

/** Remove a specific cart line entirely. */
function removeFromCart(itemId, size) {
  const itemIndex = cart.findIndex(
    (item) => item.id === itemId && item.size === size
  )

  if (itemIndex > -1) {
    cart.splice(itemIndex, 1)
    _saveCart(cart)
    updateCartDisplay()
  }
}

/** Clear the entire cart (called after a successful order). */
function clearCart() {
  cart = []
  _saveCart(cart)
  updateCartDisplay()
}

// ── Display helpers (used by both pages) ─────────────────────

/** Re-render the cart badge, item list, and summary. */
function updateCartDisplay() {
  const cartCountEl  = document.getElementById("cartCount")
  const cartItemsEl  = document.getElementById("cartItems")
  const cartSummaryEl = document.getElementById("cartSummary")
  const checkoutBtnEl = document.getElementById("checkoutBtn")

  if (!cartCountEl) return // guard: cart UI not present on this page

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCountEl.textContent = totalItems

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `
    cartSummaryEl.style.display = "none"
    checkoutBtnEl.disabled = true
  } else {
    cartItemsEl.innerHTML = cart.map((item) => createCartItemHTML(item)).join("")
    cartSummaryEl.style.display = "block"
    checkoutBtnEl.disabled = false
    updateCartSummary()
  }
}

/** Build the HTML for a single cart row. */
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
        <button class="cart-quantity-btn"
                onclick="updateCartItemQuantity(${item.id}, '${item.size}', -1)">-</button>
        <span class="cart-quantity-display">${item.quantity}</span>
        <button class="cart-quantity-btn"
                onclick="updateCartItemQuantity(${item.id}, '${item.size}', 1)">+</button>
        <button class="delete-btn"
                onclick="removeFromCart(${item.id}, '${item.size}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `
}

/** Recalculate and render subtotal / total in the cart panel. */
function updateCartSummary() {
  const subtotalEl = document.getElementById("subtotal")
  const totalEl    = document.getElementById("total")

  if (!subtotalEl || !totalEl) return

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery  = 100
  const total     = subtotal + delivery

  subtotalEl.textContent = `Rs. ${subtotal}`
  totalEl.textContent    = `Rs. ${total}`
}

// ── Modal helpers (shared by both pages) ─────────────────────

function toggleCart() {
  const cartModal = document.getElementById("cartModal")
  if (cartModal) cartModal.classList.toggle("active")
}

function openCheckout() {
  const cartModal     = document.getElementById("cartModal")
  const checkoutModal = document.getElementById("checkoutModal")
  if (cartModal)     cartModal.classList.remove("active")
  if (checkoutModal) checkoutModal.classList.add("active")
  updateCheckoutSummary()
}

function closeCheckout() {
  const checkoutModal = document.getElementById("checkoutModal")
  if (checkoutModal) checkoutModal.classList.remove("active")
}

function updateCheckoutSummary() {
  const checkoutItemsEl = document.getElementById("checkoutItems")
  const checkoutTotalEl = document.getElementById("checkoutTotal")

  if (!checkoutItemsEl || !checkoutTotalEl) return

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery  = 100
  const total     = subtotal + delivery

  checkoutItemsEl.innerHTML =
    cart
      .map(
        (item) => `
        <div class="checkout-item">
          <span>${item.quantity}x ${item.name}${item.size !== "default" ? ` (${item.size})` : ""}</span>
          <span>Rs. ${item.price * item.quantity}</span>
        </div>
      `
      )
      .join("") +
    `<div class="checkout-item">
       <span>Delivery</span>
       <span>Rs. 100</span>
     </div>`

  checkoutTotalEl.textContent = `Rs. ${total}`
}

// ── Place Order (shared by both pages) ───────────────────────

function placeOrder() {
  const customerName    = document.getElementById("customerName").value.trim()
  const customerPhone   = document.getElementById("customerPhone").value.trim()
  const deliveryAddress = document.getElementById("deliveryAddress").value.trim()

  if (!customerName || !customerPhone || !deliveryAddress) {
    alert("Please fill in all required fields")
    return
  }

  let orderMessage = "*New Order from Food Mac Website*\n\n"
  orderMessage += "*Order Details:*\n"

  cart.forEach((item) => {
    orderMessage += `${item.quantity}x ${item.name}`
    if (item.size !== "default") orderMessage += ` (${item.size})`
    orderMessage += ` - Rs. ${item.price * item.quantity}\n`
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery  = 100
  const total     = subtotal + delivery

  orderMessage += `\n*Subtotal:* Rs. ${subtotal}\n`
  orderMessage += `*Delivery:* Rs. ${delivery}\n`
  orderMessage += `*Total:* Rs. ${total}\n\n`
  orderMessage += `*Customer Details:*\n`
  orderMessage += `*Name:* ${customerName}\n`
  orderMessage += `*Phone:* ${customerPhone}\n`
  orderMessage += `*Address:* ${deliveryAddress}\n\n`
  orderMessage += `Order Confirmed. Thank you!`

  const encodedMessage = encodeURIComponent(orderMessage)
  const whatsappURL    = `https://wa.me/923705380205?text=${encodedMessage}`

  window.open(whatsappURL, "_blank")

  // Clear cart from memory AND localStorage, then close modal
  clearCart()
  closeCheckout()

  alert("Order sent to WhatsApp! Please wait for confirmation.")
}

// ── Global modal-close listeners (safe to attach on every page) ──

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active")
  }
})

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal-content").forEach((modal) => {
    modal.addEventListener("click", (event) => event.stopPropagation())
  })
})