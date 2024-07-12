import React from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar'
import { FaStar, FaRegClock } from 'react-icons/fa';
import './usersliked.css'; 

const Usersliked= () => {
  
  const likedRestaurants = [
    { id: 1, name: "Spice Paradise", cuisine: "Indian", rating: 4.5, deliveryTime: "30-40 min", image: "https://example.com/spice-paradise.jpg" },
    { id: 2, name: "Sushi Heaven", cuisine: "Japanese", rating: 4.7, deliveryTime: "25-35 min", image: "https://example.com/sushi-heaven.jpg" },
    { id: 3, name: "Pasta Perfection", cuisine: "Italian", rating: 4.3, deliveryTime: "35-45 min", image: "https://example.com/pasta-perfection.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div className="liked-container">
        <h1 className="liked-title">Your Most Liked Restaurants</h1>
        <div className="restaurant-grid">
          {likedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <div className="restaurant-details">
                  <span className="restaurant-rating">
                    <FaStar className="star-icon" /> {restaurant.rating}
                  </span>
                  <span className="restaurant-delivery-time">
                    <FaRegClock className="clock-icon" /> {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Usersliked;