import React from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import { FaStar, FaRegClock } from 'react-icons/fa';

const Usersliked = () => {
  const likedRestaurants = [
    { id: 1, name: "Spice Paradise", cuisine: "Indian", rating: 4.5, deliveryTime: "30-40 min", image: "https://example.com/spice-paradise.jpg" },
    { id: 2, name: "Sushi Heaven", cuisine: "Japanese", rating: 4.7, deliveryTime: "25-35 min", image: "https://example.com/sushi-heaven.jpg" },
    { id: 3, name: "Pasta Perfection", cuisine: "Italian", rating: 4.3, deliveryTime: "35-45 min", image: "https://example.com/pasta-perfection.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">Your Most Liked Restaurants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {likedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:-translate-y-1">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" /> {restaurant.rating}
                  </span>
                  <span className="flex items-center">
                    <FaRegClock className="text-green-500 mr-1" /> {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Usersliked;
