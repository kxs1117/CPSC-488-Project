document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addMedForm');
    const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');

    let editMode = false;
    let editId = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            brand: document.getElementById('brand').value,
            medForm: document.getElementById('medForm').value,
            dose: document.getElementById('dose').value,
            expirationDate: document.getElementById('expirationDate').value,
            dateAdded: document.getElementById('dateAdded').value,
            stock: document.getElementById('stock').value,
            costPerPill: document.getElementById('costPerPill').value
        };

        try {
            if (editMode) {
                await fetch(`/api/inventory/update/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                editMode = false;
                editId = null;
            } else {
                await fetch('/api/inventory/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
            form.reset();
            loadInventory();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function loadInventory() {
        inventoryTable.innerHTML = '';
        const res = await fetch('/api/inventory/all');
        const meds = await res.json();

        meds.forEach(med => {
            const row = inventoryTable.insertRow();
            row.insertCell(0).innerText = med.name;
            row.insertCell(1).innerText = med.type;
            row.insertCell(2).innerText = med.brand;
            row.insertCell(3).innerText = med.medForm;
            row.insertCell(4).innerText = med.dose;
            row.insertCell(5).innerText = med.expirationDate;
            row.insertCell(6).innerText = med.dateAdded;
            row.insertCell(7).innerText = med.stock;
            row.insertCell(8).innerText = med.costPerPill;

            const actionsCell = row.insertCell(9);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => {
                document.getElementById('name').value = med.name;
                document.getElementById('type').value = med.type;
                document.getElementById('brand').value = med.brand;
                document.getElementById('medForm').value = med.medForm;
                document.getElementById('dose').value = med.dose;
                document.getElementById('expirationDate').value = med.expirationDate;
                document.getElementById('dateAdded').value = med.dateAdded;
                document.getElementById('stock').value = med.stock;
                document.getElementById('costPerPill').value = med.costPerPill;
                editMode = true;
                editId = med.id;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', async () => {
                await fetch(`/api/inventory/delete/${med.id}`, { method: 'DELETE' });
                loadInventory();
            });

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        });
    }

    loadInventory();
});
