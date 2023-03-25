
let dataArray = []
//let currentDate = ""

const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"


async function getEvents() {

    try {
        const response = await fetch(API_URL);
        const eventsToCatch = await response.json();

        for (const event of eventsToCatch.events) {
            dataArray.push(event)
        }
        //Details
        let query = location.search
        let params = new URLSearchParams(query)
        let idParams = params.get("id")
        let details = dataArray.find(info => info._id == idParams)
        console.log(details)
        let container = document.getElementById("container-detail")

        container.innerHTML += `
          <div class="row row-cols-2">
          <div class="col-6">
            <img src="${dataArray[idParams - 1].image}" class="img-fluid container-sm" >
          </div>
          <div class="col-lg-6">
            <h1>${dataArray[idParams - 1].name}</h1>
            <h3>${dataArray[idParams - 1].category}</h3>
            <p> ${dataArray[idParams - 1].description}
            </p>

            <p> <span class="text-muted">Price: ${dataArray[idParams - 1].price}.</span>
            </p>
            <p> <span class="text-muted">Capacity: ${dataArray[idParams - 1].capacity}.</span>
            
            </p>
            <p> <span class="text-muted">Place: ${dataArray[idParams - 1].place}.</span>
            </p>
            
        </div>
        `

    } catch (error) {
        console.log(error)
    }
}

getEvents()
