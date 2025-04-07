//Need to still create error display message on page for thrown back end errors.
//Declared email, firstName, lastName, role, and password in fetch function since checkPassword and checkEmail wont be used in demo
const addUserForm = document.getElementById('addUser');
const tbody = document.getElementById('tbody');

//Ensure password meets criteria. Disable for back end demo functions.
function checkPassword()                                            
{   
    //Go back in later version and add password var here.
    const rePassword = document.getElementById('rePassword');
    const passwordError = document.getElementById('passwordError');


    if (password.value !== rePassword.value) {
        passwordError.textContent = 'Passwords do not match.';
        return false;
    
    } else if (password.value.length < 8 || !/\d/.test(password.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
        return false;

    } else {
        passwordError.textContent = '';
        return true;
    }
}

//Ensure email meets correct format. Disable for back end demo functions.
function checkEmail()
{
    //Go back in later version and add email var here.
    const emailError = document.getElementById('emailError');

    const regex = /@.*\.(com|net|org|gov|edu|mil)$/;
    
    if (!regex.test(email.value)) {
        emailError.textContent = "Please enter a valid email address (must include '@' and a valid domain).";
        return false;

    } else {
        emailError.textContent = "";  
        return true;
    }
}

//POST function to create new user. If successful, append the new user to the display table.
//If error occurs catch it and display it to the user with message.
function createNewUser() {                                                     
    
    fetch('/manageUsers/createUser', {                                                    
    method: 'POST',                         
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({                                                  
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        role: document.getElementById('role').value,
        password: document.getElementById('password').value
      })
    })
    .then(response => {                                                         
        if (!response.ok) {                                         
            return response.text().then(errorText => {                          //If the response is not ok, get the error message and throw it with the HTTP status.
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                 //If the response is succesful pass the response object to user.
    })
    .then(user => {

        const row = document.createElement('tr');                              
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.role}</td>
            <td>${user.creationDate}</td>
            <td>
                <button class="delete-btn" data-email="${user.email}">Delete</button>   
            </td>
        `;
        
        tbody.appendChild(row);                                                
        addUserForm.reset();                                                  

    })
    .catch(error => {                                                         
        document.getElementById('backEndError').textContent = error.message;
    });
}

//GET function to display all users. If error occurs on back end, catch it and show it to user.
//All system users are displayed in table with option to delete user.
function fetchUsers() {     

    fetch('/manageUsers/getUsers', {                                           
        method: 'GET',                                                       
        Accept: 'application/json'                                          
    })
    .then(response => {                                                      
        if (!response.ok) {                                                     //If the response is not ok, get the error message and throw it with the HTTP status.
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                
    })
    .then(users => {                                                   

        tbody.innerHTML ='';                                              

        users.forEach(user => {                                          
                                                                            
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.email}</td>   
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.role}</td>
                <td>${user.creationDate}</td>
                <td>
                    <button class="delete-btn" data-email="${user.email}">Delete</button>
                </td>
            `;

            tbody.appendChild(row);                               

        });
    }) 
    .catch(error => {                                                         
        document.getElementById('backEndError').textContent = error.message;

    });
}

/*DELETE function to delete a user from system via row. Catch and display any errors.
All emails in system are unqiue so use that as ID for when deleting a user from DB.
If the deletion is succesful, remove the user's row. */

function deleteUser(userEmail, buttonElement) {
    fetch(`/manageUsers/deleteUser/${userEmail}`, {     
        method: 'DELETE',                             
        Accept: 'application/json' 
    })
    .then(response => { 
        if (!response.ok) {                           
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        const row = buttonElement.closest('tr');      
        row.remove();
    })
    .catch(error => {
        document.getElementById('backEndError').textContent = error.message;
    });
}

//Fetch and display users right away.
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

addUserForm.addEventListener('submit', function(event) 
{
        event.preventDefault();
        createNewUser();
        
        /*Disabled for back end function demo:
        const isEmailValid = checkEmail(email, emailError);
        const isPasswordValid = checkPassword(password, rePassword, passwordError);
        if (isEmailValid && isPasswordValid) {
        */
});

//Used in deletion process for getting the correct user in the table.
tbody.addEventListener('click', function(event) {      
    if (event.target.classList.contains('delete-btn')) {    
        const userEmail = event.target.dataset.email;
        deleteUser(userEmail, event.target);   
    }
});




    




























