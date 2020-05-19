class Render {
    constructor() {

    }
    renderRestaurantsData(restaurants) {
        const source = $('#restaurant-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ restaurants })
        $('').empty()
        $('').append(newHTML)
    }

    renderTripsData(trips) {
        // code ..
    }

}




