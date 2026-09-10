const API_BASE_URL = "https://v2.api.noroff.dev";

export async function registerUser(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    const data = await response.json();

    console.log("REGISTER STATUS:", response.status);
    console.log("REGISTER RESPONSE:", data);

    if (!response.ok) {
        const errorMessage =
            data.errors?.map((error) => error.message).join(", ") ||
            data.message ||
            "Registration failed.";

        throw new Error(errorMessage);
    }

    return data;
}


export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    console.log("LOGIN STATUS:", response.status);
    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {
        const errorMessage =
            data.errors?.map((error) => error.message).join(", ") ||
            data.message ||
            "Login failed.";

        throw new Error(errorMessage);
    }

    return data;
}