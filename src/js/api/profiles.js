const API_BASE_URL = "https://v2.api.noroff.dev";

const API_KEY = "134d87df-3d4c-4578-b111-c34a8e816707";


export async function getProfile(name) {

    const accessToken =
        localStorage.getItem("accessToken");


    const response = await fetch(
        `${API_BASE_URL}/auction/profiles/${name}`,
        {
            headers: {

                Authorization:
                    `Bearer ${accessToken}`,

                "X-Noroff-API-Key":
                    API_KEY,

            },
        }
    );


    const data = await response.json();


    console.log(
        "PROFILE STATUS:",
        response.status
    );

    console.log(
        "PROFILE RESPONSE:",
        data
    );


    if (!response.ok) {

        const errorMessage =
            data.errors
                ?.map(
                    (error) => error.message
                )
                .join(", ") ||
            data.message ||
            "Failed to load profile.";


        throw new Error(errorMessage);

    }


    return data;

}



export async function updateProfile(name, profileData) {

    const accessToken =
        localStorage.getItem("accessToken");


    const response = await fetch(
        `${API_BASE_URL}/auction/profiles/${name}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",

                Authorization:
                    `Bearer ${accessToken}`,

                "X-Noroff-API-Key":
                    API_KEY,
            },

            body: JSON.stringify(profileData),
        }
    );


    const data = await response.json();


    console.log(
        "UPDATE PROFILE STATUS:",
        response.status
    );

    console.log(
        "UPDATE PROFILE RESPONSE:",
        data
    );


    if (!response.ok) {

        const errorMessage =
            data.errors
                ?.map(
                    (error) => error.message
                )
                .join(", ") ||
            data.message ||
            "Failed to update profile.";


        throw new Error(errorMessage);

    }


    return data;

}



export async function getProfileListings(name) {

    const accessToken =
        localStorage.getItem("accessToken");


    const response = await fetch(
        `${API_BASE_URL}/auction/profiles/${name}/listings?_seller=true&_bids=true`,
        {
            headers: {

                Authorization:
                    `Bearer ${accessToken}`,

                "X-Noroff-API-Key":
                    API_KEY,

            },
        }
    );


    const data = await response.json();


    console.log(
        "PROFILE LISTINGS STATUS:",
        response.status
    );

    console.log(
        "PROFILE LISTINGS RESPONSE:",
        data
    );


    if (!response.ok) {

        const errorMessage =
            data.errors
                ?.map(
                    (error) => error.message
                )
                .join(", ") ||
            data.message ||
            "Failed to load profile listings.";


        throw new Error(errorMessage);

    }


    return data;

}



export async function getProfileBids(name) {

    const accessToken =
        localStorage.getItem("accessToken");


    const response = await fetch(
        `${API_BASE_URL}/auction/profiles/${name}/bids?_listings=true`,
        {
            headers: {

                Authorization:
                    `Bearer ${accessToken}`,

                "X-Noroff-API-Key":
                    API_KEY,

            },
        }
    );


    const data = await response.json();


    console.log(
        "PROFILE BIDS STATUS:",
        response.status
    );

    console.log(
        "PROFILE BIDS RESPONSE:",
        data
    );


    if (!response.ok) {

        const errorMessage =
            data.errors
                ?.map(
                    (error) => error.message
                )
                .join(", ") ||
            data.message ||
            "Failed to load profile bids.";


        throw new Error(errorMessage);

    }


    return data;

}