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
     
    renderTripsData(trips) {
        const source = $('#trip-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ trips})
        $('#restaurants').empty()
        $('#restaurants').append(newHTML)
    }

}




