export function renderListings(
listings,
containerId = "listings-container"
) {
const container = document.querySelector(`#${containerId}`);

if (!container) {
    return;
}

if (listings.length === 0) {
    container.innerHTML = `
    <p>No auctions found.</p>
    `;

    return;
}

container.innerHTML = `
    <div class="row g-4">
    ${listings
        .map((listing) => {
        const image = listing.media?.[0];

        return `
            <div class="col-12 col-md-6 col-lg-4">
            <article class="listing-card h-100">

                <div class="listing-image">
${
    image
    ? `
        <img
        src="${image.url}"
        alt="${image.alt || listing.title}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="no-image" style="display: none;">
        No image available
        </div>
    `
    : `
        <div class="no-image">
        No image available
        </div>
    `
}
</div>

                <div class="listing-card-content">

                <h3>${listing.title}</h3>

                <p>
                    ${listing.description || "No description available."}
                </p>

                <div class="listing-info">
                    <span>
                    ${listing._count?.bids || 0}
                    ${listing._count?.bids === 1 ? "bid" : "bids"}
                    </span>

                    <span>
                    Ends:
                    ${new Date(listing.endsAt).toLocaleDateString()}
                    </span>
                </div>

                <a
                    href="listing.html?id=${listing.id}"
                    class="btn btn-primary"
                >
                    View auction
                </a>

                </div>

            </article>
            </div>
        `;
        })
        .join("")}
    </div>
`;
}