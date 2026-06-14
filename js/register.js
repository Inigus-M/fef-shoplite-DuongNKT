const form = document.getElementById("register-form");
const successMessage = document.getElementById("success-message");
const submitButton = document.getElementById("submit-btn");

const fields = {
  fullName: {
    input: document.getElementById("full-name"),
    error: document.getElementById("name-error"),
    validate(value) {
      if (value.trim() === "") {
        return "Full name is required";
      }

      return "";
    },
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value.trim())) {
        return "Invalid email address";
      }

      return "";
    },
  },
  password: {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
    validate(value) {
      if (value.trim().length < 6) {
        return "Password must be at least 6 characters";
      }

      return "";
    },
  },
  phone: {
    input: document.getElementById("phone"),
    error: document.getElementById("phone-error"),
    validate(value) {
      const phoneRegex = /^[0-9]{10,11}$/;

      if (!phoneRegex.test(value.trim())) {
        return "Phone number must contain 10-11 digits";
      }

      return "";
    },
  },
  country: {
    input: document.getElementById("country"),
    error: document.getElementById("country-error"),
    validate(value) {
      if (value === "") {
        return "Please select a country";
      }

      return "";
    },
  },
  agree: {
    input: document.getElementById("agree"),
    error: document.getElementById("agree-error"),
    validate() {
      if (!this.input.checked) {
        return "You must agree to the terms";
      }

      return "";
    },
  },
};

function getFieldValue(field) {
  if (field.input.type === "checkbox") {
    return field.input.checked;
  }

  return field.input.value;
}

function setFieldState(field, message) {
  field.error.textContent = message;
  field.input.classList.toggle("is-invalid", message !== "");
  field.input.classList.toggle("is-valid", message === "");
}

function validateField(field) {
  const message = field.validate(getFieldValue(field));

  setFieldState(field, message);

  return message === "";
}

function validateForm() {
  const results = Object.values(fields).map((field) => validateField(field));

  return results.every((isValid) => isValid);
}

function isFormValid() {
  return Object.values(fields).every((field) => {
    return field.validate(getFieldValue(field)) === "";
  });
}

function updateSubmitButton() {
  submitButton.disabled = !isFormValid();
}

function hideSuccessMessage() {
  successMessage.classList.add("d-none");
}

Object.values(fields).forEach((field) => {
  const eventName = field.input.type === "checkbox" ? "change" : "input";

  field.input.addEventListener(eventName, () => {
    hideSuccessMessage();
    validateField(field);
    updateSubmitButton();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideSuccessMessage();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  successMessage.classList.remove("d-none");
  form.reset();

  Object.values(fields).forEach((field) => {
    field.input.classList.remove("is-valid", "is-invalid");
    field.error.textContent = "";
  });

  updateSubmitButton();
});

updateSubmitButton();
