const addUserForm = document.getElementById('addUser');

const email = document.getElementById('email');
const emailError = document.getElementById('emailError');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const passwordError = document.getElementById('passwordError');

const role = document.getElementById('role');

//const table = document.getElementById('userTable');

function checkPassword(password, confirmPassword, passwordError)
{
    //Needed for ensuring password meets requirements before storing in back end. 
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

function checkEmail(email, emailError)
{
    //Expand function when implementing back end so that it incorporates checking if given email already exists.

    //Reference for RE: MDN and builtin.
    const regex = /@.*\.(com|net|org|gov|edu|mil)$/;
    
    if (!regex.test(email.value)) {
        emailError.textContent = "Please enter a valid email address (must include '@' and a valid domain).";
        return false;

    } else {
        emailError.textContent = "";  
        return true;
    }
}

document.getElementById('userTableRows').addEventListener('click', function(event) 
{
    if (event.target.classList.contains('action-delete')) {
        event.target.closest('tr').remove();
    }
});

function createTableRow() 
{
    //Will have to implement back end request to delete user from DB when deleting from table.
    const tbody = document.getElementById('userTableRows');
    const newRow = tbody.insertRow();

    const rowId = email.value.replace(/[^a-zA-Z0-9]/g, '-');
    newRow.id = rowId;

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = email.value
    cell2.innerHTML = firstName.value
    cell3.innerHTML = lastName.value
    cell4.innerHTML = role.value
    cell5.innerHTML = '<button class="action-delete">Delete</button>'

    addUserForm.reset();
}

addUserForm.addEventListener('submit', function(event) 
{
        event.preventDefault();
        
        const isEmailValid = checkEmail(email, emailError);
        
        const isPasswordValid = checkPassword(password, rePassword, passwordError);

        //Implement back end request to add user.
        
        if (isEmailValid && isPasswordValid) {
          createTableRow()
        }
});
