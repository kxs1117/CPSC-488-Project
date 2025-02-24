document.addEventListener('DOMContentLoaded', () => {
    const loadUsers = async () => {     //Load and display users right away.
        
        const response = await fetch('/manageUsers/displayUsers');
        const users = await response.json();

        // clear table before refresh
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
            
        //Create row for each registered user
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = 
            `
                <td>${user.username}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.roleType}</td>
                <td><button class="delete-btn" data-id="${user.id}">Delete</button></td>
            `;
            tbody.appendChild(row);
        });

        //Delete a user from the displayed list of users
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = async () => {
                try {
                    const response = await fetch(`/manageUsers/deleteUsers/${btn.dataset.id}`, {
                         method: 'DELETE'
                    });
                    
                     if (response.ok) {
                        alert("User deleted")
                            
                        loadUsers();    //Update the display list when user is deleted.
                    }
                } catch (err) {
                    console.error(err);
                    console.error('Failed to delete user', err);
                }
            };
        });
    };

    //Add user to the system, along with role. Note: Have user change settings upon first log in
    const form = document.getElementById('addUser');
    form.onsubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value
        };
        
        try {
            const response = await fetch('/manageUsers/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                form.reset();
                alert('User added');
                loadUsers();    //Update the display list.
            }
        } catch (err) {
            console.error(err);
            alert('Failed to add user');
        }
    };

    loadUsers(); //Update for new user is added.
});
