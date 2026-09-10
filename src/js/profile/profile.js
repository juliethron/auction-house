import {
    renderNavbar,
    setupLogoutButton,
} from "../ui/navbar.js";

import {
    updateProfile,
    getProfileListings,
    getProfileBids,
} from "../api/profiles.js";

import { renderFooter } from "../ui/footer.js";

const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}

const navbar = document.querySelector("#navbar");

const profileContainer =
    document.querySelector("#profile-container");


if (navbar) {
    navbar.innerHTML = renderNavbar();
}


const profile = JSON.parse(
    localStorage.getItem("profile")
);


if (!profile) {

    window.location.href = "login.html";

} else {

    loadProfile();

}


async function loadProfile() {

    profileContainer.innerHTML = `

        <div class="profile-card">



            <div class="profile-banner">

                ${
                    profile.banner?.url
                        ? `
                            <img
                                src="${profile.banner.url}"
                                alt="${
                                    profile.banner.alt ||
                                    `${profile.name}'s profile banner`
                                }"
                            >
                        `
                        : `
                            <div class="profile-banner-placeholder">
                            </div>
                        `
                }

            </div>


            <div class="profile-info">



                <div class="profile-avatar">

                    ${
                        profile.avatar?.url
                            ? `
                                <img
                                    src="${profile.avatar.url}"
                                    alt="${
                                        profile.avatar.alt ||
                                        profile.name
                                    }"
                                >
                            `
                            : `
                                <div class="avatar-placeholder">

                                    ${profile.name
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>
                            `
                    }

                </div>



                <div class="profile-details">

                    <h1>
                        ${profile.name}
                    </h1>


                    <p class="profile-email">
                        ${profile.email}
                    </p>


                    <p class="profile-bio">

                        ${
                            profile.bio ||
                            "No bio added yet."
                        }

                    </p>


                    <p class="profile-credits">

                        <strong>Credits:</strong>

                        ${profile.credits || 0}

                    </p>


                    <button
                        type="button"
                        id="edit-profile-button"
                        class="btn btn-primary"
                    >
                        Edit profile
                    </button>


                </div>

            </div>



            <div
                class="profile-edit"
                id="profile-edit-section"
                hidden
            >

                <h2>
                    EDIT PROFILE
                </h2>


                <form id="profile-form">



                    <div class="mb-3">

                        <label
                            for="profile-bio"
                            class="form-label"
                        >
                            Bio
                        </label>


                        <textarea
                            id="profile-bio"
                            class="form-control"
                            rows="4"
                            placeholder="Tell us a little about yourself..."
                        >${profile.bio || ""}</textarea>

                    </div>



                    <div class="mb-3">

                        <label
                            for="avatar-url"
                            class="form-label"
                        >
                            Avatar image URL
                        </label>


                        <input
                            type="url"
                            id="avatar-url"
                            class="form-control"
                            placeholder="https://example.com/avatar.jpg"
                            value="${
                                profile.avatar?.url || ""
                            }"
                        >

                    </div>



                    <div class="mb-3">

                        <label
                            for="avatar-alt"
                            class="form-label"
                        >
                            Avatar image description
                        </label>


                        <input
                            type="text"
                            id="avatar-alt"
                            class="form-control"
                            placeholder="Describe your avatar"
                            value="${
                                profile.avatar?.alt || ""
                            }"
                        >

                    </div>



                    <div class="mb-3">

                        <label
                            for="banner-url"
                            class="form-label"
                        >
                            Banner image URL
                        </label>


                        <input
                            type="url"
                            id="banner-url"
                            class="form-control"
                            placeholder="https://example.com/banner.jpg"
                            value="${
                                profile.banner?.url || ""
                            }"
                        >

                    </div>



                    <div class="mb-3">

                        <label
                            for="banner-alt"
                            class="form-label"
                        >
                            Banner image description
                        </label>


                        <input
                            type="text"
                            id="banner-alt"
                            class="form-control"
                            placeholder="Describe your banner"
                            value="${
                                profile.banner?.alt || ""
                            }"
                        >

                    </div>


                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Save profile
                    </button>


                    <p
                        id="profile-message"
                        class="mt-3"
                    ></p>


                </form>

            </div>

        </div>



        <section class="profile-listings">

            <h2>
                MY LISTINGS
            </h2>


            <div
                id="profile-listings-container"
                class="profile-listings-grid"
            >

                <p>
                    Loading your listings...
                </p>

            </div>

        </section>



        <section class="profile-listings profile-bids">

            <h2>
                MY BIDS
            </h2>


            <div
                id="profile-bids-container"
                class="profile-listings-grid"
            >

                <p>
                    Loading your bids...
                </p>

            </div>

        </section>

    `;


    setupEditProfileButton();

    setupProfileForm();

    loadProfileListings();

    loadProfileBids();

}


function setupEditProfileButton() {

    const editButton =
        document.querySelector("#edit-profile-button");

    const editSection =
        document.querySelector("#profile-edit-section");


    if (!editButton || !editSection) {
        return;
    }


    editButton.addEventListener("click", () => {

        const isHidden =
            editSection.hasAttribute("hidden");


        if (isHidden) {

            editSection.removeAttribute("hidden");

            editButton.textContent =
                "Cancel editing";

        } else {

            editSection.setAttribute(
                "hidden",
                ""
            );

            editButton.textContent =
                "Edit profile";

        }

    });

}


