const render = new Render()
const restaurantsManager = new RestaurantsManager()
const tripsManager = new TripsManager()
$('#img-load').hide();
const loadTrips = async function () {
    await tripsManager.getTrips()
    render.renderTripsTitle(tripsManager.trips)
}
loadTrips()

const handleSearch = async function (cityName, filter) {
    $('#restaurants').empty()
    $('#img-load').show();
    await restaurantsManager.getRestaurantsData(cityName)
    $('#img-load').hide();
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

$("#Show-Trip-btn").on("click", async function () {
    await tripsManager.getTrips()
    const tripTitle = $("#trips-list").val()
    const myTrip = tripsManager.trips.find(t => t.title == tripTitle)
    console.log(myTrip)
    render.renderTripsData(myTrip.restaurants)
})


$("#restaurants").on("click", "#add-restaurants", async function () {
    const tripTitle = $("#trips-list").val()
    const trip = tripsManager.trips.find(c => c.title == tripTitle)
    const tripId = trip._id
    const restaurantsId = $(this).data().id
    const isAded = trip.restaurants.findIndex(r => r._id == restaurantsId)
    if (isAded == -1) {
        await restaurantsManager.addRestaurantToTrip(restaurantsId, tripId)
        await tripsManager.getTrips()
    }
})

$("#restaurants").on("click", "#remove-restaurants-trip", async function () {
    const restaurantId = $(this).data().id
    const tripTitle = $("#trips-list").val()
    const trip = tripsManager.trips.find(c => c.title == tripTitle)
    const newTrip = await restaurantsManager.removeRestaurantFromTrip(restaurantId, trip._id)
    console.log(newTrip)
    render.renderTripsData(newTrip.restaurants)
})

$("#create-trip-btn").on("click", async function () {
    const title = $("#trip-name").val()
    await tripsManager.addTrip(title)
    render.renderTripsTitle(tripsManager.trips)
})

