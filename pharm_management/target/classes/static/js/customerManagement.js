//IMPORTANT
const tbody = document.getElementById("customerTable"); // ensure your HTML element has this id
const addUserForm = document.getElementById("customerForm");

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    createNewCustomer();
});

//Pass object instead of all the vars. POST function to create new cus. Catch error and display
//to user if error occurs.If success append the customer to the table.
function createNewCustomer() {                                                     
    
    fetch('/customer/createCustomer', {                                         //Endpoint that the values are sent to.                  
      method: 'POST',                                                           //POST is used for sending data to server to create a resource.
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },                                                                        //Header tells server that the request body will be in JSON format.
      body: JSON.stringify({                                                    //Convert the values to JSON format and send to endpoint.
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phoneInput").value,
        address: document.getElementById("addressInput").value,
        insurance: document.getElementById("insurance").value,
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
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.insurance}</td>
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
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }                                                          //GET is used for getting data from the server.
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

        customers.forEach(customer => {                                                 //For each user in the list, create a new row and insert the users name, email, role, and creation date.
                                                                                //Button to delete the user.
            const row = document.createElement('tr');

            //Need to add column for medications each user is taking
            row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.insurance}</td>
        `;

            tbody.appendChild(row);                                             //Append the row.

        });
    }) 
    .catch(error => {                                                           //Catch the error and display it.
        document.getElementById('errorDisplay').textContent = error.message;

    });
}

//Place customer DELETE function here.
