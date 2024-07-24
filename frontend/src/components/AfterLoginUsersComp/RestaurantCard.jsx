// src/components/AfterLoginUsersComp/RestaurantCard.js
import React from 'react';
import LikeButton from './LikeButton';

const RestaurantCard = ({ restaurant, isLiked, onLike, onClick, menuItems }) => {
  return (
    <div
      key={restaurant.id}
      className="bg-white rounded-lg shadow-lg p-5 cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onClick(restaurant)}
    >
      <div className="relative">
        <img
          src={"https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg"}
          alt={restaurant.restaurantName}
          className="w-full h-48 object-cover rounded-lg mb-5"
        />
        <LikeButton
          isLiked={isLiked}
          onLike={() => onLike(restaurant.id)}
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{restaurant.restaurantName}</h3>
      <p className="text-gray-600 mb-2">{restaurant.cuisineName}</p>
      <p className="text-gray-600 mb-2">{'⭐'.repeat(restaurant.rating)}</p>
    </div>
  );
};

export default RestaurantCard;
