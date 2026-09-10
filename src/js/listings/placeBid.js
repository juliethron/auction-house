import { placeBid } from "../api/listings.js";


export function setupBidForm(listingId) {
    const form = document.querySelector("#bid-form");
    const message = document.querySelector("#bid-message");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document
            .querySelector("#bid-amount")
            .value;

        message.textContent = "Placing bid...";

        try {
            await placeBid(listingId, amount);

            message.textContent = "Bid placed successfully!";

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("BID ERROR:", error);

            message.textContent = error.message;
        }
    });
}
