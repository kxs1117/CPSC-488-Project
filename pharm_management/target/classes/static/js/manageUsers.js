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

function checkPassword(password, confirmPassword, passwordError)
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

function checkEmail(email, emailError)
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

function createTableRow() {
    const newRow = userTableRows.insertRow();
    
    newRow.innerHTML = `<td>${email.value}</td>
                        <td>${firstName.value}</td>
                        <td>${lastName.value}</td>
                        <td>${role.value}</td>
                        <td><button class="delete">Delete</button></td>`;
    
    addUserForm.reset();
}

userTableRows.addEventListener('click', function(event) 
{
    if (event.target.classList.contains('delete')) {
        event.target.closest('tr').remove();
    }
});

addUserForm.addEventListener('submit', function(event) 
{
        event.preventDefault();
        
        const isEmailValid = checkEmail(email, emailError);
        
        const isPasswordValid = checkPassword(password, rePassword, passwordError);

       
        
        if (isEmailValid && isPasswordValid) {
          createTableRow()
        }
});
