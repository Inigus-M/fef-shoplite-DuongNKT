const detailContainer = document.getElementById("product-detail");

const loading = document.getElementById("loading");

const errorBox = document.getElementById("error-box");

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function loadProduct() {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product = await response.json();

    renderProduct(product);
  } catch (error) {
    errorBox.innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;
  } finally {
    loading.classList.add("d-none");
  }
}

function renderProduct(product) {
  detailContainer.innerHTML = `
    
    <div class="row g-5 align-items-center">

        <div class="col-lg-5">

            <div class="border rounded p-4 bg-white">

                <img
                    src="${product.thumbnail}"
                    class="img-fluid w-100"
                    style="
                        height:450px;
                        object-fit:contain;
                    "
                >

            </div>

        </div>

        <div class="col-lg-7">

            <span class="badge bg-primary mb-3">
                ${product.category}
            </span>

            <h2 class="fw-bold mb-3">
                ${product.title}
            </h2>

            <div class="mb-3">

                <span class="text-warning">
                    ★
                </span>

                ${product.rating}

            </div>

            <h3 class="text-success mb-4">
                $${product.price}
            </h3>

            <p class="lead">
                ${product.description}
            </p>

            <div class="mt-4 d-flex gap-3">

                <button
                    id="add-cart-btn"
                    class="btn btn-primary btn-lg"
                >
                    <i class="bi bi-cart-plus"></i>
                    Add To Cart
                </button>

                <a
                    href="index.html"
                    class="btn btn-outline-secondary btn-lg"
                >
                    Back
                </a>

            </div>

        </div>

    </div>
    
    `;

  document
    .getElementById("add-cart-btn")
    .addEventListener("click", () => addToCart(product));
}

loadProduct();
