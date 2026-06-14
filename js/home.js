const productList = document.getElementById("product-list");
const pagination = document.getElementById("pagination");
const productCategory = document.getElementById("category-list");

let allProducts = [];
let currentPage = 1;
const productsPerPage = 16;

function renderProducts(products) {
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="col-md-6 col-lg-3">

            <div class="card h-100 shadow-sm border-0">

                <img
                    src="${product.thumbnail}"
                    class="card-img-top p-3 product-image"
                >

                <div
                    class="card-body d-flex flex-column"
                >

                    <span
                        class="badge bg-primary mb-2"
                    >
                        ${product.category}
                    </span>

                    <h5
                        class="card-title"
                    >
                        ${product.title}
                    </h5>

                    <h4
                        class="text-success"
                    >
                        $${product.price}
                    </h4>

                    <div
                        class="d-grid gap-2 mt-auto"
                    >

                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-outline-primary"
                        >
                            View Details
                        </a>

                        <button
                            class="btn btn-primary add-cart-btn"
                            data-id="${product.id}"
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `,
    )
    .join("");
  attachAddToCartEvents();
}

function attachAddToCartEvents() {
  document.querySelectorAll(".add-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      const product = allProducts.find((p) => p.id === productId);

      addToCart(product);
    });
  });
}

function getCurrentPageProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return allProducts.slice(startIndex, endIndex);
}

function renderPagination() {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  pagination.innerHTML = "";

  for (let page = 1; page <= totalPages; page++) {
    pagination.innerHTML += `
      <li class="page-item ${page === currentPage ? "active" : ""}">
        <button class="page-link" data-page="${page}">
          ${page}
        </button>
      </li>
    `;
  }
}

function renderCurrentPage() {
  renderProducts(getCurrentPageProducts());
  renderPagination();
}

async function loadProducts() {
  const data = await getProducts();

  allProducts = data.products;
  renderCurrentPage();
}

pagination.addEventListener("click", (event) => {
  const pageButton = event.target.closest(".page-link");

  if (!pageButton) {
    return;
  }

  currentPage = Number(pageButton.dataset.page);
  renderCurrentPage();
});

loadProducts();
updateCartCount();
