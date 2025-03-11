
export function checkPassword(password, confirmPassword, passwordError)
{
    passwordError.textContent = ''; //Needed to clear any previous error messages before performing validation again.
    
    if (password.value !== confirmPassword.value) {
        passwordError.textContent = 'Passwords do not match.';
        return false;
    
    } else if (password.value.length < 8 || !/\d/.test(password.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
        return false;
    } else {
        return true;
    }
}

export function checkEmail(email, emailError)
{
    emailError.textContent = '';

    console.log('checkEmail called with:', email.value);
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
