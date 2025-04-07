//IMPORTANT
const tbody = document.getElementById("customerTable");
const addUserForm = document.getElementById("customerForm");

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    createNewCustomer();
});

//Pass object instead of all the vars. POST function to create new cus. Catch error and display
//to user if error occurs.If success append the customer to the table.
function createNewCustomer() {                                                     
    
    fetch('/customer/createCustomer', {                                             
      method: 'POST',                                                          
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },                                                                     
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
            return response.text().then(errorText => {                          
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                         
    })
    .then(customer => {

        //Need to add column for medications each user is taking
        const row = document.createElement('tr');                                    
        row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.insurance}</td>
        `;
        tbody.appendChild(row);                    
        
        addUserForm.reset();                                

    })
    .catch(error => {                                          
        document.getElementById('errorDisplay').textContent = error.message;
    });
}

//GET function to get all the customers. Display error if it occurs, if not retireve all the users and display in table.
function fetchCustomers() {     

    fetch('/customer/getCustomers', {                                      
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }                                               
    })
    .then(response => {                                                         //Begins promise chain where the server response is processed. response is the HTTP response object.
        if (!response.ok) {                                        
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();                                              
    })
    .then(customers => {                                                          
 
        tbody.innerHTML ='';

        customers.forEach(customer => {                                                 //For each user in the list, create a new row and insert the users name, email, role, and creation date.
                                                                               
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

            tbody.appendChild(row);                                            

        });
    }) 
    .catch(error => {                                                        
        document.getElementById('errorDisplay').textContent = error.message;

    });
}

//Place customer DELETE function here.
