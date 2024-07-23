import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import UsersRestaurantDetails from './UsersRestaurantDetails';
import FilterOptions from '../../../components/AfterLoginUsersComp/usersFilterdetails';
import { SlidersHorizontal } from 'lucide-react';
import Footer from '../../../components/HomePageCompo/Footer';
import usersRestaurantData from './usersRestaurantdata.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchRestaurant from '../../../components/AfterLoginUsersComp/SearchRestaurant';
import RestaurantHeader from '../../../components/AfterLoginUsersComp/RestaurantHeader';
import Rating4PlusButton from '../../../components/AfterLoginUsersComp/Rating4PlusButton';
import RestaurantCard from '../../../components/AfterLoginUsersComp/RestaurantCard';

const UsersRestaurant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: [],
    rating: null,
    priceRange: null,
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState(usersRestaurantData.restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [likedRestaurants, setLikedRestaurants] = useState({});
  const [rating4PlusSelected, setRating4PlusSelected] = useState(true);

  const filterRef = useRef(null);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedRestaurants')) || {};
    setLikedRestaurants(storedLikes);
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    applyFilters(searchTerm);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (category, value) => {
    if (category === 'rating' && value === 4) {
      setRating4PlusSelected(!rating4PlusSelected);
      const newRating = rating4PlusSelected ? null : 4;
      setFilters(prevFilters => ({ ...prevFilters, [category]: newRating }));
      applyFilters(searchTerm, newRating);
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [category]: value,
      }));
      applyFilters(searchTerm, value);
    }
  };

  const applyFilters = (search, ratingFilter) => {
    const filtered = usersRestaurantData.restaurants.filter((restaurant) => {
      const firstLetter = restaurant.name.charAt(0).toLowerCase();
      const searchFirstLetter = search.charAt(0).toLowerCase();
      const matchesSearchTerm = firstLetter === searchFirstLetter || search === '';
      const matchesCuisine =
        filters.cuisine.length === 0 || filters.cuisine.includes(restaurant.cuisine);
      const matchesRating = filters.rating === null || restaurant.rating >= filters.rating;

      return matchesSearchTerm && matchesCuisine && matchesRating;
    });

    if (rating4PlusSelected) {
      const ratingFiltered = filtered.filter((restaurant) => restaurant.rating >= 4);
      setFilteredRestaurants(ratingFiltered);
    } else {
      setFilteredRestaurants(filtered);
    }

    setShowFilters(false);
  };

  const closeFilters = () => {
    setShowFilters(false);
    setRating4PlusSelected(false);
    setFilters({ cuisine: [], rating: null, priceRange: null });
    applyFilters(searchTerm, null);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilters(false);
      applyFilters(searchTerm, null);
    }
  };

  useEffect(() => {
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closeDetail = () => {
    setSelectedRestaurant(null);
  };

  const handleLike = (restaurantId) => {
    setLikedRestaurants(prev => {
      const isLiked = !prev[restaurantId];
      const updatedLikes = {
        ...prev,
        [restaurantId]: isLiked,
      };

      localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));

      return updatedLikes;
    });
  };

  const likedCount = Object.values(likedRestaurants).filter(Boolean).length;

  return (
    <>
      <Navbar likedCount={likedCount} />
      <ToastContainer />
      <RestaurantHeader />

      <div className="flex justify-start gap-2 my-5 px-5">
        <Rating4PlusButton isSelected={rating4PlusSelected} onClick={() => handleFilterChange('rating', 4)} />
        <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300" onClick={toggleFilters}>
          <span className="mr-2"><SlidersHorizontal /></span>
          Filters
        </button>
        <SearchRestaurant searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>

      {showFilters && (
        <FilterOptions
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          closeFilters={closeFilters}
        />
      )}

      {selectedRestaurant ? (
        <UsersRestaurantDetails restaurant={selectedRestaurant} onClose={closeDetail} />
      ) : (
        <div className="px-5 mb-10">
          <h2 className="text-2xl font-bold mb-5">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isLiked={likedRestaurants[restaurant.id] || false}
                onLike={handleLike}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UsersRestaurant;
