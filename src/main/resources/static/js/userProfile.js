
const contactForm = document.getElementById('contactForm');


const DOBinput = document.getElementById('DOBinput');
const phoneInput = document.getElementById('phoneInput');
const addressInput = document.getElementById('addressInput');
const licenseInput = document.getElementById('licenseInput');


const DOBmessage = document.getElementById('DOBmessage');
const phoneMessage = document.getElementById('phoneMessage');
const addressMessage = document.getElementById('addressMessage');
const licenseMessage = document.getElementById('licenseMessage');

const DOBerror = document.getElementById('DOBerror');


const DOBdisplay = document.getElementById('DOBdisplay');
const phoneDisplay = document.getElementById('phoneDisplay');
const addressDisplay = document.getElementById('addressDisplay');
const licenseDisplay = document.getElementById('licenseDisplay');
const permissionsDisplay = document.getElementById('permissionsDisplay');


const password = document.getElementById('password');
const newPassword = document.getElementById('newPassword');
const reNewPassword = document.getElementById('reNewPassword');


function validUserDOB(date)
{
    const enteredDate = new Date(date.value);
    const year = enteredDate.getFullYear();

    if (year >= 1935 && year <= 2007)
    {
        DOBerror.textContent = "";
        DOBdisplay.textContent = date.value;    
    
    } else {
        DOBerror.textContent = "Date of birth must be between 1935 and 2007.";  
    }
}


function checkPassword(password, newPassword, reNewPassword)
{
    passwordError.textContent = '';
    
    

    if (newPassword.value !== reNewPassword.value) {
        passwordError.textContent = 'Passwords do not match.';
       
    } else if (newPassword.value.length < 8 || !/\d/.test(newPpassword.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
    } 
}

contactForm.addEventListener('keydown', function(event) 
{
    if (event.target.id === 'DOBinput') {
            DOBmessage.textContent = 'Ensure that DOB ranges between 1935 and 2007.'
    }   else if (event.target.id ==='phoneInput') {
            phoneMessage.textContent = 'Format: 123-456-7890'
    }   else if (event.target.id ==='addressInput') {
            addressMessage.textContent = 'Format: address, city, zip code.'
    }   else if (event.target.id ==='licenseInput') {
            licenseMessage.textContent = 'Note: only pharmacist users can enter a license number.'
    }
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

