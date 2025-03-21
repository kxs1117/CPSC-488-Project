const form = document.getElementById('registrationForm');

const email = document.getElementById('email');
const emailError = document.getElementById('emailError');

const firstName = document.getElementById('firstName');     
const lastName = document.getElementById('lastName');       
    
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');
	

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


form.addEventListener('submit', function(event) 
{
	event.preventDefault();
		
	const isEmailValid = checkEmail(email, emailError);
		
	const isPasswordValid = checkPassword(password, confirmPassword, passwordError);
    
		
	if (isEmailValid && isPasswordValid) {
		
        window.location.href = 'manageUsers.html'; 
    }
});

