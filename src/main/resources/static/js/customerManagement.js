document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    //Put this in an object and just pass the object to the function instead of placing every var.
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phoneInput = document.getElementById("phoneInput").value;
    let addressInput = document.getElementById("addressInput").value;
    let dob = document.getElementById("dob").value;
    let insurance = document.getElementById("insurance").value;
    let insuranceNumber = document.getElementById("insuranceNumber").value;

    createNewUser(firstName, lastName, email, phoneInput, addressInput, dob, insurance, insuranceNumber);

});

//Pass object instead of all the vars. POST function to create new cus. Catch error and display
//to user if error occurs.If success append the customer to the table.
function createNewCustomer(firstName, lastName, email, phoneInput, addressInput, dob, insurance, insuranceNumber) {                                                     
    
    fetch('/customer/createCustomer', {                                         //Endpoint that the values are sent to.                  
      method: 'POST',                                                           //POST is used for sending data to server to create a resource.
      headers: {'Content-Type': 'application/json'},                            //Header tells server that the request body will be in JSON format.
      body: JSON.stringify({                                                    //Convert the values to JSON format and send to endpoint.
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneInput: phoneInput.value,
        addressInput: addressInput.value,
        dob: dob.value,
        insurance: insurance.value,
        insuranceNumber: insuranceNumber.value
      })
    })
    .then(response => {                                                         
        if (!response.ok) {                                                     //Begins promise chain where the server response is processed. response is the HTTP response object.
            return response.text().then(errorText => {                          //If the response is not ok, get the error message and throw it with the HTTP status.
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                 //If the response is succesful pass the response object to user.
    })
    .then(customer => {

        //Need to add column for medications each user is taking
        const row = document.createElement('tr');                                       //Using the user object, create a row with the following fields. Clicking delete button deletes user based on their email.
        row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.dob}</td>
            <td>${customer.addressInput}</td>
            <td>${customer.phoneInput}</td>
            <td>${customer.insurance}</td>
            <td>${customer.insuranceNumber}</td>
            <td>${customer.creationDate}</td>
        `;
        
        tbody.appendChild(row);                                                 //Append the row to the bottom of the table.
        
        addUserForm.reset();                                                    //Reset the form where the users details were submitted.

    })
    .catch(error => {                                                           //Catch and display error.
        document.getElementById('errorDisplay').textContent = error.message;
    });
}

//GET function to get all the customers. Display error if it occurs, if not retireve all the users and display in table.
function fetchCustomers() {     

    fetch('/customer/getCustomers', {                                            //Endpoint that the values are sent to.
        method: 'GET',                                                          //GET is used for getting data from the server.
    })
    .then(response => {                                                         //Begins promise chain where the server response is processed. response is the HTTP response object.
        if (!response.ok) {                                                     //If the response is not ok, get the error message and throw it with the HTTP status.
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                                 //Needed since a list of UserDTO objects is returned.
    })
    .then(customers => {                                                            //Users is the list that was passed to it.

        tbody.innerHTML ='';

        customers.forEach(customers => {                                                 //For each user in the list, create a new row and insert the users name, email, role, and creation date.
                                                                                //Button to delete the user.
            const row = document.createElement('tr');

            //Need to add column for medications each user is taking
            row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.dob}</td>
            <td>${customer.addressInput}</td>
            <td>${customer.phoneInput}</td>
            <td>${customer.insurance}</td>
            <td>${customer.insuranceNumber}</td>
            <td>${customer.creationDate}</td>
        `;

            tbody.appendChild(row);                                             //Append the row.

        });
    }) 
    .catch(error => {                                                           //Catch the error and display it.
        document.getElementById('errorDisplay').textContent = error.message;

    });
}

//Place customer DELETE function here.
