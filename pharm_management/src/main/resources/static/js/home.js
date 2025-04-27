document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Get current user role from backend session
        const response = await fetch("/api/session");
        const role = await response.text();

        if (role === "none") {
            window.location.href = "login.html"; // Force login
            return;
        }

        // Display the current role
        const display = document.getElementById("date");
        if (display) display.textContent = `Logged in as: ${role.toUpperCase()}`;

        // Hide features the role shouldn't see
        document.querySelectorAll(".feature-box").forEach(box => {
            const allowedRoles = box.getAttribute("data-roles").split(",");
            if (!allowedRoles.includes(role)) {
                box.style.display = "none";
            }
        });

    } catch (err) {
        console.error("Error fetching session info:", err);
        window.location.href = "login.html";
    }
});
