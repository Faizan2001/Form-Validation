document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const inputs = form.querySelectorAll("input");
  const errors = {
    email: "Please enter a valid email address.",
    country: "Country cannot have numerical values.",
    zip: "Zip Code must be exactly 5 digits.",
    password: "Password must be at least 8 characters.",
    confirmPassword: "Passwords must match.",
  };

  function validateInput(input) {
    const errorSpan = document.getElementById(`${input.id}Error`);
    let isValid = true;

    errorSpan.textContent = ""; // Clear any previous error

    if (input.validity.valueMissing) {
      errorSpan.textContent = `${input.name} is required.`;
      isValid = false;
    } else if (input.type === "email" && input.validity.typeMismatch) {
      errorSpan.textContent = errors.email;
      isValid = false;
    } else if (input.id === "zip") {
      const zipRegex = /^\d{5}$/;
      if (!zipRegex.test(input.value)) {
        errorSpan.textContent = errors.zip;
        isValid = false;
      }
    } else if (input.id === "country" && input.validity.patternMismatch) {
      errorSpan.textContent = errors.country;
      isValid = false;
    } else if (input.id === "password" && input.validity.tooShort) {
      errorSpan.textContent = errors.password;
      isValid = false;
    } else if (input.id === "confirmPassword") {
      const password = document.getElementById("password").value;
      if (input.value !== password) {
        errorSpan.textContent = errors.confirmPassword;
        isValid = false;
      }
    }

    // Show or hide the error message
    if (!isValid) {
      errorSpan.style.display = "block";
    } else {
      errorSpan.style.display = "none";
    }

    return isValid;
  }

  // Validate fields on blur and input events
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateInput(input)); // Validate while typing
    input.addEventListener("blur", () => validateInput(input)); // Validate when leaving the field
  });

  // Validate all fields on form submission
  form.addEventListener("submit", (event) => {
    let isFormValid = true;

    inputs.forEach((input) => {
      const isValid = validateInput(input);
      if (!isValid) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      event.preventDefault();
      console.log("Form contains errors. Fix them before submitting.");
    } else {
      event.preventDefault(); // Prevent submission for demo purposes
      console.log("High five! 🎉 Form submitted successfully.");
    }
  });
});
