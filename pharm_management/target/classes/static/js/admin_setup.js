document.addEventListener('DOMContentLoaded', function() {  
    const setup = document.getElementById('setup');        
  
    setup.addEventListener('submit', async function (event) {   
        event.preventDefault();                                
                                                                


                                                                                   
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;


        if (password !== confirmPassword) {             
            alert("Passwords do not match.");       
            return false;
        }


        const payload = {                           
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        };

        const response = await fetch('http://localhost:8080/setup', {       
            method: 'POST',                                                 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload) 
        });

        const data = await response.text();

        if (response.status === 200) {                        
            alert("STATUS : "+ response.status);               
            window.location.href = '/user_management.html';
        } else {
            alert("Alert developer: "+ response.status +"| Data: "+ data);

        }
    });
});