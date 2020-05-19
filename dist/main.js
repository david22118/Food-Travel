const render = new Render()
const restaurantsManager = new RestaurantsManager()
const tripsManager = new TripsManager()


const handleSearch = async function (cityName, filter) {
    //get restaurants then filter ...
    await restaurantsManager.getRestaurantsData(cityName)
    render.renderRestaurantsData(restaurantsManager.restaurants)
}


$("#searchBtn").on("click", function(){
    const cityName = $("#input").val()
    handleSearch(cityName, "")
    
    $("#input").val("")
})









