const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let eventos = [];
let currentDate = "";


const UPCAT = document.getElementById("upEvents");
const PASTCAT = document.getElementById("pastEvents");


async function getEvents() {
    try {
        const response = await fetch(urlAPI);
        const dataAPI = await response.json()
        //console.log(dataAPI);

        for (const event of dataAPI.events) {
            eventos.push(event)
        }
        //Arrays Eventos Pasados y Eventos Futuros
        currentDate = dataAPI.currentDate
        let pastEvents = eventos.filter(eventos => eventos.date < currentDate)
        let upcomingEvents = eventos.filter(eventos => eventos.date >= currentDate)
       // console.log(pastEvents);
       // console.log(upcomingEvents);
        //Primera tabla con eventos funcionando
        arrayPercentage = getAttendance(pastEvents)
        printStatistics(arrayPercentage, pastEvents)

        getCategories(eventos)
        upCategoriesStats(eventos)
        pastCategoriesStats(eventos)


        //Tabla Upcoming Events

    } catch (error) {
        console.log(error.message);
    }
}
getEvents()


//Primer tabla
function getAttendance(array) {
    array = array.map(element => {
        percentage = (element.assistance) * 100 / element.capacity
        return percentage
    })
    return array
}
function printStatistics(percentages, events) {
    let tableStats = document.getElementById("statiscs")
    //Busco mayor y menor en porcentajes
    let min = Math.min(...percentages)
    let max = Math.max(...percentages)

    //Posiciones en array
    let indexMax = percentages.indexOf(max)
    let indexMin = percentages.indexOf(min)

    //Capacidades de eventos 
    capacity = events.map(element => {
        return element.capacity
    })
    //MAyor capacidad y busco en array
    let capacityMax = Math.max(...capacity)
    let indexCapacity = capacity.indexOf(capacityMax)

    tableStats.innerHTML = `

    <td class="highestpercentage"> ${events[indexMax].name} (${max}) </td>
    <td class="lowestCap">${events[indexMin].name} (${min}) </td>
    <td class="largerCap">${events[indexCapacity].name} (${capacityMax}) </td>
        
     `
}

//Traer categorias
function getCategories(eventos) {
    let categories = [];
    eventos.forEach(event => {
        if (!categories.includes(event.category)) {
            categories.push(event.category);
        }

    });
    //console.log(categories);
    return categories.sort();
}
//Filtrar eventos por categorias
function getEventsByCategory(category, eventos) {
    return eventos.filter(event => event.category.includes(category));
}


//Porcentaje de asistencia eventos (Pasados)
function getPastAttendanceByCategory(eventsByCategory) {
    let attandeance = 0;
    eventsByCategory.forEach(event => {
        attandeance += (event.assistance / event.capacity) * 100;
    });
    attandeance = (attandeance / eventsByCategory.length).toFixed(2);
    return attandeance;
}
// Ganancias de eventos por categorias (Pasados)
function getPastRevenuesByCategory(eventsByCategory) {
    let revenues = 0;
    eventsByCategory.forEach(event => {
        revenues += (event.assistance * event.price);
    });
    revenues = Math.trunc(revenues);
    return revenues;
}

function pastCategoriesStats(eventos) {
    let pastEvents = eventos.filter(event => event.date < currentDate);
    let arrayCategories = getCategories(pastEvents);
    let body = ``;
    arrayCategories.forEach(category => {
        let eventsByCat = getEventsByCategory(category, pastEvents);
        let pastRevenuesByCategory = getPastRevenuesByCategory(eventsByCat);
        let atByCat = getPastAttendanceByCategory(eventsByCat);
        body += ` 
            <tr>
                <td>${category}</td>
                <td class="stats">$${pastRevenuesByCategory}</td>
                <td class="stats">${atByCat}%</td>
            </tr>
        `;
    })
    PASTCAT.innerHTML = body;
}


// Asistencia de eventos por categorias (Futuros)
function getUpAttendanceByCategory(eventsByCategory) {
    let attandeance = 0;
    eventsByCategory.forEach(event => {
        attandeance += (event.estimate / event.capacity) * 100;
    });
    attandeance = (attandeance / eventsByCategory.length).toFixed(2);
    return attandeance;
}
// Ganancias de eventos por categorias (Futuros)
function getUpRevenuesByCategory(eventsByCategory) {
    let revenues = 0;
    eventsByCategory.forEach(event => {
        revenues += (event.estimate * event.price);
    });
    revenues = Math.trunc(revenues);
    return revenues;
}

function upCategoriesStats(eventos) {
    let upEvents = eventos.filter(event => event.date > currentDate);
    let arrayCategories = getCategories(upEvents);
    let body = ``;
    arrayCategories.forEach(category => {
        let eventsByCat = getEventsByCategory(category, upEvents);
        let upRevByCat = getUpRevenuesByCategory(eventsByCat);
        let atByCat = getUpAttendanceByCategory(eventsByCat);
        body += ` 
            <tr>
                <td>${category}</td>
                <td class="stats">$${upRevByCat}</td>
                <td class="stats">${atByCat}%</td>
            </tr>
        `;
    })
    UPCAT.innerHTML = body;
}