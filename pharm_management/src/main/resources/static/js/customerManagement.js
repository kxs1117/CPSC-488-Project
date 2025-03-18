document.addEventListener("DOMContentLoaded", loadCustomers);

function loadCustomers() {
    const customerTable = document.getElementById("customerTable");

    // Sample customer data
    const customers = [
        { firstName: "John", lastName: "Doe", dob: "1990-05-22" },
        { firstName: "Jane", lastName: "Smith", dob: "1985-11-12" }
    ];

    customers.forEach(customer => {
        addCustomerToTable(customer.firstName, customer.lastName, customer.dob);
    });
}

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let dob = document.getElementById("dob").value;

    addCustomerToTable(firstName, lastName, dob);
});

function addCustomerToTable(firstName, lastName, dob) {
    const customerTable = document.getElementById("customerTable");
    let row = customerTable.insertRow();
    row.innerHTML = `<td>${firstName} ${lastName}</td><td>${dob}</td>
                     <td><button onclick="removeCustomer(this)">Remove</button></td>`;
}

function removeCustomer(button) {
    button.parentElement.parentElement.remove();
}
