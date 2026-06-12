# FEF · Long Assignment — "ShopLite" Mini E-Commerce

> **Code:** FEF-LA-01 · **Duration:** 1 week (individual) · **Scoring:** 0–10
> **Integration scope:** HTML semantic · CSS Layout (Flexbox/Grid) · Responsive · Bootstrap · JavaScript · DOM & Event · Fetch API.

---

## 1. Context & Objective

Learners build **ShopLite** — a multi-page shopping website that runs entirely on the client side (no backend required). Product data is fetched from a public API. This assignment simulates a real-world web application with multiple pages, common layouts, API calls, and relatively complex DOM handling.

After this assignment, learners demonstrate the ability to build a complete web product, not just isolated pieces of knowledge.

**Dual objective:** (1) apply all the skills learned into one cohesive product; (2) get familiar with the real-world process — reading API documentation, building layouts, debugging, and deploying.

---

## 2. Allowed Technologies

| Scope       | Tools                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| Required    | HTML5, CSS3, **vanilla JavaScript**, **Fetch API**                                                                 |
| Allowed     | **Bootstrap 5 _or_ Tailwind CSS** (choose one CSS framework), Google Fonts, icons (Bootstrap Icons / Font Awesome) |
| Allowed     | `localStorage` to store the cart                                                                                   |
| Not allowed | React/Vue/Angular, jQuery, state libraries; AI-generated full pages without understanding                          |

> Reason for not using a JavaScript framework: this module tests foundational knowledge. Use vanilla JavaScript to demonstrate command of the DOM/Event.

---

## 3. Data Source (API)

Use the **Fake Store API** (free, no API key required): https://fakestoreapi.com/

| Purpose               | Endpoint                        |
| --------------------- | ------------------------------- |
| Get all products      | `GET /products`                 |
| Get one product by id | `GET /products/{id}`            |
| Get the category list | `GET /products/categories`      |
| Filter by category    | `GET /products/category/{name}` |

> You may replace it with `https://dummyjson.com/products`, as long as real data is still fetched from the network.

---

## 4. Product Requirements — pages

At least **4 pages** linked together via a shared navbar:

### Page 1 — Home / Product list (`index.html`)

- A navbar (logo, page menu, cart icon with item count).
- A hero/banner section for introduction.
- A product grid (Grid/Flexbox or Bootstrap row/col): each product is a card with image, name, price, and "View details" and "Add to cart" buttons.
- Data is fetched from the API and rendered with the DOM (do not hard-code products in the HTML).
- A loading state while fetching and an error message when the fetch fails.
- A footer.

### Page 2 — Product detail (`product.html`)

- Receives the product `id` via the query string (e.g. `product.html?id=5`).
- Fetches that exact product (`/products/{id}`) and displays a large image, full description, price, and rating.
- A working "Add to cart" button.

### Page 3 — Cart (`cart.html`)

- Displays the added products (stored with `localStorage`).
- Allows increasing/decreasing quantity, removing each product, and shows a total that updates immediately.
- An "Empty cart" state when there are no products.

### Page 4 — Register / Contact (`register.html`)

- A form with: full name, email, password, phone number, a `select`, and an "agree to terms" `checkbox`.
- Validation with JavaScript (not relying solely on HTML attributes): clear error messages under each field, blocking submit on errors, and a success message when valid.

---

## 5. Technical Requirements (apply to everything)

- **Semantic HTML:** use `header/nav/main/section/footer`, limit overuse of `div`.
- **Responsive:** displays well on mobile (≤576px), tablet, and desktop. The navbar collapses on mobile.
- **CSS Layout:** demonstrate Flexbox and Grid (hand-written, not relying entirely on a ready-made framework).
- **DOM & Event:** dynamic rendering, handling click/submit/input; use `addEventListener`.
- **Fetch API:** use `async/await`, check `res.ok`, include `try/catch`.
- **Clean source code:** clear variable/function names, JavaScript in separate files, no leftover `console.log`, no errors in the Console.
- **Git:** commit multiple times with clear messages (not just one "final" commit).

---

## 6. Scoring & Rubric (0–10)

The work is divided into three tiers. Lower tiers must be completed well before higher tiers are counted.

### Pass tier — 0 to 6 points (foundation)

Completing the basic requirements correctly meets the course requirement.

