
const query = location.search
//obtener querystring

const params = new URLSearchParams(query)
//acceder a los aprametros de la ruta


let idParams = params.get("id")
console.log(idParams)
//acceder al ID


let detailCard = data.events.find(elemento => elemento._id == idParams)
console.log(detailCard);

const container = document.getElementById("cardEvento");
let html = ''
html += `
<div class="card mb-3"">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${detailCard.image}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${detailCard.name}</h5>
                <h5 class="card-title">$${detailCard.price}</h5>
                <p class="card-text">${detailCard.description}</p>
                <p class="card-text"><small class="text-muted">${detailCard.date}</small></p>
            </div>
        </div>
    </div>
</div>
`
container.innerHTML = html
