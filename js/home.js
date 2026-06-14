const productList = document.getElementById("product-list");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-select");

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 16;

function renderLoading() {
  productList.innerHTML = `
    <div class="col-12">
      <div class="d-flex justify-content-center align-items-center py-5">
        <div class="spinner-border text-primary me-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span class="fs-5">Loading products...</span>
      </div>
    </div>
  `;

  pagination.innerHTML = "";
}

function renderError(message) {
  productList.innerHTML = `
    <div class="col-12">
      <div class="alert alert-danger text-center mb-0">
        ${message}
      </div>
    </div>
  `;

  pagination.innerHTML = "";
}

function renderProducts(products) {
  if (products.length === 0) {
    productList.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center mb-0">
          No products found.
        </div>
      </div>
    `;

    return;
  }

  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product-grid-item">

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

  return filteredProducts.slice(startIndex, endIndex);
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  pagination.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

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

function renderCategoryOptions() {
  const categories = [...new Set(allProducts.map((product) => product.category))];

  categoryFilter.innerHTML = `
    <option value="all">All Categories</option>
    ${categories
      .map((category) => {
        return `<option value="${category}">${category}</option>`;
      })
      .join("")}
  `;
}

function getSortedProducts(products) {
  const sortedProducts = [...products];

  if (sortSelect.value === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "title") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sortedProducts;
}

function applyFilters() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  filteredProducts = getSortedProducts(filteredProducts);
  currentPage = 1;
  renderCurrentPage();
}

async function loadProducts() {
  renderLoading();

  try {
    const data = await getProducts();

    allProducts = data.products;
    filteredProducts = allProducts;
    renderCategoryOptions();
    renderCurrentPage();
  } catch (error) {
    renderError("Unable to load products. Please try again later.");
  }
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

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
