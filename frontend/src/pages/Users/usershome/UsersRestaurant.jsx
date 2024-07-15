import React, { useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar'
import usersRestaurantdata from './usersRestaurantdata';
import UsersRestaurantDetails from './UsersRestaurantDetails';
import { FaHeart } from 'react-icons/fa'; 
import { ShoppingBag, LogOut, Heart, UserRound, ShoppingCart, Search, SlidersHorizontal, Tags, Star } from 'lucide-react';
import Footer from '../../../components/HomePageCompo/Footer'

const UsersRestaurant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: [],
    rating: null,
    priceRange: null,
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState(usersRestaurantdata.restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [likedRestaurants, setLikedRestaurants] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    applyFilters(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      if (category === 'cuisine') {
        const newCuisines = prevFilters.cuisine.includes(value)
          ? prevFilters.cuisine.filter(c => c !== value)
          : [...prevFilters.cuisine, value];
        return { ...prevFilters, cuisine: newCuisines };
      } else {
        return { ...prevFilters, [category]: value };
      }
    });
  };

  const applyFilters = (search = searchTerm) => {
    const filtered = usersRestaurantdata.restaurants.filter(restaurant => {
      const matchesSearchTerm = restaurant.name.toLowerCase().includes(search.toLowerCase());
      const matchesCuisine = filters.cuisine.length === 0 || filters.cuisine.includes(restaurant.cuisine);
      const matchesRating = filters.rating === null || restaurant.rating >= filters.rating;
      const matchesPrice = filters.priceRange === null || restaurant.priceRange === filters.priceRange;

      return matchesSearchTerm && matchesCuisine && matchesRating && matchesPrice;
    });

    setFilteredRestaurants(filtered);
    setShowFilters(false);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closeDetail = () => {
    setSelectedRestaurant(null);
  };

  const handleLike = (e, restaurantId) => {
    e.stopPropagation();
    setLikedRestaurants(prev => ({
      ...prev,
      [restaurantId]: !prev[restaurantId]
    }));
  };

  return (
    <>
      <Navbar />
      <div className='bg-yellow-400 h-screen flex items-center overflow-hidden relative'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-5'>
          <div className='text-left flex-1'>
            <p className='text-4xl font-bold text-gray-800 mb-2 tracking-wider animate-fade-in-down'>We offer</p>
            <div className='relative inline-block my-4'>
              <p className='text-6xl font-extrabold text-orange-600 relative z-10 transition-transform duration-300 hover:scale-105 animate-fade-in'>
                Delicious Food
              </p>
              <div className='absolute inset-0 bg-orange-600 opacity-20 rounded-full scale-110 -rotate-2 transition-transform duration-300 hover:scale-125 hover:rotate-6'></div>
            </div>
            <p className='text-4xl font-bold text-gray-800 mb-2 tracking-wider animate-fade-in-up'>And quick</p>
            <p className='text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent animate-fade-in-up delay-150'>
              services
            </p>
          </div>
          <div className='flex-1 ml-24'>
            <img src="https://res.cloudinary.com/ddyejtuqb/image/upload/v1719411025/eating_eyz1h9.jpg" alt="Delicious Food" className='w-96 h-96 object-cover rounded-full shadow-xl transition-transform duration-300 hover:scale-105' />
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-2 my-5 px-5">
        <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300" onClick={toggleFilters}>
          <span className="mr-2"><SlidersHorizontal /></span>
          Filters
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300">
          <span className="mr-2"><Tags /></span>
          Offers
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300">
          <span className="mr-2"><Star /></span>
          Ratings 4+
        </button>
        <div className="relative flex-grow">
          <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-full text-lg outline-none transition-border duration-300 focus:border-green-500 focus:shadow-outline placeholder-gray-400"
            placeholder='Search for restaurants'
            type='text'
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Search /></span>
        </div>
      </div>

      {showFilters && (
        <div className="fixed top-0 right-0 w-72 h-screen bg-white shadow-xl p-5 overflow-y-auto z-50">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-bold mb-2">Cuisine</h4>
            <label className="block mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.cuisine.includes('Italian')}
                onChange={() => handleFilterChange('cuisine', 'Italian')}
              />
              Italian
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.cuisine.includes('Chinese')}
                onChange={() => handleFilterChange('cuisine', 'Chinese')}
              />
              Chinese
            </label>
          </div>
          <div className="mb-4">
            <h4 className="font-bold mb-2">Rating</h4>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={filters.rating || ''}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-bold mb-2">Price Range</h4>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={filters.priceRange || ''}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="$">2000+</option>
              <option value="$$">3000+</option>
              <option value="$$$">4000+</option>
            </select>
          </div>
          <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300" onClick={applyFilters}>Apply Filters</button>
        </div>
      )}

      {selectedRestaurant ? (
        <UsersRestaurantDetails restaurant={selectedRestaurant} onClose={closeDetail} />
      ) : (
        <div className="px-5">
          <h2 className="text-2xl font-bold mb-5">Top Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="relative bg-white rounded-lg shadow-md transition-transform duration-300 hover:translate-y-1" onClick={() => handleRestaurantClick(restaurant)}>
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.cuisine}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">{restaurant.rating} ⭐</span>
                    <span className="ml-2 text-gray-500">({restaurant.ratingCount} ratings)</span>
                  </div>
                  <p className="text-gray-600 mt-2">{restaurant.eta}</p>
                  <FaHeart 
                    className={`absolute top-2 right-2 text-2xl cursor-pointer transition-colors duration-300 ${likedRestaurants[restaurant.id] ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={(e) => handleLike(e, restaurant.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default UsersRestaurant;
