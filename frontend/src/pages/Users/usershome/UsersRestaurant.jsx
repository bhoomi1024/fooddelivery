import React, { useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar'
import './usersRestaurant.css';
import usersRestaurantdata from './usersRestaurantdata';
import UsersRestaurantDetails from './UsersRestaurantDetails';
import { FaHeart } from 'react-icons/fa'; 
import { ShoppingBag, LogOut, Heart, UserRound, ShoppingCart,Search,SlidersHorizontal, Tags,Star } from 'lucide-react';
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
  const [likedRestaurants, setLikedRestaurants] = useState({}); // Add this state

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
    const filtered = restaurantData.restaurants.filter(restaurant => {
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
      <div className='restaurant-container'>
        <div className='content-wrapper'>
          <div className='text-content'>
            <p className='offer-text fade-in-down'>We offer</p>
            <div className='delicious-wrapper'>
              <p className='delicious-text fade-in'>Delicious Food</p>
              <div className='delicious-background'></div>
            </div>
            <p className='quick-text fade-in-up'>And quick</p>
            <p className='services-text fade-in-up delay-150'>services</p>
          </div>
          <div className='image-wrapper '>
            <img src="https://res.cloudinary.com/ddyejtuqb/image/upload/v1719411025/eating_eyz1h9.jpg" alt="Delicious Food" className='food-image' />
          </div>
        </div>
      </div>
      
      {/* Filter Options */}
      <div className="filter-options">
        <button className="filter-button" onClick={toggleFilters}>
          <span className="filter-icon"><SlidersHorizontal /></span>
          Filters
        </button>
        <button className="filter-button">
          <span className="filter-icon"> <Tags /></span>
          Offers
        </button>
        <button className="filter-button">
          <span className="filter-icon"><Star /></span>
          Ratings 4+
        </button>
        <div className="search-container">
          <input 
            className="search-input"
            placeholder='Search for restaurants'
            type='text'
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="search-icon"><Search /></span>
        </div>
      </div>

      {/* Filter Interface */}
      {showFilters && (
        <div className="filter-interface">
          <h3>Filters</h3>
          <div className="filter-section">
            <h4>Cuisine</h4>
            <label>
              <input
                type="checkbox"
                checked={filters.cuisine.includes('Italian')}
                onChange={() => handleFilterChange('cuisine', 'Italian')}
              /> Italian
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.cuisine.includes('Chinese')}
                onChange={() => handleFilterChange('cuisine', 'Chinese')}
              /> Chinese
            </label>
            {/* Add more cuisine options */}
          </div>
          <div className="filter-section">
            <h4>Rating</h4>
            <select
              value={filters.rating || ''}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
          <div className="filter-section">
            <h4>Price Range</h4>
            <select
              value={filters.priceRange || ''}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="$">2000+</option>
              <option value="$$">3000+</option>
              <option value="$$$">4000+</option>
            </select>
          </div>
          <button className="apply-filters" onClick={applyFilters}>Apply Filters</button>
        </div>
      )}

      {selectedRestaurant ? (
        <UsersRestaurantDetails restaurant={selectedRestaurant} onClose={closeDetail} />
      ) : (
        <div className="restaurant-list">
          <h2 className="section-title">Top Restaurants</h2>
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant)}>
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-rating">
                    <span className="rating-score">{restaurant.rating} ⭐</span>
                    <span className="rating-count">({restaurant.ratingCount} ratings)</span>
                  </div>
                  <p className="restaurant-eta">{restaurant.eta}</p>
                  <FaHeart 
                    className={`like-icon ${likedRestaurants[restaurant.id] ? 'liked' : ''}`}
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