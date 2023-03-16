//EVENTOS PASADOS Y FUTUROS

let pastEvents = []
let upcomingEvents = []
const fecha = data.currentDate

function filtrarArrayFecha(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].date < fecha) {
            pastEvents.push(array[i])
        } else {
            upcomingEvents.push(array[i])
        }
    }
}

filtrarArrayFecha(data.events)

console.log(pastEvents)
console.log(upcomingEvents)
//EVENTOS PASADOS Y FUTUROS

const eventos = data.events
//capturar elemento
const cartasContenedor = document.getElementById(cardEvent)
const input = document.querySelector("input")
const conteinerChecks = document.getElementById("checkbox")

input.addEventListener('input', filtroDoble)

conteinerChecks.addEventListener('change', filtroDoble)


//Funciones
function traerEventos(arrayDatos) {
    if (arrayDatos.length == 0) {
        cardEvent.innerHTML = "<h2 class='display-1 fw-bolder'>Evento no encontrado</h2>"
        return
    }
    let cards = ''
    arrayDatos.forEach(elemento => {
        cards += `        <div class="card" style="width: 18rem;">
                    <img src=${elemento.image} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.name}</h5>
                        <p class="card-text">${elemento.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${elemento.date}</li>
                        <li class="list-group-item">$ ${elemento.price}</li>
                    </ul>
                    <div class="card-body">
                        <a href="./details.html?id=${elemento._id}">See more</a>
                    </div>
                </div>`
    })
    cardEvent.innerHTML = cards
}

function filtrarCategoria(arrayDatos, texto) {
    let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

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


function filtroDoble() {
    let arrayFiltrado1 = filtrarCategoria(pastEvents, input.value)
    let arrayFiltrado2 = filtraCategoria(arrayFiltrado1)
    traerEventos(arrayFiltrado2)
}

traerEventos(pastEvents)
crearCheckboxes(pastEvents)