| Criterion                                                                     | Points  |
| ----------------------------------------------------------------------------- | ------- |
| All 4 pages, linked together via a shared navbar                              | 1.0     |
| Semantic HTML, reasonable and valid structure                                 | 1.0     |
| The Home page fetches and renders the product list with the DOM               | 1.5     |
| The detail page displays the correct product by id                            | 1.0     |
| The registration form has basic JavaScript validation (required, valid email) | 1.0     |
| Basic responsiveness: no layout breakage on mobile                            | 0.5     |
| **Pass tier total**                                                           | **6.0** |

### Good tier — 7 to 8 points (added intermediate techniques)

Complete the Pass tier plus features with technical depth.

| Criterion                                                                            | Points  |
| ------------------------------------------------------------------------------------ | ------- |
| Full cart: add/remove/change quantity, total, stored in `localStorage` across pages  | 1.0     |
| Search or filter by category (combining `filter`/API), updating the grid immediately | 0.5     |
| Proper loading and error states (no blank screen)                                    | 0.3     |
| Hand-written, clear Flexbox/Grid, smooth responsiveness across all three breakpoints | 0.2     |
| **Total up to the Good tier**                                                        | **8.0** |

### Excellent tier — 9 to 10 points (distinguishing, advanced techniques)

For work that demonstrates solid front-end thinking. Choose and complete the following items well:

| Criterion                                                                                                                     | Points   |
| ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| Event delegation for the grid/cart (one listener on a parent handles many dynamic items)                                      | 0.5      |
| Product sort (price up/down, name) and combining search + filter + sort simultaneously                                        | 0.5      |
| A cart count badge on the navbar synced across pages                                                                          | 0.3      |
| Pagination or "load more" for the product list                                                                                | 0.3      |
| Good experience: skeleton/spinner while loading, toast notifications, debounce on the search box                              | 0.2      |
| High-quality source code: extracted reusable modules/functions, no duplication, standard naming, README with run instructions | 0.2      |
| **Maximum total**                                                                                                             | **10.0** |

> **Deductions:** errors in the Console (−0.5), hard-coded data instead of fetch (−1.0), copying an interface without understanding (handled per Section 8), no Git history (−0.5).

---

## 7. Suggested 1-Week Plan

| Day | Content                                                                                       |
| --- | --------------------------------------------------------------------------------------------- |
| 1   | Initialize the repo, build the HTML skeleton for 4 pages, shared navbar/footer, static layout |
| 2   | CSS/Bootstrap: make it responsive, the product grid, card styling                             |
| 3   | Fetch the product list, render the DOM, loading/error                                         |
| 4   | Detail page (query string), add-to-cart button                                                |
| 5   | Cart, localStorage, total                                                                     |
| 6   | Form validation, search/filter/sort (Good–Excellent tiers)                                    |
| 7   | Finalize, fix bugs, check responsiveness, write the README, clean the code, deploy            |

---

## 8. Academic Integrity

- You may use AI/Google to learn and debug, but you must understand and be able to explain every line of your code.
- There is a short oral defense (viva): the instructor points to any code segment and asks you to explain its function and the rationale for the implementation. Failure to explain results in point deductions or a zero for that part.
- Copying another learner's work results in a zero for both parties.

---

## 9. Submission

1. Push the source code to a public GitHub repo (name: `fef-shoplite-DuongNKT`).
2. Deploy with GitHub Pages / Netlify / Vercel and put the demo link in the README.
3. The README includes: a short description, screenshots, local run instructions, and a list of completed features (marked Pass/Good/Excellent).
4. Submit the repo link and demo link per the class instructions before the deadline.

**Suggested folder structure:**

```
fef-shoplite/
├── index.html          # Home
├── product.html        # Detail
├── cart.html           # Cart
├── register.html       # Register
├── css/
│   └── style.css
├── js/
│   ├── api.js          # shared fetch function
│   ├── cart.js         # cart logic + localStorage
│   ├── home.js
│   ├── product.js
│   └── register.js
├── assets/             # images, icons
└── README.md
```

---

## 10. Support Resources

- Module handbook: [../Lectures/00_Study_Guide_Handbook.md](../Lectures/00_Study_Guide_Handbook.md) (especially the Key point sections)
- Fetch & DOM: [../Lectures/04_DOM_and_Event.md](../Lectures/04_DOM_and_Event.md)
- API docs: https://fakestoreapi.com/docs
- Deploy: https://pages.github.com/ · https://www.netlify.com/

> **Recommendation.** Complete the Pass tier solidly and ensure the product runs first, then add advanced features. A 4-page app that runs stably, is responsive, and has clean code is rated higher than one with many features but many bugs.
