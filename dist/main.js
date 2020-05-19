const render = new Render()
const restaurantsManager = new RestaurantsManager()
const tripsManager = new TripsManager()


const handleSearch = async function (cityName, filter) {
    //get restaurants then filter ...
    await restaurantsManager.getRestaurantsData(cityName)
    render.renderRestaurantsData(restaurantsManager.restaurants)
    console.log(restaurantsManager.restaurants)
}


$("#search-btn").on("click", function(){
    const cityName = $("#city-input").val().toLowerCase()
    handleSearch(cityName, "")
    
    $("#city-input").val("")
})








