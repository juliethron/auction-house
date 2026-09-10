import { logout } from "../auth/logout.js";

export function renderNavbar() {
    const accessToken = localStorage.getItem("accessToken");

    const isLoggedIn = Boolean(accessToken);

    return `
        <nav class="navbar navbar-expand-lg">
            <div class="container">

                <a class="navbar-brand" href="index.html">
                    AUCTION HOUSE
                </a>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="mainNavbar"
                >

                    <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <li class="nav-item">
                            <a class="nav-link" href="index.html">
                                Browse
                            </a>
                        </li>

                        ${
                            isLoggedIn
                                ? `
                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            href="create-listing.html"
                                        >
                                            Create listing
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            href="profile.html"
                                        >
                                            Profile
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <span class="nav-link credits-display">
                                            Credits: ${
                                                JSON.parse(
                                                    localStorage.getItem("profile")
                                                )?.credits || 0
                                            }
                                        </span>
                                    </li>

                                    <li class="nav-item">
                                        <button
                                            class="btn btn-danger"
                                            id="logout-button"
                                        >
                                            Log out
                                        </button>
                                    </li>
                                `
                                : `
                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            href="login.html"
                                        >
                                            Log in
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <a
                                            class="btn btn-danger"
                                            href="register.html"
                                        >
                                            Register
                                        </a>
                                    </li>
                                `
                        }

                    </ul>

                </div>

            </div>
        </nav>
    `;
}


export function setupLogoutButton() {
    const logoutButton =
        document.querySelector("#logout-button");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("profile");
            localStorage.removeItem("userName");

            window.location.href = "index.html";

        }
    );
}