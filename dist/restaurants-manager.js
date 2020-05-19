

class RestaurantsManager {
  constructor() {
    this.restaurants = []
  }

  async getRestaurantsData(cityName) {
    this.restaurants= await get(`/restaurants/${cityName}`)
  }

  filterRestaurants(filter) {
    //filter restaurants ...
  }

}




