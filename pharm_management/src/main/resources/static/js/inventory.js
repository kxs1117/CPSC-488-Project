//Page and code is a mess. Go back and refactor and reorganize.

//Need DOM loaded here for GET fetch function.
const medicationForm = document.getElementById('medForm');
const tbody = document.getElementById('tbody');


function showAddForm() {                                                 //showAddForm is the onClick attribute of a button on page that when clicked makes the form appear.                                        
    document.getElementById("medForm").reset();                          //Clears any previous input in the form.
    document.getElementById("formTitle").innerText = "Add Medication";   //The text in the title form that pops up in the webpage.
    document.getElementById("medFormSection").style.display = "block";   //Finds DIV with medFormSection and sets it to block which makes it appear on the 
}

function editMedication(id, row) {
    document.getElementById("medForm").reset();
    document.getElementById("formTitle").innerText = "Edit Medication";
    document.getElementById("medFormSection").style.display = "block";

    const cells = row.querySelectorAll('td');

    const fields = [
        'medName',           
        'medBrand',         
        'medType',         
        'medDose',           
        'medFormField',      
        'medDateAdded',      
        'medExpirationDate', 
        'medStock',          
        'medCostPerPill'     
    ];

    // Loop through the fields array and populate each form input with the corresponding cell value.
    fields.forEach((fieldId, index) => {
        document.getElementById(fieldId).value = cells[index].innerText;
    });

    
}

tbody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.med;
        deleteMed(id, event.target);
    }
    if (event.target.classList.contains('edit-btn')) {
        const id = event.target.dataset.med;
        const row = event.target.closest('tr');
        editMedication(id, row);
    }
});

medicationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (medication.id) {
        updateMed(medication);
    } else {
        addMed(medication);
    }
});

function hideMedForm() {                                                //Hide the form for adding a new med
    document.getElementById("medFormSection").style.display = "none";
}   

function addNewMed() {
    fetch('/manageInv/addMed', {
        method: 'POST',             //HERE
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("medName").value,
            brand: document.getElementById("medBrand").value,
            type: document.getElementById("medType").value,
            dose: document.getElementById("medDose").value,
            medForm: document.getElementById("medicationForm").value,
            expirationDate: document.getElementById("expire").value,
            stock: document.getElementById("medStock").value,
            costPerPill: parseFloat(document.getElementById("cost").value)
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();
    })
    .then(med => {
        const tbody = document.querySelector("#inventoryTable tbody");
        const row = document.createElement('tr');
        row.id = `med-${med.id}`;
        row.innerHTML = `
            <td>${med.name}</td>
            <td>${med.brand}</td>
            <td>${med.type}</td>
            <td>${med.dose}</td>
            <td>${med.medForm}</td>
            <td>${med.dateAdded}</td>
            <td>${med.expirationDate}</td>
            <td>${med.stock}</td>
            <td>${med.costPerPill}</td>
            <td>
                <button class="edit-btn" data-med="${med.id}">Edit</button>
                <button class="delete-btn" data-med="${med.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
        document.getElementById("medForm").reset();
        hideMedForm();
    })
    .catch(error => {
        document.getElementById('errorDisplay').textContent = error.message;
    });
}


function loadInventory() {
    fetch('/manageInv/getMeds', {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();
    })
    .then(meds => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = '';
        meds.forEach(med => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${med.name}</td>
                <td>${med.brand}</td>
                <td>${med.type}</td>
                <td>${med.dose}</td>
                <td>${med.medForm}</td>
                <td>${med.dateAdded}</td>
                <td>${med.expirationDate}</td>
                <td>${med.stock}</td>
                <td>${med.costPerPill}</td>
                <td>
                    <button class="edit-btn" data-med="${med.id}">Edit</button>
                    <button class="delete-btn" data-med="${med.id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        document.getElementById('errorDisplay').textContent = error.message;
    });
}

function deleteMed(id, buttonElement) {
    fetch(`/manageInv/deleteMed/${id}`, 
    { method: 'DELETE' })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        const row = buttonElement.closest('tr');
        row.remove();
    })
    .catch(error => {
        document.getElementById('errorDisplay').textContent = error.message;
    });
}


function updateMed() {
    fetch(`/manageInv/updateMed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(

            name: document.getElementById("medName").value,
            brand: document.getElementById("medBrand").value,
            type: document.getElementById("medType").value,
            dose: document.getElementById("medDose").value,
            medForm: document.getElementById("medicationForm").value,
            expirationDate: document.getElementById("expire").value,
            stock: document.getElementById("medStock").value,
            costPerPill: parseFloat(document.getElementById("cost").value)


        )
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        } 
        return response.json();
    })
    .then(updatedMed => {
        const row = document.getElementById(`med-${updatedMed.id}`);
        if (row) {
            row.innerHTML = `
                <td>${updatedMed.name}</td>
                <td>${updatedMed.brand}</td>
                <td>${updatedMed.type}</td>
                <td>${updatedMed.dose}</td>
                <td>${updatedMed.form}</td>
                <td>${updatedMed.dateAdded}</td>
                <td>${updatedMed.expirationDate}</td>
                <td>${updatedMed.stock}</td>
                <td>${updatedMed.costPerPill}</td>
                <td>
                    <button class="edit-btn" data-med="${updatedMed.id}">Edit</button>
                    <button class="delete-btn" data-med="${updatedMed.id}">Delete</button>
                </td>
            `;
        }
        hideMedForm();
        document.getElementById("medForm").reset();
    })
    .catch(error => {
        document.getElementById('errorDisplay').textContent = error.message;
    });
}
