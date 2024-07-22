import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import UsersRestaurantDetails from './UsersRestaurantDetails';
import { FaHeart } from 'react-icons/fa';
import FilterOptions from '../../../components/AfterLoginUsersComp/usersFilterdetails';
import { SlidersHorizontal, Star, Search } from 'lucide-react';
import Footer from '../../../components/HomePageCompo/Footer';
import usersRestaurantData from './usersRestaurantdata.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [rating4PlusSelected, setRating4PlusSelected] = useState(true); // State for "Ratings 4+" button

  const filterRef = useRef(null);

  useEffect(() => {
    // Load liked restaurants from local storage
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
      // Toggle "Ratings 4+" button state
      setRating4PlusSelected(!rating4PlusSelected);
      // Update filter rating value
      const newRating = rating4PlusSelected ? null : 4;
      setFilters(prevFilters => ({ ...prevFilters, [category]: newRating }));
      applyFilters(searchTerm, newRating); // Apply filters immediately
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [category]: value,
      }));
      applyFilters(searchTerm, value); // Apply filters immediately
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

    // Apply additional rating filter if Ratings 4+ is selected
    if (rating4PlusSelected) {
      const ratingFiltered = filtered.filter((restaurant) => restaurant.rating >= 4);
      setFilteredRestaurants(ratingFiltered);
    } else {
      setFilteredRestaurants(filtered);
    }

    setShowFilters(false); // Close filters after applying
  };

  const closeFilters = () => {
    setShowFilters(false);
    setRating4PlusSelected(false); // Reset "Ratings 4+" button state
    setFilters({ cuisine: [], rating: null, priceRange: null }); // Reset filters
    applyFilters(searchTerm, null); // Apply filters when closing popup
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilters(false);
      applyFilters(searchTerm, null); // Apply filters when clicking outside
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

  const handleLike = (e, restaurantId) => {
    e.stopPropagation();
    setLikedRestaurants(prev => {
      const isLiked = !prev[restaurantId];
      const message = isLiked ? "Restaurant liked!" : "Restaurant unliked!";
      toast(message, { type: isLiked ? "success" : "info" });

      const updatedLikes = {
        ...prev,
        [restaurantId]: isLiked,
      };

      // Save liked restaurants to local storage
      localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));

      return updatedLikes;
    });
  };

  const likedCount = Object.values(likedRestaurants).filter(Boolean).length;

  return (
    <>
      <Navbar likedCount={likedCount} />
      <ToastContainer />
      <div className='bg-yellow-400 h-screen flex items-center overflow-hidden relative'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-5'>
          <div className='text-left flex-1'>
            <p className='text-4xl font-bold text-gray-800 mb-2 tracking-wider animate-fade-in-down'>We offer</p>
            <div className='relative inline-block my-4'>
              <p className='text-6xl font-extrabold text-orange-600 relative transition-transform duration-300 hover:scale-105 animate-fade-in'>
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
        <button
          className={`flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300 ${rating4PlusSelected ? '' : 'bg-yellow-500 text-white'}`}
          onClick={() => handleFilterChange('rating', 4)}
        >
          <span className="mr-2"><Star /></span>
          Ratings 4+
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300" onClick={toggleFilters}>
          <span className="mr-2"><SlidersHorizontal /></span>
          Filters
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
        <FilterOptions
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          closeFilters={closeFilters}
        />
      )}

      {selectedRestaurant ? (
        console.log(selectedRestaurant),
        <UsersRestaurantDetails restaurant={selectedRestaurant} onClose={closeDetail} />
      ) : (
        <div className="px-5 mb-10">
          <h2 className="text-2xl font-bold mb-5">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-lg p-5 cursor-pointer transition-transform transform hover:scale-105" onClick={() => handleRestaurantClick(restaurant)}>
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                  <button
                    className={`absolute top-2 right-2 p-2 rounded-full ${likedRestaurants[restaurant.id] ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
                    onClick={(e) => handleLike(e, restaurant.id)}
                  >
                    <FaHeart />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                <p className="text-gray-600 mb-2">{'⭐'.repeat(restaurant.rating)}</p>
                
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UsersRestaurant;
