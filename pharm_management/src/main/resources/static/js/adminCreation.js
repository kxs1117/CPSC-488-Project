    import { checkPassword, checkEmail } from './utils.js';

    const form = document.getElementById('registrationForm');
    const email = document.getElementById('email');
    const firstName = document.getElementById('firstName');     //Use later for send request to back end.
    const lastName = document.getElementById('lastName');       //Use later for send request to back end.
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
	const emailError = document.getElementById('emailError');


    form.addEventListener('submit', function(event) {
		event.preventDefault();
		
		const isEmailValid = checkEmail(email, emailError);
		
		const isPasswordValid = checkPassword(password, confirmPassword, passwordError);
		
		if (isEmailValid && isPasswordValid) {
			
			//Redirect for now. Go back later and update with back end code.
            window.location.href = '/manageUsers.html'; 
        }
	});
