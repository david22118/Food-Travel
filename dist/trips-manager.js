class TripsManager {
    constructor() {
        this.trips = []
    }

    async getTrips() {
        return this.trips
    }

    async addTrip(trip) {
        $.post()
        this.trips.push(trip)
    }
    async removeTrip(tripId) {
       
        this.trips.splice(tripId, 1)
    }



    async getDataFromDB(){
        let restaurants = await $.get(`/trips`)
        this.trips = cities
   }
   
   
   
   saveRestaurant(restName){
       const restaurant = this.trips.find(rest => rest.name == restName)
       $.post('/restaurant', restaurant)
   }
   
   
   removeRestaurant(restName){
       $.ajax({
           url: `/restaurant/${restName}`,
           type: 'DELETE'
           
       })
   }
} 