const loginForm = document.getElementById('login');
const usernameMessage = document.getElementById('usernameMessage');
const passwordMessage = document.getElementById('passwordMessage');

loginForm.addEventListener('keydown', function (event) 
{

    if (event.target.id === 'username') {
        usernameMessage.textContent = 'Important: username requires an email format.';
    } else if (event.target.id === 'password') {
        passwordMessage.textContent = 'Important: Password should be 8 characters long and have a digit.';
    }
});

loginForm.addEventListener('submit', function (event) 
{
    event.preventDefault(); 
    window.location.href = 'home.html'; 

  

});












