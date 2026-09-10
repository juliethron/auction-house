import { renderNavbar } from "../ui/navbar.js";
import { registerUser } from "../api/auth.js";
import { renderFooter } from "../ui/footer.js";

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}


const navbar = document.querySelector("#navbar");

if (navbar) {
    navbar.innerHTML = renderNavbar();
}

const form = document.querySelector("#register-form");
const message = document.querySelector("#register-message");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value;

        message.textContent = "Creating your account...";

        try {
            await registerUser(name, email, password);

            message.textContent =
                "Account created! You can now log in.";

            form.reset();

        } catch (error) {
            console.error("REGISTRATION ERROR:", error);

            message.textContent = error.message;
        }
    });
}
