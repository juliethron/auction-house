export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profile");

    window.location.href = "index.html";
}

document.addEventListener("click", (event) => {
    const logoutButton = event.target.closest("#logout-button");

    if (!logoutButton) {
        return;
    }

    logout();
});