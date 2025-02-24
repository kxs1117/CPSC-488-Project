document.addEventListener('DOMContentLoaded', () => {     
    const setup = document.getElementById('setup');        
  
    setup.onsubmit = async (event) => {
        event.preventDefault();
          
        //Ensure the given passwords match and meet necessary requirements
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password.length < 8 || !/\d/.test(password) || password !== confirmPassword) {
            alert('Please try a new password that follows the given password rules.');
            return;
        }

        //Data for backend admin setup
        const data = {
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            password: password
        };
    
        try {
            //Send the data to backend
            const response = await fetch('/setup', {       
            method: 'POST',                                                 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)  
            });

            const result = await response.text();   

            if (response.ok) {   
                //Redirect if succesful                           
                window.location.href = '/user_management.html';
           
            } else {
                //Server side errors
                console.log(result);
                alert("There was a server error");
            }
        
        } catch (err) {
            //Network error
            console.error('Error: ', err);
            alert("A network error occured");
        }
    };
});


