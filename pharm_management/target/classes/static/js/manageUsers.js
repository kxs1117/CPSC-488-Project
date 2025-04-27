document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createUserForm");
    const statusMessage = document.getElementById("statusMessage");
    const usersTable = document.querySelector("#usersTable tbody");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!username || !password || !role) {
            statusMessage.textContent = "All fields are required.";
            return;
        }

        const response = await fetch("/api/users/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });

        const result = await response.text();

        if (result === "success") {
            statusMessage.textContent = "✅ User created successfully!";
            form.reset();
            loadUsers();
        } else {
            statusMessage.textContent = "❌ Error: " + result;
        }
    });

    async function loadUsers() {
        const response = await fetch("/api/users/all");
        const users = await response.json();

        usersTable.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role.roleType}</td>
            `;
            usersTable.appendChild(row);
        });
    }

    loadUsers();
});
