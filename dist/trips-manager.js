class TripsManager {
    constructor() {
        this.trips = []
    }

    async getTrips() {
        this.trips = await $.get(`trips`)
        console.log(this.trips);
    }
    async addTrip(tripTitle) {
        this.trips = await $.post('trip', { title: tripTitle })
    }
    async removeTrip(tripId) {
        this.trips = await $.ajax({
            url: `trip/${tripId}`,
            method: 'DELETE'
        })
    }
} 