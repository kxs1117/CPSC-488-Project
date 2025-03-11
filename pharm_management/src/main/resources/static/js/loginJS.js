const loginForm = document.getElementById('login');
const username = document.getElementById('username');
const password = document.getElementById('password');
const usernameMessage = document.getElementById('usernameMessage');
const passwordMessage = document.getElementById('passwordMessage');

username.addEventListener('keydown', function()
{
    usernameMessage.textContent = 'Important: username requires an email format.'
});

password.addEventListener('keydown', function()
{
    passwordMessage.textContent = 'Important: Password should be 8 characters long and have a digit.'
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    window.location.href = 'home.html'; 
});

//Implement backend request call for user validation.











