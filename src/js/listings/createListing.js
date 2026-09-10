import { renderNavbar } from "../ui/navbar.js";
import { createListing } from "../api/listings.js";
import { renderFooter } from "../ui/footer.js";

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}


const navbar = document.querySelector("#navbar");
const form = document.querySelector("#create-listing-form");
const message = document.querySelector("#create-listing-message");

if (navbar) {
    navbar.innerHTML = renderNavbar();
}

const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
    window.location.href = "login.html";
}

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value.trim();

        const description =
            document.querySelector("#description").value.trim();

        const tagsInput =
            document.querySelector("#tags").value.trim();

        const imageUrl =
            document.querySelector("#image-url").value.trim();

        const imageAlt =
            document.querySelector("#image-alt").value.trim();

        const endsAt =
            document.querySelector("#ends-at").value;

        const submitButton =
            form.querySelector('button[type="submit"]');

        if (!title) {
            message.textContent = "Please enter a title.";
            return;
        }

        if (!endsAt) {
            message.textContent =
                "Please choose when the auction should end.";
            return;
        }

        const endDate = new Date(endsAt);

        if (endDate <= new Date()) {
            message.textContent =
                "The auction end date must be in the future.";
            return;
        }

        message.textContent = "Creating listing...";

        submitButton.disabled = true;
        submitButton.textContent = "Creating...";

        const listingData = {
            title,
            description,
            endsAt: endDate.toISOString(),
        };

        if (tagsInput) {
            listingData.tags = tagsInput
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
        }

        if (imageUrl) {
            listingData.media = [
                {
                    url: imageUrl,
                    alt: imageAlt || title,
                },
            ];
        }

        try {
            const result = await createListing(listingData);

            const listing = result.data;

            message.textContent =
                "Listing created successfully! Redirecting...";

            setTimeout(() => {
                window.location.href =
                    `listing.html?id=${listing.id}`;
            }, 800);

        } catch (error) {
            console.error("CREATE LISTING ERROR:", error);

            message.textContent =
                error.message || "Something went wrong.";

            submitButton.disabled = false;
            submitButton.textContent = "Create listing";
        }
    });
}