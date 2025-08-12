const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("success-message");
const counters = document.querySelector(".counter");

// Character Counter
messageInput.addEventListener("input", () => {
    counters.textContent = `${messageInput.value.length}/200`;
    if (messageInput.value.length > 200) {
        messageInput.value = messageInput.value.substring(0, 200);
    }
});

// Real-time validation
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => validateField(input));
});

function validateField(input) {
    const errorElement = input.nextElementSibling.tagName === "SMALL" 
        ? input.nextElementSibling 
        : input.parentElement.querySelector(".error-message");

    errorElement.textContent = ""; // Clear old errors

    if (input.id === "name") {
        if (input.value.trim() === "") {
            errorElement.textContent = "Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(input.value.trim())) {
            errorElement.textContent = "Name should contain only letters.";
        }
    }

    if (input.id === "email") {
        if (input.value.trim() === "") {
            errorElement.textContent = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            errorElement.textContent = "Invalid email format.";
        }
    }

    if (input.id === "message") {
        if (input.value.trim() === "") {
            errorElement.textContent = "Message is required.";
        } else if (input.value.trim().length < 10) {
            errorElement.textContent = "Message should be at least 10 characters.";
        }
    }
}

// Form submit validation
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop form from refreshing

    let isValid = true;
    [nameInput, emailInput, messageInput].forEach(input => {
        validateField(input);
        const errorElement = input.nextElementSibling.tagName === "SMALL" 
            ? input.nextElementSibling 
            : input.parentElement.querySelector(".error-message");
        if (errorElement.textContent !== "") {
            isValid = false;
        }
    });

    if (isValid) {
        successMessage.textContent = "✅ Your message has been sent successfully!";
        successMessage.style.opacity = "0";
        setTimeout(() => {
            successMessage.style.transition = "opacity 0.5s ease";
            successMessage.style.opacity = "1";
        }, 50);

        form.reset();
        counters.textContent = "0/200";
        setTimeout(() => {
            successMessage.textContent = "";
        }, 3000);
    }
});
