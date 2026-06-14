const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  let isValid = true;

  const fullName = document.getElementById("full-name").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const country = document.getElementById("country").value;

  const agree = document.getElementById("agree").checked;

  // Full Name
  if (fullName === "") {
    showError("name-error", "Full name is required");

    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showError("email-error", "Invalid email address");

    isValid = false;
  }

  // Password
  if (password.length < 6) {
    showError("password-error", "Password must be at least 6 characters");

    isValid = false;
  }

  // Phone
  const phoneRegex = /^[0-9]{10,11}$/;

  if (!phoneRegex.test(phone)) {
    showError("phone-error", "Phone number must contain 10-11 digits");

    isValid = false;
  }

  // Select
  if (country === "") {
    showError("country-error", "Please select a country");

    isValid = false;
  }

  // Checkbox
  if (!agree) {
    showError("agree-error", "You must agree to the terms");

    isValid = false;
  }

  if (isValid) {
    document.getElementById("success-message").classList.remove("d-none");

    form.reset();
  }
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.getElementById("name-error").textContent = "";

  document.getElementById("email-error").textContent = "";

  document.getElementById("password-error").textContent = "";

  document.getElementById("phone-error").textContent = "";

  document.getElementById("country-error").textContent = "";

  document.getElementById("agree-error").textContent = "";

  document.getElementById("success-message").classList.add("d-none");
}
