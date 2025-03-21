document.addEventListener("DOMContentLoaded", loadChart);

function loadChart() {
    const ctx = document.getElementById("dispensingChart").getContext("2d");

    const data = {
        labels: ["Aspirin", "Ibuprofen", "Amoxicillin", "Metformin"],
        datasets: [{
            label: "Medications Dispensed",
            data: [150, 90, 120, 80],
            backgroundColor: ["blue", "green", "red", "orange"]
        }]
    };

    new Chart(ctx, {
        type: "bar",
        data: data
    });
}
