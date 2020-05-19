class RestaurantsManager {
  constructor() {
    this.restaurants = []
  }

  async getRestaurantsData(cityName) {
    this.restaurants = await $.get(`/restaurants/${cityName}`)
  }

  filterRestaurants(filter) {
    const filteredRestaurants = this.restaurants.filter(r =>
      r.cuisine.includes(filter.cuisine || '') &&
      r.rating.ratingValue >= (filter.rating || 0)
    )

    if (filter.discountChecked)
      return filteredRestaurants.filter(r => r.marketingOffer)
    return filteredRestaurants
  }

}




