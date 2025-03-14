
const contactForm = document.getElementById('contactForm');

//User info inputs
const DOBinput = document.getElementById('DOBinput');
const phoneInput = document.getElementById('phoneInput');
const addressInput = document.getElementById('addressInput');
const licenseInput = document.getElementById('licenseInput');

//Event messages for input 
const DOBmessage = document.getElementById('DOBmessage');
const phoneMessage = document.getElementById('phoneMessage');
const addressMessage = document.getElementById('addressMessage');
const licenseMessage = document.getElementById('licenseMessage');

const DOBerror = document.getElementById('DOBerror');

//Display user info
const DOBdisplay = document.getElementById('DOBdisplay');
const phoneDisplay = document.getElementById('phoneDisplay');
const addressDisplay = document.getElementById('addressDisplay');
const licenseDisplay = document.getElementById('licenseDisplay');
const permissionsDisplay = document.getElementById('permissionsDisplay');

//Inputs for password change
const password = document.getElementById('password');
const newPassword = document.getElementById('newPassword');
const reNewPassword = document.getElementById('reNewPassword');

//Check that DOB is in date range
function validUserDOB(date)
{
    const enteredDate = new Date(date.value);
    const year = enteredDate.getFullYear();

    if (year >= 1935 && year <= 2007)
    {
        DOBerror.textContent = "";
        DOBdisplay.textContent = date.value;
        return true;        
    
    } else {
        DOBerror.textContent = "Date of birth must be between 1935 and 2007.";
       return false;   
    }
}

//Check password matches and meets requirements.
function checkPassword(password, newPassword, reNewPassword)
{
    passwordError.textContent = '';
    
    //When back end is implemented have password variable check with password in database to proceed with function. At end of function update new password into database.

    if (newPassword.value !== reNewPassword.value) {
        passwordError.textContent = 'Passwords do not match.';
       
    } else if (newPassword.value.length < 8 || !/\d/.test(newPpassword.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
       
    } 
}

//Event listeners for message alerts
DOBinput.addEventListener('keydown', function()
{
    DOBmessage.textContent = 'Ensure that DOB ranges between 1935 and 2007.'
});

phoneInput.addEventListener('keydown', function()
{
    phoneMessage.textContent = 'Format: 123-456-7890'
});

addressInput.addEventListener('keydown', function()
{
    addressMessage.textContent = 'Format: address, city, zip code.'
});

licenseInput.addEventListener('click', function()
{
    licenseMessage.textContent = 'Note: only pharmacist users can enter a license number.'
});


contactForm.addEventListener('submit', function(event) 
{
    event.preventDefault();

    validUserDOB(DOBinput)
 
    phoneDisplay.textContent = phoneInput.value;
    
    addressDisplay.textContent = addressInput.value;

    licenseDisplay.textContent = licenseInput.value;
});

passwordForm.addEventListener('submit', function(event)
{
    event.preventDefault()
    checkPassword(password, newPassword, reNewPassword)
});

