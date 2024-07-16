import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications

const UsersRestaurantDetail = ({ restaurant, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cart, setCart] = useState({}); // State to store items in the cart

  if (!restaurant) return null;

  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1
    }));
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (item) => {
    if (cart[item.id] === 1) {
      // Remove item from cart if it's the last one
      const { [item.id]: removed, ...rest } = cart;
      setCart(rest);
    } else {
      // Decrease quantity if more than one item
      setCart(prevCart => ({
        ...prevCart,
        [item.id]: prevCart[item.id] - 1
      }));
    }
    toast.warn(`1 ${item.name} removed from cart.`);
  };

  const cartQuantity = (itemId) => {
    return cart[itemId] || 0;
  };

  const [showAddToCart, setShowAddToCart] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setShowAddToCart(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="relative w-full max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-xl">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-800">{restaurant.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{restaurant.cuisine}</p>
          <div className="flex items-center justify-center mb-4">
            <span className="text-yellow-400 mr-2">
              <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-2xl font-bold text-gray-800">{restaurant.rating}</span>
            <span className="text-gray-600 ml-2">({restaurant.ratingCount} ratings)</span>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-full mr-4 transition-colors ${
              activeTab === 'overview' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'menu' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          {activeTab === 'overview' && (
            <div className="text-left space-y-4">
              <p className="text-gray-700">{restaurant.description || 'No description available.'}</p>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-700">{restaurant.address || 'Address not available'}</p>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-700">{restaurant.phone || 'Phone not available'}</p>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700">{restaurant.hours || 'Hours not available'}</p>
              </div>
            </div>
          )}
          {activeTab === 'menu' && (
            <div className="text-left">
              {restaurant.menu && restaurant.menu.length > 0 ? (
                restaurant.menu.map((item, index) => (
                  <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                      <p className="text-gray-700 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-yellow-600">Rs {item.price.toFixed(2)}</p>
                        {item.available ? (
                          showAddToCart ? (
                            <button
                              onClick={() => handleAddToCartClick(item)}
                              className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 transition-colors duration-300"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <div className="flex items-center">
                              <button
                                onClick={() => removeFromCart(item)}
                                className="px-3 py-1 bg-yellow-400 text-gray-800 rounded-l-md hover:bg-yellow-500 transition-colors"
                              >
                                -
                              </button>
                              <p className="px-3 py-1 bg-gray-100">{cartQuantity(item.id)}</p>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-3 py-1 bg-yellow-400 text-gray-800 rounded-r-md hover:bg-yellow-500 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          )
                        ) : (
                          <p className="text-red-600 font-semibold">Not Available</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 text-center italic">Menu not available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersRestaurantDetail;
