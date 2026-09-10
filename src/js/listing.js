import { renderNavbar } from "./ui/navbar.js";
import { getListing } from "./api/listings.js";
import { setupBidForm } from "./listings/placeBid.js";
import { setupDeleteButton } from "./listings/deleteListing.js";
import { renderFooter } from "./ui/footer.js";

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}


const navbar = document.querySelector("#navbar");

if (navbar) {
    navbar.innerHTML = renderNavbar();
}


const container = document.querySelector("#listing-container");


const params = new URLSearchParams(
    window.location.search
);

const listingId = params.get("id");


const currentUser =
    localStorage.getItem("userName");


async function loadListing() {

    if (!listingId) {

        container.innerHTML = `
            <p>
                Sorry, we couldn't find that auction.
            </p>
        `;

        return;
    }


    container.innerHTML = `
        <p>
            Loading auction...
        </p>
    `;


    try {

        const result =
            await getListing(listingId);

        const listing =
            result.data;


        const image =
            listing.media?.[0];


        const accessToken =
            localStorage.getItem("accessToken");


        const isOwner =
            listing.seller?.name === currentUser;


        container.innerHTML = `

            <div class="listing-layout">



                <article class="listing-item-card">


                    ${
                        image
                            ? `
                                <img
                                    class="listing-main-image"
                                    src="${image.url}"
                                    alt="${image.alt || listing.title}"
                                >
                            `
                            : `
                                <div class="no-image listing-main-image">
                                    No image available
                                </div>
                            `
                    }


                    <h1 class="listing-title">
                        ${listing.title}
                    </h1>


                    <p class="listing-description">
                        ${
                            listing.description ||
                            "No description available."
                        }
                    </p>


                    ${
                        listing.tags?.length
                            ? `
                                <div class="listing-tags">

                                    ${listing.tags
                                        .map(
                                            (tag) => `
                                                <span class="listing-tag">
                                                    ${tag}
                                                </span>
                                            `
                                        )
                                        .join("")}

                                </div>
                            `
                            : ""
                    }


                </article>



                <aside class="listing-sidebar">

                    <div class="listing-info-card">



                        <div class="listing-meta">


                            <div class="listing-meta-item">

                                <span class="listing-meta-label">
                                    Ends
                                </span>

                                <span class="listing-meta-value">
                                    ${new Date(
                                        listing.endsAt
                                    ).toLocaleString()}
                                </span>

                            </div>


                            <div class="listing-meta-item">

                                <span class="listing-meta-label">
                                    Bids
                                </span>

                                <span class="listing-meta-value">
                                    ${listing._count?.bids || 0}
                                </span>

                            </div>


                        </div>



                        <section class="listing-section">

                            <h2>
                                Seller
                            </h2>

                            <div class="seller-card">

                                <span class="seller-name">

                                    ${
                                        listing.seller?.name ||
                                        "Unknown seller"
                                    }

                                </span>

                            </div>

                        </section>



                        ${
                            isOwner
                                ? `
                                    <div class="listing-owner-actions">

                                        <a
                                            href="edit-listing.html?id=${listing.id}"
                                            class="btn btn-primary"
                                        >
                                            Edit listing
                                        </a>


                                        <button
                                            id="delete-listing"
                                            type="button"
                                            class="btn btn-outline-danger"
                                        >
                                            Delete listing
                                        </button>

                                    </div>
                                `
                                : ""
                        }



                        <section class="listing-section">

                            <h2>
                                Bid history
                            </h2>

                            <div class="bid-history">

                                ${
                                    listing.bids?.length
                                        ? `
                                            <ul class="list-unstyled mb-0">

                                                ${listing.bids
                                                    .map(
                                                        (bid) => `
                                                            <li>

                                                                <strong>
                                                                    ${bid.amount}
                                                                    credits
                                                                </strong>

                                                                —

                                                                ${
                                                                    bid.bidder
                                                                        ?.name ||
                                                                    "Unknown bidder"
                                                                }

                                                            </li>
                                                        `
                                                    )
                                                    .join("")}

                                            </ul>
                                        `
                                        : `
                                            <p class="p-3 mb-0">
                                                No bids yet.
                                            </p>
                                        `
                                }

                            </div>

                        </section>



                        ${
                            accessToken && !isOwner
                                ? `
                                    <section class="listing-section bid-section">

                                        <h2>
                                            Place a bid
                                        </h2>


                                        <form id="bid-form">

                                            <label for="bid-amount">
                                                Your bid
                                            </label>


                                            <input
                                                type="number"
                                                id="bid-amount"
                                                min="1"
                                                required
                                            >


                                            <button
                                                type="submit"
                                                class="btn btn-primary"
                                            >
                                                Place bid
                                            </button>

                                        </form>


                                        <p id="bid-message"></p>

                                    </section>
                                `
                                : !accessToken
                                    ? `
                                        <section class="listing-section">

                                            <p>

                                                <a href="login.html">
                                                    Log in
                                                </a>

                                                to place a bid.

                                            </p>

                                        </section>
                                    `
                                    : ""
                        }


                    </div>

                </aside>


            </div>

        `;


        // Set up bidding for users who do not own the listing

        if (accessToken && !isOwner) {

            setupBidForm(
                listing.id
            );

        }


        // Set up delete button for the listing owner

        if (isOwner) {

            setupDeleteButton(
                listing.id
            );

        }


    } catch (error) {

        console.error(
            "LISTING ERROR:",
            error
        );


        container.innerHTML = `

            <p>

                Sorry, we couldn't load this auction.
                Please try again later.

            </p>

        `;

    }

}


loadListing();