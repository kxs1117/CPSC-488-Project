document.addEventListener("DOMContentLoaded", () => {
    const patients = [
        {
            name: "John Doe",
            medication: "Aspirin",
            dosage: "100mg",
            quantity: 30,
            frequency: 30,
            status: "Pending",
            lastDispensed: null
        },
        {
            name: "Jane Smith",
            medication: "Metformin",
            dosage: "500mg",
            quantity: 60,
            frequency: 60,
            status: "Pending",
            lastDispensed: null
        }
    ];

    const tableBody = document.querySelector("#dispenseTable tbody");
    const form = document.getElementById("addPatientForm");

    // Modal logic
    const modal = document.getElementById("formModal");
    const openBtn = document.getElementById("openFormBtn");
    const closeBtn = document.querySelector(".close");

    openBtn.addEventListener("click", () => (modal.style.display = "block"));
    closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("patientName").value.trim();
        const med = document.getElementById("medication").value.trim();
        const dose = document.getElementById("dosage").value.trim();
        const qty = parseInt(document.getElementById("quantity").value);
        const frequency = parseInt(document.getElementById("frequency").value);

        if (name && med && dose && qty > 0 && frequency > 0) {
            patients.push({
                name,
                medication: med,
                dosage: dose,
                quantity: qty,
                frequency,
                status: "Pending",
                lastDispensed: null
            });
            form.reset();
            modal.style.display = "none";
            renderTable();
        }
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("dispenseBtn")) {
            const index = e.target.dataset.index;
            const patient = patients[index];
            const today = new Date();

            patient.status = "Dispensed";
            patient.lastDispensed = today.toISOString().split("T")[0];

            renderTable();
        }
    });

    function getNextDispenseDate(patient) {
        if (!patient.lastDispensed) return "—";
        const last = new Date(patient.lastDispensed);
        last.setDate(last.getDate() + patient.frequency);
        return last.toISOString().split("T")[0];
    }

    function renderTable() {
        // Sort by next eligible dispense date
        patients.sort((a, b) => {
            const aNext = a.lastDispensed ? new Date(a.lastDispensed) : new Date(0);
            const bNext = b.lastDispensed ? new Date(b.lastDispensed) : new Date(0);
            aNext.setDate(aNext.getDate() + a.frequency);
            bNext.setDate(bNext.getDate() + b.frequency);
            return aNext - bNext;
        });

        tableBody.innerHTML = "";
        patients.forEach((p, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${p.name}</td>
                <td>${p.medication}</td>
                <td>${p.dosage}</td>
                <td>${p.quantity}</td>
                <td>${p.frequency} days</td>
                <td>${p.lastDispensed || "—"}</td>
                <td>${getNextDispenseDate(p)}</td>
                <td class="status">${p.status}</td>
                <td>
                    <button class="dispenseBtn" data-index="${index}">
                        Dispense
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "login.html";
    });

    renderTable();
});
