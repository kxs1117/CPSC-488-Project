const dateElement = document.getElementById('date');
const mainContainer = document.getElementById('main')

function displayDate()
{
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 		"November", "December"]

    const date = new Date()

    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    dateElement.textContent = `${months[month]} ${day}, ${year}`
    
}



displayDate();

