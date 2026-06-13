const productDetail = document.getElementById("product-detail");

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

function renderProduct(product) {
  productDetail.innerHTML = `
    <div class="row g-5">
      <div class="col-lg-5">
        <img
          src="${product.thumbnail}"
          class="img-fluid rounded shadow"
        >
      </div>

      <div class="col-lg-7">
        <span class="badge bg-primary mb-3">
          ${product.category}
        </span>

        <h2>
          ${product.title}
        </h2>

        <p class="text-warning">
          ★ ${product.rating}
        </p>

        <h3 class="text-success">
          $${product.price}
        </h3>

        <p>
          ${product.description}
        </p>

        <button
          id="add-cart-btn"
          class="btn btn-primary btn-lg"
        >
          Add To Cart
        </button>
      </div>
    </div>
  `;

  document.getElementById("add-cart-btn").addEventListener("click", () => {
    addToCart(product);
  });
}

async function loadProduct() {
  const product = await getProductById(productId);

  renderProduct(product);
}

loadProduct();

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}
