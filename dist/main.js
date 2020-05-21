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

    function addMarker(coords) {
        let mrk = new google.maps.Marker({
            position: coords,
            map: map,
            ///  icon :  iconBase + 'info-i_maps.png'
        })
    }
    //get restaurants then filter ...
    await restaurantsManager.getRestaurantsData(cityName)
    let map;
    let c = 1;
    function initMap() {
        // map = new google.maps.Map(document.getElementById('map'), {
        //     center: { lat: parseInt( restaurantsManager.restaurants[0].location.latitude), lng:  parseInt( restaurantsManager.restaurants[0].location.longitude) },
        //     zoom: 9
        // });
        for (let rest of restaurantsManager.restaurants) {
            console.log("gazal")
            $.ajax({
                method: "GET",
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${rest.address.street + ", " + rest.address.locality + ", " + rest.address.country}&key=AIzaSyCBXWX_pL7cjv1ofLDjBHf9h4dZieLrmx0`,

                success: (data) => {

                 if(c==1) {  map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat:data.results[0].geometry.location.lat,  lng: data.results[0].geometry.location.lng },
                        zoom: 12
                    });}
                    addMarker({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng })
                  c++;
                
                }



            
        })
    
    }
 }
 initMap();

    render.renderRestaurantsData(restaurantsManager.restaurants)
    // console.log(restaurantsManager.restaurants)
}



$("#search-btn").on("click", function () {
    const cityName = $("#city-input").val().toLowerCase()
    handleSearch(cityName, "")
    $("#city-input").val("")
    // let addrees= rest.address.street + ", " + rest.addrees.locality + ", " + rest.address.country


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
    //console.log(myTrip)
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
    //console.log(newTrip)
    render.renderTripsData(newTrip.restaurants)
})

$("#create-trip-btn").on("click", async function () {
    const title = $("#trip-name").val()
    await tripsManager.addTrip(title)
    render.renderTripsTitle(tripsManager.trips)
})

let y
let x

let searchInput = 'city-input';
let autocomplete;
autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode'],
    componentRestrictions: {
        country: "USA"
    }
});

$(document).ready(function () {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
    });
    //	console.log(autocomplete.types)
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let near_place = autocomplete.getPlace();
        //console.log(near_place)
        y = near_place.geometry.location.lat();
        x = near_place.geometry.location.lng();
        console.log(x)
         console.log(y)

    });
});

// let map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 51.5073509, lng: -0.1277583 },
//         zoom: 8
//     });
//     let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

//     addMarker({ lat: 51.5073509, lng: -0.1277583 })
//     addMarker({ lat: 51.61504619999999, lng: -0.1490606 })
//     addMarker({ lat: 51.5068249, lng: -0.1481389 })
//     addMarker({ lat: 51.5123616, lng: -0.1216294 })

// }

//addMarker({ lat: 51.5123616, lng: -0.1216294 })


//initMap()
let a = {}
function getLocation(addrees) {

    $.ajax({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addrees}&key=AIzaSyCBXWX_pL7cjv1ofLDjBHf9h4dZieLrmx0`,

        success: (data) => {

            return {
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng
            }
        }
    })
}


