document.addEventListener("DOMContentLoaded", () => {
    const patients = [];

    const tableBody = document.querySelector("#dispenseTable tbody");
    const form = document.getElementById("addPatientForm");

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
        const medication = document.getElementById("medication").value.trim();
        const dosage = document.getElementById("dosage").value.trim();
        const quantity = parseInt(document.getElementById("quantity").value, 10);
        const frequency = parseInt(document.getElementById("frequency").value, 10);

        if (name && medication && dosage && quantity > 0 && frequency > 0) {
            patients.push({
                name,
                medication,
                dosage,
                quantity,
                frequency,
                status: "Pending",
                lastDispensed: null
            });
            form.reset();
            modal.style.display = "none";
            renderTable();
        }
    });

    tableBody.addEventListener("click", async (e) => {
        if (e.target.classList.contains("dispenseBtn")) {
            const index = e.target.dataset.index;
            const patient = patients[index];
            const today = new Date();

            const requestData = {
                customerEmail: patient.name.toLowerCase().replace(/\s+/g, ".") + "@example.com",
                medicationName: patient.medication,
                quantity: patient.quantity,
                lastDispensed: patient.lastDispensed
            };

            try {
                const res = await fetch("/api/dispense/evaluateFraud", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                if (!res.ok) throw new Error("Fraud detection service failed.");
                const result = await res.json();

                if (result.totalScore > 0) {
                    alert(`FRAUD DETECTED:\n${result.reasons.join("\n")}`);
                } else {
                    alert("No fraud detected.");

                    // Dispense Medication if no fraud
                    const dispenseRes = await fetch("/api/dispense/dispenseMedication", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(requestData)
                    });

                    if (!dispenseRes.ok) {
                        const errMessage = await dispenseRes.text();
                        throw new Error(errMessage);
                    }
                    alert(await dispenseRes.text());

                    patient.status = "Dispensed";
                    patient.lastDispensed = today.toISOString().split("T")[0];
                    renderTable();
                }
            } catch (err) {
                alert("Error: " + err.message);
            }
        }
    });

    function getNextDispenseDate(patient) {
        if (!patient.lastDispensed) return "—";
        const last = new Date(patient.lastDispensed);
        last.setDate(last.getDate() + patient.frequency);
        return last.toISOString().split("T")[0];
    }

    function renderTable() {
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
