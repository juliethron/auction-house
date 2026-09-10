import { deleteListing } from "../api/listings.js";

export function setupDeleteButton(listingId) {
    const deleteButton = document.querySelector("#delete-listing");

    if (!deleteButton) {
        return;
    }

    deleteButton.addEventListener("click", async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this listing? This cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        deleteButton.disabled = true;
        deleteButton.textContent = "Deleting...";

        try {
            await deleteListing(listingId);

            window.alert("Listing deleted successfully.");

            window.location.href = "index.html";

        } catch (error) {
            console.error("DELETE LISTING ERROR:", error);

            window.alert(
                error.message || "Something went wrong while deleting the listing."
            );

            deleteButton.disabled = false;
            deleteButton.textContent = "Delete listing";
        }
    });
}
