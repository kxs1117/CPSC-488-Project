document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username,
                password
            })
        });

        const result = await response.text();

        switch (result) {
            case "admin":
            case "manager":
            case "pharmacist":
            case "fraud_analyst":
                window.location.href = "home.html"; // redirect to home
                break;
            default:
                document.getElementById("loginError").textContent = "Invalid username or password.";
        }
    });
});