function setupProfileForm() {

    const profileForm =
        document.querySelector("#profile-form");


    const profileMessage =
        document.querySelector("#profile-message");


    if (!profileForm) {
        return;
    }


    profileForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const bio =
                document
                    .querySelector("#profile-bio")
                    .value
                    .trim();


            const avatarUrl =
                document
                    .querySelector("#avatar-url")
                    .value
                    .trim();


            const avatarAlt =
                document
                    .querySelector("#avatar-alt")
                    .value
                    .trim();


            const bannerUrl =
                document
                    .querySelector("#banner-url")
                    .value
                    .trim();


            const bannerAlt =
                document
                    .querySelector("#banner-alt")
                    .value
                    .trim();


            profileMessage.textContent =
                "Updating profile...";


            const profileData = {

                bio,

                avatar: {
                    url: avatarUrl,
                    alt: avatarAlt,
                },

                banner: {
                    url: bannerUrl,
                    alt: bannerAlt,
                },

            };


            try {

                const result =
                    await updateProfile(
                        profile.name,
                        profileData
                    );


                const updatedProfile =
                    result.data;


                localStorage.setItem(
                    "profile",
                    JSON.stringify(updatedProfile)
                );


                profileMessage.textContent =
                    "Profile updated successfully!";


                setTimeout(() => {

                    window.location.reload();

                }, 800);


            } catch (error) {

                console.error(
                    "PROFILE UPDATE ERROR:",
                    error
                );


                profileMessage.textContent =
                    error.message ||
                    "Something went wrong.";

            }

        }
    );

}


async function loadProfileListings() {

    const listingsContainer =
        document.querySelector(
            "#profile-listings-container"
        );


    if (!listingsContainer) {
        return;
    }


    try {

        const result =
            await getProfileListings(profile.name);


        const listings = result.data;


        console.log(
            "MY LISTINGS:",
            listings
        );


        if (!listings || listings.length === 0) {

            listingsContainer.innerHTML = `

                <p>
                    You haven't created any listings yet.
                </p>

            `;

            return;

        }


        listingsContainer.innerHTML =
            listings
                .map((listing) => {

                    const image =
                        listing.media?.[0];


                    return `

                        <article class="profile-listing-card">


                            <div class="profile-listing-image">

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${image.url}"
                                                alt="${
                                                    image.alt ||
                                                    listing.title
                                                }"
                                            >
                                        `
                                        : `
                                            <div class="no-image">
                                                No image available
                                            </div>
                                        `
                                }

                            </div>


                            <div class="profile-listing-content">


                                <h3>
                                    ${listing.title}
                                </h3>


                                <p class="profile-listing-description">

                                    ${
                                        listing.description ||
                                        "No description available."
                                    }

                                </p>


                                <div class="profile-listing-meta">


                                    <p>

                                        Ends:

                                        ${new Date(
                                            listing.endsAt
                                        ).toLocaleDateString()}

                                    </p>


                                    <p>

                                        ${
                                            listing._count?.bids || 0
                                        }

                                        bids

                                    </p>


                                </div>


                                <a
                                    href="listing.html?id=${listing.id}"
                                    class="btn btn-primary"
                                >
                                    View auction
                                </a>


                            </div>


                        </article>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(
            "PROFILE LISTINGS ERROR:",
            error
        );


        listingsContainer.innerHTML = `

            <p>
                Sorry, we couldn't load your listings.
            </p>

        `;

    }

}


async function loadProfileBids() {

    const bidsContainer =
        document.querySelector(
            "#profile-bids-container"
        );


    if (!bidsContainer) {
        return;
    }


    try {

        const result =
            await getProfileBids(profile.name);


        const bids = result.data;


        console.log(
            "MY BIDS:",
            bids
        );


        if (!bids || bids.length === 0) {

            bidsContainer.innerHTML = `

                <p>
                    You haven't placed any bids yet.
                </p>

            `;

            return;

        }


        bidsContainer.innerHTML =
            bids
                .map((bid) => {

                    const listing = bid.listing;


                    if (!listing) {
                        return "";
                    }


                    const image =
                        listing.media?.[0];


                    return `

                        <article class="profile-listing-card">


                            <div class="profile-listing-image">

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${image.url}"
                                                alt="${
                                                    image.alt ||
                                                    listing.title
                                                }"
                                            >
                                        `
                                        : `
                                            <div class="no-image">
                                                No image available
                                            </div>
                                        `
                                }

                            </div>


                            <div class="profile-listing-content">


                                <h3>
                                    ${listing.title}
                                </h3>


                                <p class="profile-listing-description">

                                    ${
                                        listing.description ||
                                        "No description available."
                                    }

                                </p>


                                <div class="profile-listing-meta">


                                    <p>

                                        Your bid:

                                        <strong>
                                            ${bid.amount} credits
                                        </strong>

                                    </p>


                                    <p>

                                        Ends:

                                        ${new Date(
                                            listing.endsAt
                                        ).toLocaleDateString()}

                                    </p>


                                </div>


                                <a
                                    href="listing.html?id=${listing.id}"
                                    class="btn btn-primary"
                                >
                                    View auction
                                </a>


                            </div>


                        </article>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(
            "PROFILE BIDS ERROR:",
            error
        );


        bidsContainer.innerHTML = `

            <p>
                Sorry, we couldn't load your bids.
            </p>

        `;

    }

}