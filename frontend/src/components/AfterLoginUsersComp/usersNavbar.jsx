import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaSearch as FaSearchIcon } from 'react-icons/fa';
import { SiGreasyfork } from 'react-icons/si';

import { Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Heart, UserRound, ShoppingCart,Search,Sun   } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-white shadow-md h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left side - Title */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex justify-center items-center">
              <Link to="/UsersRestaurant" className="flex items-center">
                <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
                  <span className="text-yellow-400 flex justify-center items-center">
                    <span>fo</span>
                    <SiGreasyfork className="rotate-90 mt-1 mr-[1px]" size={20} />
                    <span>die</span>
                  </span>
                  <span>Buddy</span>
                </h1>
              </Link>
            </div>
          </div>

          {/* Center - Navigation Links */}
         

          {/* Right side - Search, Cart, Likes, Profile */}
          <div className="hidden md:block mr-8">
            <div className="ml-4 flex items-center md:ml-6">
            <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              
              <Link to="/UsersDishes" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
              
            </div>
          </div>
            
              <button className="ml-3 p-1">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <Link to="/Usersliked">
                <button className="ml-3 p-1">
                  <Heart className="h-6 w-6" />
                </button>
              </Link>
              <div className="relative">
                <button onClick={toggleDropdown} className="ml-3 p-1">
                  <UserRound className="h-6 w-6" />
                </button>
                <span className='inline-block h-6 w-6 ml-2 '>Name</span>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/UsersOrders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <ShoppingBag className="mr-2" />My orders
                    </Link>
                    <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="mr-2" />Log out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
