let inventory = [
    { name: "Amoxicillin", brand: "Moxatag", type: "Antibiotic", dose: "500mg", form: "Capsule", stock: 100 },
    { name: "Ibuprofen", brand: "Advil", type: "NSAID", dose: "200mg", form: "Tablet", stock: 250 },
    { name: "Acetaminophen", brand: "Tylenol", type: "Analgesic", dose: "500mg", form: "Tablet", stock: 300 },
    { name: "Lisinopril", brand: "Prinivil", type: "ACE Inhibitor", dose: "10mg", form: "Tablet", stock: 150 },
    { name: "Metformin", brand: "Glucophage", type: "Antidiabetic", dose: "850mg", form: "Tablet", stock: 200 },
    { name: "Atorvastatin", brand: "Lipitor", type: "Statin", dose: "20mg", form: "Tablet", stock: 180 },
    { name: "Omeprazole", brand: "Prilosec", type: "Proton Pump Inhibitor", dose: "40mg", form: "Capsule", stock: 140 },
    { name: "Amlodipine", brand: "Norvasc", type: "Calcium Channel Blocker", dose: "5mg", form: "Tablet", stock: 160 },
    { name: "Simvastatin", brand: "Zocor", type: "Statin", dose: "10mg", form: "Tablet", stock: 175 },
    { name: "Albuterol", brand: "Ventolin", type: "Bronchodilator", dose: "90mcg", form: "Inhaler", stock: 60 },
    { name: "Prednisone", brand: "Deltasone", type: "Corticosteroid", dose: "10mg", form: "Tablet", stock: 80 },
    { name: "Levothyroxine", brand: "Synthroid", type: "Hormone", dose: "100mcg", form: "Tablet", stock: 220 },
    { name: "Hydrochlorothiazide", brand: "Microzide", type: "Diuretic", dose: "25mg", form: "Tablet", stock: 90 },
    { name: "Losartan", brand: "Cozaar", type: "ARB", dose: "50mg", form: "Tablet", stock: 130 },
    { name: "Ciprofloxacin", brand: "Cipro", type: "Antibiotic", dose: "500mg", form: "Tablet", stock: 110 }
];

document.addEventListener("DOMContentLoaded", () => {
    renderInventory();

    document.getElementById("medForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const index = document.getElementById("medIndex").value;
        const med = {
            name: document.getElementById("medName").value,
            brand: document.getElementById("medBrand").value,
            type: document.getElementById("medType").value,
            dose: document.getElementById("medDose").value,
            form: document.getElementById("medForm").value,
            stock: parseInt(document.getElementById("medStock").value)
        };

        if (index === "") {
            inventory.push(med);
        } else {
            inventory[parseInt(index)] = med;
        }

        hideMedForm();
        renderInventory();
    });

    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("userRole");
        window.location.href = "/login.html";
    });
});

function renderInventory() {
    const tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    inventory.forEach((med, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${med.name}</td>
            <td>${med.brand}</td>
            <td>${med.type}</td>
            <td>${med.dose}</td>
            <td>${med.form}</td>
            <td>${med.stock}</td>
            <td>
                <button onclick="editMedication(${index})">Edit</button>
                <button onclick="deleteMedication(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddForm() {
    document.getElementById("medForm").reset();
    document.getElementById("formTitle").innerText = "Add Medication";
    document.getElementById("medIndex").value = "";
    document.getElementById("medFormSection").style.display = "block";
}

function hideMedForm() {
    document.getElementById("medFormSection").style.display = "none";
}

function editMedication(index) {
    const med = inventory[index];
    document.getElementById("formTitle").innerText = "Edit Medication";
    document.getElementById("medIndex").value = index;
    document.getElementById("medName").value = med.name;
    document.getElementById("medBrand").value = med.brand;
    document.getElementById("medType").value = med.type;
    document.getElementById("medDose").value = med.dose;
    document.getElementById("medForm").value = med.form;
    document.getElementById("medStock").value = med.stock;
    document.getElementById("medFormSection").style.display = "block";
}

function deleteMedication(index) {
    if (confirm("Are you sure you want to delete this medication?")) {
        inventory.splice(index, 1);
        renderInventory();
    }
}