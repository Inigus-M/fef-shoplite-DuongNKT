const BASE_URL = "https://dummyjson.com/products";

async function getProducts() {
  const response = await fetch(`${BASE_URL}?limit=7`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

async function getProductById(id) {}

async function getCategories() {}

async function getProductsByCategory(category) {}
