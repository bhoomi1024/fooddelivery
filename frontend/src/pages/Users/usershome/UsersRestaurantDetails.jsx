import React, { useState } from 'react';

const UsersRestaurantDetail = ({ restaurant, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!restaurant) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white overflow-y-auto p-20 box-border">
      <button className="absolute top-20 right-20 px-10 py-15 bg-gray-200 rounded-lg cursor-pointer" onClick={onClose}>
        Close
      </button>
      
      <div className="text-center mb-20">
        <h1 className="text-4xl mb-10">{restaurant.name}</h1>
        <p className="italic mb-10">{restaurant.cuisine}</p>
        <div className="mb-10">
          <span className="font-bold mr-5">{restaurant.rating} ⭐</span>
          <span>({restaurant.ratingCount} ratings)</span>
        </div>
        <p className="font-bold">{restaurant.eta}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mb-20">
        {restaurant.images && restaurant.images.length > 0 ? (
          restaurant.images.map((image, index) => (
            <img key={index} src={image} alt={`${restaurant.name} - ${index + 1}`} className="w-200 h-200 object-cover rounded-10" />
          ))
        ) : (
          <img src={restaurant.image} alt={restaurant.name} className="w-200 h-200 object-cover rounded-10" />
        )}
      </div>

      <div className="flex justify-center mb-20">
        <button 
          className={`px-20 py-10 bg-gray-200 border-none cursor-pointer mr-5 ${activeTab === 'overview' ? 'bg-blue-500 text-white' : ''}`} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-20 py-10 bg-gray-200 border-none cursor-pointer mr-5 ${activeTab === 'menu' ? 'bg-blue-500 text-white' : ''}`} 
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button 
          className={`px-20 py-10 bg-gray-200 border-none cursor-pointer ${activeTab === 'reviews' ? 'bg-blue-500 text-white' : ''}`} 
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="max-w-800 mx-auto">
        {activeTab === 'overview' && (
          <div className="overview">
            <p>{restaurant.description || 'No description available.'}</p>
            <p>Address: {restaurant.address || 'Not available'}</p>
            <p>Phone: {restaurant.phone || 'Not available'}</p>
            <p>Hours: {restaurant.hours || 'Not available'}</p>
          </div>
        )}
        {activeTab === 'menu' && (
          <div className="menu">
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, index) => (
                <div key={index} className="mb-20">
                  <h3 className="mb-5">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                </div>
              ))
            ) : (
              <p>Menu not available.</p>
            )}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="reviews">
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => (
                <div key={index} className="mb-20 pb-20 border-b-1 border-gray-300">
                  <p className="font-bold">{review.author}</p>
                  <p className="text-orange-500 mb-5">{review.rating} ⭐</p>
                  <p className="italic">{review.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersRestaurantDetail;
