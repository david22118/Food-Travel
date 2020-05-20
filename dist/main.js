const render = new Render()
const restaurantsManager = new RestaurantsManager()
const tripsManager = new TripsManager()


const handleSearch = async function (cityName, filter) {
    //get restaurants then filter ...
    await restaurantsManager.getRestaurantsData(cityName)
    render.renderRestaurantsData(restaurantsManager.restaurants)
    console.log(restaurantsManager.restaurants)
}


$("#search-btn").on("click", function () {
    const cityName = $("#city-input").val().toLowerCase()
    handleSearch(cityName, "")

    $("#city-input").val("")
})

$('#filter-btn').on('click', function () {
    const cuisine = $('#cuisines-list').val()
    const rating = parseInt($('#rating-list').val())
    const isChecked = $('#discountChecked')[0].checked
    const filter = { cuisine, rating, discountChecked: isChecked }
    const filterdRestaurants = restaurantsManager.filterRestaurants(filter)
    render.renderRestaurantsData(filterdRestaurants)
})

$("#travel-btn").on("click",function(){
await tripsManager.getTrips()
render.renderTripsData(tripsManager.trips)
})


$("#restaurants").on("click","#add-restaurants",function(){
const tripId = $(this).data().id
const trip= restaurantsManager.restaurants.find(c=>c._id==tripId)
await TripsManager.addTrip(trip)
render.renderRestaurantsData(restaurantsManager.restaurants)

})

$("#restaurants").on("click","#remove-restaurants",function(){
const tripId = $(this).data().id

await removeTrip(tripId)
render.renderRestaurantsData(restaurantsManager.restaurants)
})






