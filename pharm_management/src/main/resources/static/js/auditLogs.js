document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("userRole");
        window.location.href = "/login.html";
    });
});

function generateReport() {
    const start = new Date(document.getElementById("startDate").value);
    const end = new Date(document.getElementById("endDate").value);
    const tableBody = document.querySelector("#auditTable tbody");

    if (!start || !end || isNaN(start) || isNaN(end) || start > end) {
        alert("Please enter a valid date range.");
        return;
    }

    // Sample audit data
    const auditLogs = [
        { date: "2025-04-01", pharmacist: "Jane Doe", customer: "John Smith", medication: "Oxycodone", quantity: 60 },
        { date: "2025-04-01", pharmacist: "Jane Doe", customer: "John Smith", medication: "Oxycodone", quantity: 60 },
        { date: "2025-04-01", pharmacist: "Tom Allen", customer: "Emily Stone", medication: "Ibuprofen", quantity: 400 },
        { date: "2025-04-02", pharmacist: "Sarah Kim", customer: "Michael Ray", medication: "Paracetamol", quantity: 30 },
        { date: "2025-04-03", pharmacist: "Jane Doe", customer: "Laura Bell", medication: "Morphine", quantity: 300 }
    ];

    // Filter logs within the selected date range
    const results = auditLogs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= start && logDate <= end;
    });

    tableBody.innerHTML = "";

    results.forEach((log, index, arr) => {
        let status = "Normal";

        // Detect suspicious duplicates (same day, same person, same medication)
        const isDuplicate = arr.findIndex(l =>
            l !== log &&
            l.date === log.date &&
            l.customer === log.customer &&
            l.medication === log.medication
        ) !== -1;

        // Flag high quantity medications
        if (log.quantity > 100) status = "High quantity dispensed";
        if (isDuplicate) status = "Duplicate dispensing";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${log.date}</td>
            <td>${log.pharmacist}</td>
            <td>${log.customer}</td>
            <td>${log.medication}</td>
            <td>${log.quantity}</td>
            <td style="color: ${status === 'Normal' ? 'black' : 'red'}">${status}</td>
        `;
        tableBody.appendChild(row);
    });
}