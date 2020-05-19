class TripsManager {
    constructor() {
        this.trips = []
    }

    async getTrips() {
        return this.trips
    }

    async addTrip(trip) {
        this.trips.push(trip)
    }
    async removeTrip(tripId) {
        this.trips.splice(tripId, 1)
    }
} 