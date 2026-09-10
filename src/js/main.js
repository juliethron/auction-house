import { renderNavbar } from "./ui/navbar.js";
import { getListings } from "./api/listings.js";
import { renderListings } from "./listings/displayListings.js";
import { renderFooter } from "./ui/footer.js";


const navbar = document.querySelector("#navbar");

if (navbar) {
    navbar.innerHTML = renderNavbar();
}

async function loadListings(options = {}) {
    const container = document.querySelector("#listings-container");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <p>Loading auctions...</p>
    `;

    try {
        const result = await getListings(options);

        const listings = result.data;

        renderListings(listings);

    } catch (error) {
        console.error("LISTINGS ERROR:", error);

        container.innerHTML = `
            <p>
                Sorry, we couldn't load the auctions.
                Please try again later.
            </p>
        `;
    }
}

loadListings();


const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");


if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const search = searchInput.value.trim();

        loadListings({ search });
    });
}


if (clearSearch && searchInput) {
    clearSearch.addEventListener("click", () => {
        searchInput.value = "";

        loadListings();
    });
}

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}