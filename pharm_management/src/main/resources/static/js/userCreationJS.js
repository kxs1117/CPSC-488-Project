import { checkPassword, checkEmail } from './utils.js';

const addUserForm = document.getElementById('addUser');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const role = document.getElementById('role');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const table = document.getElementById('userTable');


document.getElementById('userTableRows').addEventListener('click', function(event) {
    if (event.target.classList.contains('action-delete')) {
        event.target.closest('tr').remove();
    }
});

function createTableRow() {
    
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

    addUserForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isEmailValid = checkEmail(email, emailError);
        
        const isPasswordValid = checkPassword(password, rePassword, passwordError);

        
            if(!isPasswordValid) return alert('Please check your password!')
        
        if (isEmailValid && isPasswordValid) {
          createTableRow()
        }
});