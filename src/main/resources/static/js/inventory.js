//Page and code is a mess. Go back and refactor and reorganize.

document.addEventListener("DOMContentLoaded", () => {
    const medForm = document.getElementById("medForm");
    const tbody = document.querySelector("#inventoryTable tbody");


    medForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const medication = {
          
            id: document.getElementById("medId").value,  
            name: document.getElementById("medName").value,
            brand: document.getElementById("medBrand").value,
            type: document.getElementById("medType").value,
            dose: document.getElementById("medDose").value,
            form: document.getElementById("medicationForm").value,
            expirationDate: document.getElementById("expire").value,
            stock: parseInt(document.getElementById("medStock").value),
            costPerPill: parseFloat(document.getElementById("cost").value)
        };

        if (medication.id) {
         
            updateMed(medication);
        } else {
           
            addMed(medication);
        }
    });

  
    tbody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.med;
            deleteMed(id, event.target);
        }
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.dataset.med;
            editMedication(id);
        }
    });

 
    loadInventory();
    hideMedForm();
});


function addMed(medication) {
    fetch('/manageInv/addMed', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(medication) 
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
        row.id = `med-${med.id}`
        row.innerHTML = `
            <td>${med.name}</td>
            <td>${med.brand}</td>
            <td>${med.type}</td>
            <td>${med.dose}</td>
            <td>${med.form}</td>
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
    fetch('/manageInv/getMeds', 
    { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Error ${response.status}: ${errorText}`);
            });
        }
        return response.json();
    })
    .then(meds => {
        const tbody = document.querySelector("#inventoryTable tbody");
        tbody.innerHTML = '';
        meds.forEach(med => {
            const row = document.createElement('tr');
            row.id = `med-${med.id}`
            row.innerHTML = `
                <td>${med.name}</td>
                <td>${med.brand}</td>
                <td>${med.type}</td>
                <td>${med.dose}</td>
                <td>${med.form}</td>
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

function updateMed(medication) {
    fetch(`/manageInv/updateMed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medication)
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

function editMedication(id) {
    
    document.getElementById("medForm").reset();
    document.getElementById("medId").value = id;
    document.getElementById("medFormSection").style.display = "block";
}

function showAddForm() {
    document.getElementById("medForm").reset();
    document.getElementById("formTitle").innerText = "Add Medication";
    document.getElementById("medId").value = "";
    document.getElementById("medFormSection").style.display = "block";
}

function hideMedForm() {
    document.getElementById("medFormSection").style.display = "none";
}


//Used to log out. Dashboard button doesn't work.
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("userRole");
    window.location.href = "/login.html";
});
