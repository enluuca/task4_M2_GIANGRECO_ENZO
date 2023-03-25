const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let eventos = [];
let currentDate = ''



async function getEvents() {
    try {
        const response = await fetch(urlAPI);
        const dataAPI = await response.json()
        console.log(dataAPI);

        for (const event of dataAPI.events) {
            eventos.push(event)
        }

        currentDate = dataAPI.currentDate
        let pastEvents = eventos.filter(eventos => eventos.date < currentDate)
        let upcomingEvents = eventos.filter(eventos => eventos.date >= currentDate)
        console.log(pastEvents);
        console.log(upcomingEvents);




        console.log(eventos);
        traerEventos(pastEvents)
        crearCheckboxes(pastEvents)
        currentDate = dataAPI.currentDate
        console.log(currentDate);

        //Detalles
        const query = location.search
        //obtener querystring
        const params = new URLSearchParams(query)
        //acceder a los aprametros de la ruta
        let idParams = params.get("id")
        console.log(idParams)
        //acceder al ID
        let detailCard = eventos.find(elemento => elemento._id == idParams)
        console.log(detailCard);



    } catch (error) {
        console.log(error.message);
    }
}
getEvents()

function traerEventos(eventos) {
    const cartasContenedor = document.getElementById("cardEvent")

    if (eventos.length == 0) {
        cardEvent.innerHTML = "<h2 class='display-1 fw-bolder'>Evento no encontrado</h2>"
        return
    }
    let cards = ''
    eventos.forEach(evento => {
        cards += `        <div class="card" style="width: 18rem;">
                    <img src=${evento.image} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${evento.date}</li>
                        <li class="list-group-item">$ ${evento.price}</li>
                    </ul>
                    <div class="card-body">
                        <a href="./details.html?id=${evento._id}" class="card-link">See more</a>
                    </div>
                </div>`
    })
    cartasContenedor.innerHTML = cards
}
//capturar elementos
const conteinerChecks = document.getElementById("boxCheck")
const input = document.querySelector("input")
//Eventos
//Evento search
input.addEventListener('input', filtroDoble)
//Evento Cambio checkbox
conteinerChecks.addEventListener('change', filtroDoble)
//Filtro por categoria
function filtrarCategoria(arrayDatos, texto) {
    let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}
//Traer Checkboxes
function crearCheckboxes(arrayInfo) {

    let checks = ''
    let paisesRepetidos = arrayInfo.map(elemento => elemento.category)
    let paises = new Set(paisesRepetidos.sort((a, b) => {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    }))
    paises.forEach(elemento => {
        checks += `            <input type="checkbox" name="" id="${elemento}" value="${elemento}">
            <label  class="cbox"for="${elemento}">${elemento}</label>
        `
    })
    conteinerChecks.innerHTML = checks
}
//Filtro checkboxes
function filtraCategoria(arrayInfo) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksCheked = arrayChecks.filter(check => check.checked)
    console.log(arrayChecksCheked);
    if (arrayChecksCheked.length == 0) {
        return arrayInfo
    }
    let checkValues = arrayChecksCheked.map(check => check.value)
    console.log(checkValues)
    let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category))
    console.log(arrayFiltrado);
    return arrayFiltrado
}
//Filtro cruzado search y checkbox
function filtroDoble() {
    let arrayFiltrado1 = filtrarCategoria(eventos, input.value);
    let arrayFiltrado2 = filtraCategoria(arrayFiltrado1);
    traerEventos(arrayFiltrado2)
}