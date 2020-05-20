class Render {
    constructor() {

    }
    renderRestaurantsData(restaurants) {
        const source = $('#restaurant-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ restaurants })
        $('#restaurants').empty()
        $('#restaurants').append(newHTML)
    }
     
    renderTripsData(restaurants) {
        const source = $('#trip-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ restaurants})
        $('#restaurants').empty()
        $('#restaurants').append(newHTML)
    }
    
    renderTripsTitle(trips){
     for(let trip of trips){
        const addTitle= $(`<option value="${trip.title}">${trip.title}</option>`)
        $("#trips-list").append(addTitle)
     }   
    }


}




