document.addEventListener("DOMContentLoaded", loadAuditLogs);

function loadAuditLogs() {
    const auditTable = document.getElementById("auditTable");

    // Sample log data
    const logs = [
        { timestamp: "2025-03-17 10:15:00", user: "Admin", action: "Added new medication" },
        { timestamp: "2025-03-16 14:42:30", user: "Pharmacist", action: "Updated customer record" }
    ];

    logs.forEach(log => {
        let row = auditTable.insertRow();
        row.innerHTML = `<td>${log.timestamp}</td><td>${log.user}</td><td>${log.action}</td>`;
    });
}
