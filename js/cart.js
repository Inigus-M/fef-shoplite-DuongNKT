const cartContent = document.getElementById("cart-content");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) {
    return;
  }

  const totalItems = getCart().reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

function renderCart() {
  let cart = getCart();

  updateCartCount();

  if (cart.length === 0) {
    cartContent.innerHTML = `
        
        <div class="text-center py-5">

            <h3>
                Cart is Empty
            </h3>

            <a
                href="index.html"
                class="btn btn-primary mt-3"
            >
                Continue Shopping
            </a>

        </div>
        
        `;

    return;
  }

  let total = 0;

  cartContent.innerHTML = `
    
    <div class="table-responsive">

    <table class="table align-middle">

        <thead>

            <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
            </tr>

        </thead>

        <tbody>

        ${cart
          .map((item) => {
            const subtotal = item.price * item.quantity;

            total += subtotal;

            return `
            
            <tr>

                <td>

                    <img
                        src="${item.thumbnail}"
                        width="80"
                    >

                </td>

                <td>
                    ${item.title}
                </td>

                <td>
                    $${item.price}
                </td>

                <td>

                    <div
                    class="d-flex gap-2"
                    >

                    <button
                    class="btn btn-sm btn-outline-secondary decrease"
                    data-id="${item.id}"
                    >
                    -
                    </button>

                    <span>
                    ${item.quantity}
                    </span>

                    <button
                    class="btn btn-sm btn-outline-secondary increase"
                    data-id="${item.id}"
                    >
                    +
                    </button>

                    </div>

                </td>

                <td>
                    $${subtotal.toFixed(2)}
                </td>

                <td>

                    <button
                    class="btn btn-danger btn-sm remove"
                    data-id="${item.id}"
                    >

                    Remove

                    </button>

                </td>

            </tr>
            
            `;
          })
          .join("")}

        </tbody>

    </table>

    </div>

    <div class="text-end">

        <h3>
            Total:
            $${total.toFixed(2)}
        </h3>

        <button
            id="clear-cart"
            class="btn btn-danger mt-2"
        >
            Clear Cart
        </button>

    </div>
    
    `;

}

function updateQuantity(id, amount) {
  let cart = getCart();

  const item = cart.find((p) => p.id === id);

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  saveCart(cart);

  renderCart();

  updateCartCount();
}

function removeItem(id) {
  const cart = getCart().filter((p) => p.id !== id);

  saveCart(cart);

  renderCart();

  updateCartCount();
}

function clearCart() {
  localStorage.removeItem("cart");

  renderCart();

  updateCartCount();
}

cartContent.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.classList.contains("increase")) {
    updateQuantity(id, 1);
  } else if (button.classList.contains("decrease")) {
    updateQuantity(id, -1);
  } else if (button.classList.contains("remove")) {
    removeItem(id);
  } else if (button.id === "clear-cart") {
    clearCart();
  }
});

renderCart();
