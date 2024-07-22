import React from 'react';
import AddToCartButton from './AddToCartButton';

const RestaurantMenu = ({ menuItems, loading, error }) => {
  if (loading) {
    return <p className="text-center">Loading menu items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (menuItems.length === 0) {
    return <p className="text-gray-700 text-center italic">No menu items available.</p>;
  }

  return (
    <div className="text-left">
      {menuItems.map((item) => (
        <div key={item._id} className="mb-6 p-4 bg-gray-100 rounded-lg flex items-center">
          <div className="flex-shrink-0 mr-4">
            <img src={item.image} alt={item.dishName} className="w-16 h-16 rounded-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.dishName}</h3>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-yellow-600">Rs {item.price.toFixed(2)}</p>
              {item.inStock ? (
                <AddToCartButton item={item} />
              ) : (
                <p className="text-red-600 font-semibold">Not Available</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;