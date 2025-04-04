//Need to still create error display message on page for thrown back end errors.
const addUserForm = document.getElementById('addUser');
const userTableRows = document.getElementById('userTableRows');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const passwordError = document.getElementById('passwordError');
const role = document.getElementById('role');
const tbody = document.getElementById('tbody');

//Ensure password meets criteria. Disable for back end demo functions.
function checkPassword()                                            
{
    if (password.value !== confirmPassword.value) {
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
    
    fetch('/manageUsers/createUser', {                                          //Endpoint that the values are sent to.                  
      method: 'POST',                                                           //POST is used for sending data to server to create a resource.
      headers: {'Content-Type': 'application/json'},                            //Header tells server that the request body will be in JSON format.
      body: JSON.stringify({                                                    //Convert the values to JSON format and send to endpoint.
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        role: role.value,
        password: password.value
      })
    })
    .then(response => {                                                         
        if (!response.ok) {                                                     //Begins promise chain where the server response is processed. response is the HTTP response object.
            return response.text().then(errorText => {                          //If the response is not ok, get the error message and throw it with the HTTP status.
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                 //If the response is succesful pass the response object to user.
    })
    .then(user => {

        const row = document.createElement('tr');                                       //Using the user object, create a row with the following fields. Clicking delete button deletes user based on their email.
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.role}</td>
            <td>${user.userCreationdDate}</td>
            <td>
                <button class="delete-btn" data-email="${user.email}">Delete</button>   
            </td>
        `;
        
        tbody.appendChild(row);                                                 //Append the row to the bottom of the table.
        
        addUserForm.reset();                                                    //Reset the form where the users details were submitted.

    })
    .catch(error => {                                                           //Catch and display error.
        document.getElementById('errorDisplay').textContent = error.message;
    });
}

//GET function to display all users. If error occurs on back end, catch it and show it to user.
//All system users are displayed in table with option to delete user.
function fetchUsers() {     

    fetch('/manageUsers/getUsers', {                                            //Endpoint that the values are sent to.
        method: 'GET',                                                          //GET is used for getting data from the server.
    })
    .then(response => {                                                         //Begins promise chain where the server response is processed. response is the HTTP response object.
        if (!response.ok) {                                                     //If the response is not ok, get the error message and throw it with the HTTP status.
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                 //Needed since a list of UserDTO objects is returned.
    })
    .then(users => {                                                            //Users is the list that was passed to it.

        tbody.innerHTML =''; 

        users.forEach(user => {                                                 //For each user in the list, create a new row and insert the users name, email, role, and creation date.
                                                                                //Button to delete the user.
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

            tbody.appendChild(row);                                             //Append the row.

        });
    }) 
    .catch(error => {                                                           //Catch the error and display it.
        document.getElementById('errorDisplay').textContent = error.message;

    });
}

/*DELETE function to delete a user from system via row. Catch and display any errors.
All emails in system are unqiue so use that as ID for when deleting a user from DB.
If the deletion is succesful, remove the user's row. */

function deleteUser(userEmail, buttonElement) {
    fetch(`/manageUsers/deleteUser/${userEmail}`, {     //This endpoint sends the user's email to the back end point.
        method: 'DELETE',                               //Specfices that the method is DELETE which will delete the user from the system.
    })
    .then(response => { 
        if (!response.ok) {                             //If the response is not okay throw the error.
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        const row = buttonElement.closest('tr');       //If response is okay, remove the row.
        row.remove();
    })
    .catch(error => {
        document.getElementById('errorDisplay').textContent = error.message;
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
tbody.addEventListener('click', function(event) {           //Add an event listener for the table body. When the delete button is clicked the function executes.
    if (event.target.classList.contains('delete-btn')) {    //Checks if the element that was clicked via event.target has a CSS class named 'delete-btn'.
        const userEmail = event.target.dataset.email;       //If the button is delete-btn then get the email associated with that button and store it in userEmail.
        deleteUser(userEmail, event.target);                //Call the delete function and pass the email of the button and the button that was clicked.
    }
});




    




























