import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import menuDetails from './menuDetails.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersDishes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0); // State to keep track of total items in the cart

  useEffect(() => {
    // Calculate total items in the cart
    const totalCount = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
    setCartCount(totalCount);
  }, [cart]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null); // Reset selected item when changing category
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1
    }));
    toast.success(`${item.name} added to cart!`);
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[itemId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [itemId]: newQuantity };
    });
    const item = selectedCategory.options.find(item => item.id === itemId);
    toast.info(`Quantity of ${item.name} updated!`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar cartCount={cartCount} /> {/* Pass cartCount to Navbar */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 font-serif">Our Delicious Menu</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {menuDetails.items.map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden mb-3 shadow-md border-4 border-white">
                <img
                  src={category.options[0]?.image} // Display the image of the first item in the category
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-base font-semibold text-center text-gray-800 font-serif">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
        {selectedCategory && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 font-serif">{selectedCategory.name} Options</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
              {selectedCategory.options.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden mb-3 shadow-md border-4 border-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-base font-semibold text-center text-gray-800 font-serif">
                    {item.name}
                  </h2>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedItem && (
          <div className="bg-white rounded-lg shadow-2xl w-full overflow-hidden mb-8 transition-all duration-300">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 font-serif">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{selectedItem.description}</p>
                <div className="flex items-center mb-4">
                  <p className="text-gray-800 font-semibold text-base mr-4">
                    Price: <span className="text-green-600">Rs {selectedItem.price.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-800 font-semibold text-base">
                    Available: {' '}
                    <span className={`${selectedItem.available ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedItem.available ? '✓' : '✗'}
                    </span>
                  </p>
                </div>
                {selectedItem.available && (
                  <div className="flex items-center">
                    {cart[selectedItem.id] ? (
                      <div className="flex items-center bg-gray-100 rounded-full p-1">
                        <button 
                          onClick={() => updateQuantity(selectedItem.id, -1)}
                          className="bg-white text-red-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <span className="text-sm font-bold">-</span>
                        </button>
                        <span className="px-3 text-gray-800 font-semibold text-sm">
                          {cart[selectedItem.id]}
                        </span>
                        <button 
                          onClick={() => updateQuantity(selectedItem.id, 1)}
                          className="bg-white text-green-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          <span className="text-sm font-bold">+</span>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          addToCart(selectedItem);
                        }}
                        className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition-all duration-300 flex items-center shadow-md text-sm font-semibold"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UsersDishes;
