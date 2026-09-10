const API_BASE_URL = "https://v2.api.noroff.dev";



export async function getListings({
    search = "",
    tag = "",
    active = true,
    limit = 12,
    page = 1,
    sort = "",
    sortOrder = "desc",
} = {}) {
    let url;

    if (search) {
        url = `${API_BASE_URL}/auction/listings/search?q=${encodeURIComponent(search)}`;
    } else {
        url = `${API_BASE_URL}/auction/listings`;
    }

    const params = new URLSearchParams();

    params.append("limit", limit);
    params.append("page", page);

    if (tag) {
        params.append("_tag", tag);
    }

    if (active) {
        params.append("_active", "true");
    }

    if (sort) {
        params.append("sort", sort);
        params.append("sortOrder", sortOrder);
    }

    const queryString = params.toString();

    if (queryString) {
        url += url.includes("?")
            ? `&${queryString}`
            : `?${queryString}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch listings: ${response.status}`);
    }

    return await response.json();
}


export async function createListing(listingData) {
    const accessToken = localStorage.getItem("accessToken");

    const API_KEY = "134d87df-3d4c-4578-b111-c34a8e816707";

    const response = await fetch(
        `${API_BASE_URL}/auction/listings`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
            },

            body: JSON.stringify(listingData),
        }
    );

    const data = await response.json();

    console.log("CREATE LISTING STATUS:", response.status);
    console.log("CREATE LISTING RESPONSE:", data);

    if (!response.ok) {
        const errorMessage =
            data.errors?.map((error) => error.message).join(", ") ||
            data.message ||
            "Could not create listing.";

        throw new Error(errorMessage);
    }

    return data;
}

export async function getListing(id) {
    const url =
        `${API_BASE_URL}/auction/listings/${id}?_seller=true&_bids=true`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch listing: ${response.status}`);
    }

    return await response.json();
}

export async function placeBid(listingId, amount) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You must be logged in to place a bid.");
    }

    const response = await fetch(
        `${API_BASE_URL}/auction/listings/${listingId}/bids`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707",
            },
            body: JSON.stringify({
                amount: Number(amount),
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.[0]?.message ||
            "Failed to place bid."
        );
    }

    return data;
}

export async function updateListing(listingId, listingData) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You must be logged in to edit a listing.");
    }

    const response = await fetch(
        `${API_BASE_URL}/auction/listings/${listingId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key":
                    "134d87df-3d4c-4578-b111-c34a8e816707",
            },

            body: JSON.stringify(listingData),
        }
    );

    const data = await response.json();

    console.log("UPDATE LISTING STATUS:", response.status);
    console.log("UPDATE LISTING RESPONSE:", data);

    if (!response.ok) {
        const errorMessage =
            data.errors?.map((error) => error.message).join(", ") ||
            data.message ||
            "Could not update listing.";

        throw new Error(errorMessage);
    }

    return data;
}

export async function deleteListing(id) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("You must be logged in to delete a listing.");
    }

    const API_KEY = "134d87df-3d4c-4578-b111-c34a8e816707";

    const response = await fetch(
        `${API_BASE_URL}/auction/listings/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
            },
        }
    );

    if (!response.ok) {
        let errorMessage = "Failed to delete listing.";

        try {
            const data = await response.json();

            errorMessage =
                data.errors?.map((error) => error.message).join(", ") ||
                data.message ||
                errorMessage;
        } catch {
        }

        throw new Error(errorMessage);
    }

    return true;
}