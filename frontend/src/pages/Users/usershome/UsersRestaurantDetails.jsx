import React, { useState } from 'react';
import './usersRestaurantDetail.css';

const UsersRestaurantDetail = ({ restaurant, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!restaurant) return null;

  return (
    <div className="restaurant-detail-page">
      <button className="close-button" onClick={onClose}>Close</button>
      
      <div className="restaurant-header">
        <h1 className="detail-name">{restaurant.name}</h1>
        <p className="detail-cuisine">{restaurant.cuisine}</p>
        <div className="detail-rating">
          <span className="rating-score">{restaurant.rating} ⭐</span>
          <span className="rating-count">({restaurant.ratingCount} ratings)</span>
        </div>
        <p className="detail-eta">{restaurant.eta}</p>
      </div>

      <div className="restaurant-images">
        {restaurant.images && restaurant.images.length > 0 ? (
          restaurant.images.map((image, index) => (
            <img key={index} src={image} alt={`${restaurant.name} - ${index + 1}`} className="detail-image" />
          ))
        ) : (
          <img src={restaurant.image} alt={restaurant.name} className="detail-image" />
        )}
      </div>

      <div className="restaurant-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'menu' ? 'active' : ''}`} 
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`} 
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="tab-content">
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
                <div key={index} className="menu-item">
                  <h3>{item.name}</h3>
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
                <div key={index} className="review">
                  <p className="review-author">{review.author}</p>
                  <p className="review-rating">{review.rating} ⭐</p>
                  <p className="review-text">{review.text}</p>
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