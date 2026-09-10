import { renderNavbar } from "./ui/navbar.js";
import { getListings } from "./api/listings.js";
import { renderListings } from "./listings/displayListings.js";

const navbar = document.querySelector("#navbar");

if (navbar) {
navbar.innerHTML = renderNavbar();
}

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const tagFilter = document.querySelector("#tag-filter");
const sortFilter = document.querySelector("#sort-filter");
const clearFilters = document.querySelector("#clear-filters");

let currentPage = 1;

async function loadListings() {
const container = document.querySelector("#browse-listings-container");

if (!container) {
    return;
}

container.innerHTML = `
    <p>Loading auctions...</p>
`;

const search = searchInput?.value.trim() || "";
const tag = tagFilter?.value || "";
const sort = sortFilter?.value || "created";
const sortOrder = sort === "endsAt" ? "asc" : "desc";

try {
    const result = await getListings({
    search,
    tag,
    active: true,
    limit: 12,
    page: currentPage,
    sort,
    sortOrder,
    });

    renderListings(
    result.data,
    "browse-listings-container"
    );

    renderPagination(result.meta);
} catch (error) {
    console.error("BROWSE LISTINGS ERROR:", error);

    container.innerHTML = `
    <p>
        Sorry, we couldn't load the auctions.
        Please try again later.
    </p>
    `;
}
}

function renderPagination(meta) {
const existingPagination =
    document.querySelector("#pagination");

if (existingPagination) {
    existingPagination.remove();
}

if (!meta || meta.pageCount <= 1) {
    return;
}

const pagination = document.createElement("div");

pagination.id = "pagination";
pagination.className = "pagination-controls";

pagination.innerHTML = `
    <button
    id="previous-page"
    class="btn btn-secondary"
    ${meta.isFirstPage ? "disabled" : ""}
    >
    ← Previous
    </button>

    <span>
    Page ${meta.currentPage} of ${meta.pageCount}
    </span>

    <button
    id="next-page"
    class="btn btn-primary"
    ${meta.isLastPage ? "disabled" : ""}
    >
    Next →
    </button>
`;

document
    .querySelector("#browse-listings-container")
    .after(pagination);

document
    .querySelector("#previous-page")
    ?.addEventListener("click", () => {
    if (!meta.isFirstPage) {
        currentPage--;
        loadListings();
    }
    });

document
    .querySelector("#next-page")
    ?.addEventListener("click", () => {
    if (!meta.isLastPage) {
        currentPage++;
        loadListings();
    }
    });
}

searchForm?.addEventListener("submit", (event) => {
event.preventDefault();

currentPage = 1;
loadListings();
});

tagFilter?.addEventListener("change", () => {
currentPage = 1;
loadListings();
});

sortFilter?.addEventListener("change", () => {
currentPage = 1;
loadListings();
});

clearFilters?.addEventListener("click", () => {
searchInput.value = "";
tagFilter.value = "";
sortFilter.value = "created";

currentPage = 1;
loadListings();
});

loadListings();