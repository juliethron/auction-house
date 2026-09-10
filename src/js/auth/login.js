import { renderNavbar } from "../ui/navbar.js";
import { loginUser } from "../api/auth.js";
import { getProfile } from "../api/profiles.js";
import { renderFooter } from "../ui/footer.js";


const footer = document.querySelector("#footer");

if (footer) {
    footer.innerHTML = renderFooter();
}


const navbar = document.querySelector("#navbar");

if (navbar) {
    navbar.innerHTML = renderNavbar();
}


const form = document.querySelector("#login-form");
const message = document.querySelector("#login-message");


if (form) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.querySelector("#email").value.trim();

        const password =
            document.querySelector("#password").value;


        message.textContent =
            "Logging in...";


        try {

            const result =
                await loginUser(
                    email,
                    password
                );


            const user =
                result.data;


            
            localStorage.setItem(
                "accessToken",
                user.accessToken
            );


            

            const profileResult =
                await getProfile(
                    user.name
                );



            localStorage.setItem(
                "profile",
                JSON.stringify(
                    profileResult.data
                )
            );


            

            localStorage.setItem(
                "userName",
                user.name
            );

            localStorage.setItem(
                "userEmail",
                user.email
            );


            message.textContent =
                `Welcome, ${user.name}!`;


            form.reset();


            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 1000);


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            message.textContent =
                error.message;

        }

    });

}