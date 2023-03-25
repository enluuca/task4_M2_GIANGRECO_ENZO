const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let eventos = [];

async function getEvents() {
    try {
        const response = await fetch(urlAPI);
        const dataAPI = await response.json()
        console.log(dataAPI);

        for (const event of dataAPI.events) {
            eventos.push(event)
        }
        //Arrays Eventos Pasados y Eventos Futuros
        currentDate = dataAPI.currentDate
        let pastEvents = eventos.filter(eventos => eventos.date < currentDate)
        let upcomingEvents = eventos.filter(eventos => eventos.date >= currentDate)
        console.log(pastEvents);
        console.log(upcomingEvents);
        //Primera tabla con eventos funcionando
        arrayPercentage = getAttendance(pastEvents)
        printStatistics(arrayPercentage, pastEvents)


        category = getCategory(eventos);
        //Tabla Upcoming Events
        loadStatsUpComing(upcomingEvents);
        //Tabla Past Events
        loadStatsPast(pastEvents)

        //Filtro Categorias (no funciona)
        getEventsByCategory(categories, eventos)
        
        // Ingresos y Porcentajes Upcoming por evento
        revenuesUpEvents(upcomingEvents);
        porcentajesUpEvents(upcomingEvents);

        // Ingresos y Porcentajes PastEvents por evento
        revenuesPast(pastEvents)
        porcentajesPast(pastEvents)

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
function getCategory(array) {
    //Map para mostras categorias unica vez
    let categorias = array.map(lista => lista.category);
    const dataA = new Set(categorias);
    categories = [...dataA];
    //Funciona
    console.log(categories);

}

// Tabla UpcomingEvents
function loadStatsUpComing(category) {
    let container = document.getElementById("upEvents");
    let tableBodyHTML = '';
    eventos.forEach(evento => {
        let filtroEventos = getEventsByCategory(categories, eventos); // no funciona
        let revenuesEvents = revenuesUpEvents(filtroEventos)
        let porcentajeEvents = porcentajesUpEvents(filtroEventos)
        tableBodyHTML = `
        <tr>
        <td>${categories}</td>
        <td>${revenuesEvents}</td>
        <td>${porcentajeEvents}</td>
        </tr>`
    })
    container.innerHTML = tableBodyHTML
}

//Categorias incliudas en los eventos 
function getEventsByCategory(categories, eventos) {
    let categoryUnica = eventos.filter(evento => evento.category.includes(categories));
    console.log(categoryUnica);
    return categoryUnica;
}

//Upcomming Events
// Array con todos los ingresos (sin unir ingresos por categorias)
function revenuesUpEvents(array) {
    let arrayRevenues = array.map(event => {
        let resutadoRevenue = (event.estimate * event.price);
        return resutadoRevenue;
    })
    console.log(arrayRevenues);

}
function porcentajesUpEvents(array) {
    let arrayPorcentajes = array.map(event => {
        let resultadoPorcentaje = ((event.estimate / event.capacity) * 100);
        return Math.round(resultadoPorcentaje)

    })
    console.log(arrayPorcentajes);
}
// Tabla UpcomingEvents
function loadStatsPast(category) {
    let container = document.getElementById("pastEvents");
    let tableBodyHTML = '';
    eventos.forEach(evento => {
        let filtroEventos = getEventsByCategory(categories, eventos);
        let revenuesEvents = revenuesUpEvents(filtroEventos)
        let porcentajeEvents = porcentajesUpEvents(filtroEventos)
        tableBodyHTML = `
        <tr>
        <td>${categories}</td>
        <td>${revenuesEvents}</td>
        <td>${porcentajeEvents}</td>
        </tr>`
    })
    container.innerHTML = tableBodyHTML
}
//PastEvents
function revenuesPast(array) {
    let arrayRevenues = array.map(event => {
    let resutadoRevenue = (event.assistance * event.price);
        return resutadoRevenue;
    })
    console.log(arrayRevenues);

}

function porcentajesPast(array) {
    let arrayPorcentajes = array.map(event => {
        let resultadoPorcentaje = ((event.assistance / event.capacity) * 100);
        return Math.round(resultadoPorcentaje)

    })
    console.log(arrayPorcentajes);
}


