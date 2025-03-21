document.addEventListener("DOMContentLoaded", loadCustomers);

function loadCustomers() {
    const customerTable = document.getElementById("customerTable");

    
    const customers = [
        { firstName: "John", lastName: "Doe", dob: "1990-05-22", meds: "Nexium, Gabapentin", insurance: "Aetna Medicare Advantage"},
        { firstName: "Jane", lastName: "Smith", dob: "2000-10-15", meds: "Prednisone", insurance: "UPMC For You" }
    ];

    customers.forEach(customer => {
        addCustomerToTable(customer.firstName, customer.lastName, customer.dob, customer.meds, customer.insurance);
    });
}

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let dob = document.getElementById("dob").value;
    let meds = document.getElementById("meds").value;
    let insurance = document.getElementById("insurance").value;

    addCustomerToTable(firstName, lastName, dob, meds, insurance);
});

function addCustomerToTable(firstName, lastName, dob, meds, insurance) {
    const customerTable = document.getElementById("customerTable");
    let row = customerTable.insertRow();
    row.innerHTML = `<td>${firstName}</td> 
                     <td>${lastName}</td>
                     <td>${dob}</td>
                     <td>${meds}</td>
                     <td>${insurance}</td>
                     <td><button onclick="removeCustomer(this)">Remove</button></td>`;
}

function removeCustomer(button) {
    button.parentElement.parentElement.remove();
}
