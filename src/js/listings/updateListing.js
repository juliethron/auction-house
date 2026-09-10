import { renderNavbar } from "../ui/navbar.js";
import {
    getListing,
    updateListing,
} from "../api/listings.js";
import { renderFooter } from "../ui/footer.js";

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}

const navbar = document.querySelector("#navbar");
const form = document.querySelector("#edit-listing-form");
const message = document.querySelector("#edit-listing-message");


if (navbar) {
    navbar.innerHTML = renderNavbar();
}


const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
    window.location.href = "login.html";
}


const params = new URLSearchParams(window.location.search);

const listingId = params.get("id");


if (!listingId) {

    message.textContent =
        "No listing was selected.";

} else {

    loadListing();

}


async function loadListing() {

    message.textContent =
        "Loading listing...";


    try {

        const result =
            await getListing(listingId);


        const listing = result.data;


        const currentUser =
            localStorage.getItem("userName");


        if (listing.seller?.name !== currentUser) {

            message.textContent =
                "You can only edit your own listings.";

            form.style.display = "none";

            return;

        }


        document.querySelector("#title").value =
            listing.title || "";


        document.querySelector("#description").value =
            listing.description || "";


        document.querySelector("#tags").value =
            listing.tags?.join(", ") || "";


        document.querySelector("#image-url").value =
            listing.media?.[0]?.url || "";


        document.querySelector("#image-alt").value =
            listing.media?.[0]?.alt || "";


        message.textContent = "";


    } catch (error) {

        console.error(
            "LOAD LISTING ERROR:",
            error
        );


        message.textContent =
            "Could not load this listing.";

        form.style.display = "none";

    }

}


if (form) {

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const title =
                document
                    .querySelector("#title")
                    .value
                    .trim();


            const description =
                document
                    .querySelector("#description")
                    .value
                    .trim();


            const tagsInput =
                document
                    .querySelector("#tags")
                    .value
                    .trim();


            const imageUrl =
                document
                    .querySelector("#image-url")
                    .value
                    .trim();


            const imageAlt =
                document
                    .querySelector("#image-alt")
                    .value
                    .trim();


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            const listingData = {
                title,
                description,
            };


            if (tagsInput) {

                listingData.tags =
                    tagsInput
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(
                            (tag) => tag.length > 0
                        );

            }


            if (imageUrl) {

                listingData.media = [
                    {
                        url: imageUrl,
                        alt: imageAlt || title,
                    },
                ];

            }


            message.textContent =
                "Saving changes...";


            submitButton.disabled = true;

            submitButton.textContent =
                "Saving...";


            try {

                const result =
                    await updateListing(
                        listingId,
                        listingData
                    );


                const updatedListing =
                    result.data;


                message.textContent =
                    "Listing updated successfully!";


                setTimeout(() => {

                    window.location.href =
                        `listing.html?id=${updatedListing.id}`;

                }, 800);


            } catch (error) {

                console.error(
                    "UPDATE LISTING ERROR:",
                    error
                );


                message.textContent =
                    error.message ||
                    "Something went wrong.";


                submitButton.disabled = false;

                submitButton.textContent =
                    "Save changes";

            }

        }
    );

}
