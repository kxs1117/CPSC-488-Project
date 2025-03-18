document.addEventListener("DOMContentLoaded", loadInventory);

function loadInventory() {
    const inventoryTable = document.getElementById("inventoryTable");
    // Sample inventory data
    const inventory = [
        { name: "Aspirin", quantity: 50, expiration: "2025-06-12" },
        { name: "Ibuprofen", quantity: 30, expiration: "2024-12-05" }
    ];
    
    inventory.forEach(item => {
        let row = inventoryTable.insertRow();
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>${item.expiration}</td>
                         <td><button onclick="removeItem(this)">Remove</button></td>`;
    });
}

function removeItem(button) {
    button.parentElement.parentElement.remove();
}

function addNewItem() {
    alert("Add new medication functionality not implemented yet!");
}
