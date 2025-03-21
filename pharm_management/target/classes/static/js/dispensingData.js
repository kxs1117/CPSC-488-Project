

document.addEventListener("DOMContentLoaded", function () {
    const dispensingTable = document.getElementById("dispensingTable");


    const prescriptions = [
        { id: 1, patient: "John Doe", medication: "Aspirin", dosage: "100mg", quantity: 30, status: "Pending" },
        { id: 2, patient: "Jane Smith", medication: "Metformin", dosage: "500mg", quantity: 60, status: "Pending" },
        { id: 3, patient: "Mark Johnson", medication: "Ibuprofen", dosage: "200mg", quantity: 20, status: "Pending" }
    ];


    function loadDispensingData() {
        dispensingTable.innerHTML = ""; 
        prescriptions.forEach(prescription => {
            let row = dispensingTable.insertRow();
            row.innerHTML = `
                <td>${prescription.patient}</td>
                <td>${prescription.medication}</td>
                <td>${prescription.dosage}</td>
                <td>${prescription.quantity}</td>
                <td id="status-${prescription.id}">${prescription.status}</td>
                <td><button onclick="dispenseMedication(${prescription.id})" id="btn-${prescription.id}">Dispense</button></td>
            `;
        });
    }


    window.dispenseMedication = function (id) {
        let prescription = prescriptions.find(p => p.id === id);
        if (prescription && prescription.status === "Pending") {
            prescription.status = "Dispensed";
            document.getElementById(`status-${id}`).innerText = "Dispensed";
            document.getElementById(`btn-${id}`).disabled = true;
            alert(`Medication for ${prescription.patient} has been dispensed.`);
        }
    };

  
    loadDispensingData();
});
