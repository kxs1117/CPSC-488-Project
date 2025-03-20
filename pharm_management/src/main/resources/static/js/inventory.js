
const drug = document.getElementById('drug');

const brand = document.getElementById('brand');

const type = document.getElementById('type');

const dose = document.getElementById('dose');

const dateAdded = document.getElementById('dateAdded');

const expiration = document.getElementById('expiration');

const amount = document.getElementById('amount');

const cost = document.getElementById('cost');

const reLevel = document.getElementById('reLevel');

const tbody = document.getElementById('inventoryTable');

const addMed = document.getElementById('addmed')





function createTableRow() {

    const newRow = tbody.insertRow();
    
    newRow.innerHTML = `<td>${drug.value}</td>
                        <td>${brand.value}</td>
                        <td>${type.value}</td>
                        <td>${dose.value}</td>
                        <td>${dateAdded.value}</td>
                        <td>${expiration.value}</td>
                        <td>${amount.value}</td>
                        <td>${cost.value}</td>
                        <td>${reLevel.value}</td>
                        <td><button class="delete">Delete</button></td>`;
    addMed.reset();
}


tbody.addEventListener('click', function(event) 
{
    if (event.target.classList.contains('delete')) {
        event.target.closest('tr').remove();
    }
});

addMed.addEventListener('submit', function(event)
{
    event.preventDefault();

    createTableRow();
});    

















