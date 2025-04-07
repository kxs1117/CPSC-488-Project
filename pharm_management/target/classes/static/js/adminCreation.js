//Refernces: MDN Web Docs, jasonwatmore, youngmonkeys, Spring Cloud,

//Since this page is simple/straightforward and the vars are used in multiple functions just leave them as global for now.
const form = document.getElementById('registrationForm');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const firstName = document.getElementById('firstName');     
const lastName = document.getElementById('lastName');       
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');
	
//Check password that user has given. Disable for presentation so demo back-end backup function can be shown
function checkPassword()
{
    if (password.value !== confirmPassword.value) {
        passwordError.textContent = 'Passwords do not match.';
        return false;

    } else if (password.value.length < 8 || !/\d/.test(password.value)) {
        passwordError.textContent = 'Please ensure that the password is eight characters long and contains at least one digit.';
        return false;
        
    } else {
        passwordError.textContent = ''; //Clear the error text if it exist and the password is correct.
        return true;
    }
}
 
//Check email format that user has given is correct. Disable for presentation so demo back-end backup function can be shown
function checkEmail()
{
    const regex = /@.*\.(com|net|org|gov|edu|mil)$/;
    
    if (!regex.test(email.value)) {
        emailError.textContent = "Please enter a valid email address (must include '@' and a valid domain).";
        return false;
        
    } else {
        emailError.textContent = "";    //Clear the error text if it exist and the email is correct. 
        return true;
    }
}

/*POST fetch function to create the admin user and store it in database.Returns error if 
there is a formatting error or if a database error occurs and alerts the user on the screen.
If the reponse is ok, redirect the new admin to user creation page.*/

function createAdmin()  
{
    fetch('/admin/create_admin', {                          //Endpoint that the values are sent to.
        method: 'POST',                                     //POST is used for sending data to server to create a resource.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },                                                  //Header tells server that the request body will be in JSON format. Needed or POST cant work.
        body: JSON.stringify({                              //Convert the values to JSON format and send to endpoint.
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value
        })
    })
    .then(response => {                                                     //Begins promise chain where the server response is processed. response is in a JSON format.
        if (!response.ok) {                                                 //If the response is not ok, get the error message and throw it with the HTTP status.
            return response.json().then(error => {                          
                throw new Error(`Error ${response.status}: ${error.Error1 || error.Error2}`);   //Error1 is the message of IllegalArgumentException and error2 is the message of DataAccessException.
            });
        }                       
        window.location.href = '/manageUsers.html';
    })
    .catch(error => {
        document.getElementById('error').textContent = error.message;
    });
}

//Event listener to submit info to back end via POST function. Disabled JS email and password functions for back-end function demo.
form.addEventListener('submit', function(event) 
{
	event.preventDefault(); //prevent that automatic submission and page refresh, so you can handle the submission manually
	
	/*const isEmailValid = checkEmail(email, emailError);
	const isPasswordValid = checkPassword(password, confirmPassword, passwordError);
    (isEmailValid && isPasswordValid) {}*/
    
    createAdmin(); 
});


    
    