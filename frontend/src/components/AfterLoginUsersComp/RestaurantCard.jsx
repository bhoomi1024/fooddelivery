import React from 'react';
import LikeButton from './LikeButton';

const RestaurantCard = ({ restaurant,  onLike, onClick }) => {
  const checking = () => {
    console.log('clicked');
  };
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
          // isLiked={isLiked}
          // onLike={onLike}
          onClick={checking}
          restaurantId={restaurant.id} 
        />
      </div>
      <div className='flex justify-between items-center'>
        <h3 className="text-xl font-semibold mb-2">{restaurant.restaurantName}</h3>


        <p className={`text-gray-600 mb-2 font-poppins mr-2 ${restaurant?.isOpen?"text-green-600":"text-neutral-500"}`}>
        {restaurant?.isOpen?"Open":"Closed"}
        </p>
      </div>

      <p className="text-gray-600 mb-2">{restaurant.cuisineName}</p>
      <p className="text-gray-600 mb-2">{'⭐'.repeat(restaurant.rating)}</p>
    </div>
  );
};

export default RestaurantCard;
