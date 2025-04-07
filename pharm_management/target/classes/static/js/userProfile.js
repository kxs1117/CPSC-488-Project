const contactForm = document.getElementById('contactForm');

document.addEventListener('DOMContentLoaded', function() {
    fetchUserInfo();
});

function fetchUserInfo() {     
    fetch('/userProfile/getUserInfo', {                                 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
    })
    .then(response => {                                                        
        if (!response.ok) {                                                    
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                               
    })
    .then(userInfo => {
        document.getElementById('DOBdisplay').textContent = userInfo.dateOfBirth;
        document.getElementById('phoneDisplay').textContent = userInfo.phone;
        document.getElementById('addressDisplay').textContent = userInfo.address;
    })
    .catch(error => {                                                           
        document.getElementById('backEndErr').textContent = error.message;
    });
}



contactForm.addEventListener('keydown', function(event) 
{
    if (event.target.id === 'DOBinput') {
        document.getElementById('DOBmessage').textContent = 'Ensure that DOB ranges between 1935 and 2007.';
    } else if (event.target.id === 'phoneInput') {
        document.getElementById('phoneMessage').textContent = 'Format: 123-456-7890';
    } else if (event.target.id === 'addressInput') {
        document.getElementById('addressMessage').textContent = 'Format: address, city, zip code.';
    } else if (event.target.id === 'licenseInput') {
        document.getElementById('licenseMessage').textContent = 'Note: only pharmacist users can enter a license number.';
    } 
});

function validUserDOB()
{
    const DOBerror = document.getElementById('DOBerror');
    const enteredDate = new Date(document.getElementById('DOBinput').value);
    const year = enteredDate.getFullYear();

    if (year >= 1935 && year <= 2007)
    {
        DOBerror.textContent = "";
        return true;                            
    } else {
        DOBerror.textContent = "Date of birth must be between 1935 and 2007.";
        return false;  
    }
}

contactForm.addEventListener('submit', function(event) 
{  
    event.preventDefault();

    if (validUserDOB()) 
    {
        updateContactInfo()
    }
});

//Watched and read some tutorials on fetch PATCH and couldn't get it to work properly so just use this scuffed format:
function updateContactInfo() {
   
    fetch('/manageUsers/updateUser', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            dateOfBirth: document.getElementById('DOBinput').value,
            phoneNumber: document.getElementById('phoneInput').value,
            address: document.getElementById('addressInput').value
        })
    })
    .then(response => {                                                        
        if (!response.ok) {                                                    
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                               
    })
    .then(userUpdated => {

        if (userUpdated.dateOfBirth.trim() !== "") 
        {
            document.getElementById('DOBdisplay').textContent = userUpdated.dateOfBirth;
        }

        if (userUpdated.phoneNumber.trim() !== "")
        {
            document.getElementById('phoneDisplay').textContent = userUpdated.phoneNumber;
        }

        if (userUpdated.address.trim() !== "")
        {
            document.getElementById('phoneDisplay').textContent = userUpdated.address;
        }
    })
    .catch(error => {                                                           
        document.getElementById('updateInfoErr').textContent = error.message;
    });
}



passwordForm.addEventListener('submit', function(event)
{
    event.preventDefault()
    checkPassword()
    updatePassword()
});

function checkPassword()
{                                                                     
    const newPassword = document.getElementById('newPassword');
    const reNewPassword = document.getElementById('reNewPassword');
    const passwordError = document.getElementById('passwordError');
    
    if (newPassword.value !== reNewPassword.value) {
        passwordError.textContent = 'Passwords do not match.';
        return false;
       
    } else if (newPassword.value.length < 8 || !/\d/.test(newPpassword.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
        return false;

    } else {
        passwordError.textContent = '';
        return true;
    }
}

function updatePassword() {
   
    fetch('/manageUsers/updatePassword', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            password: document.getElementById('password'),  
            passwordNew: document.getElementById('reNewPassword')
        })
    })
    .then(response => {                                                        
        if (!response.ok) {                                                    
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        document.getElementById('updatePassErr').textContent = "Password change succesful!";
                                   
    })
    .catch(error => {                                                           
        document.getElementById('updatePassErr').textContent = error.message;
    });
}