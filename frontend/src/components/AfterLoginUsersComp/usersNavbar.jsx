import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Heart, UserRound, ShoppingCart } from 'lucide-react';
import { SiGreasyfork } from 'react-icons/si';
import axios from 'axios';

const Navbar = ({ cartCount, likedCount }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [User, setUser] = useState([]);
  const navigate = useNavigate();

  const callUserDashboard = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/UsersRestaurant', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
  
      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const textData = await res.text(); // Get response as text
      console.log("Response text:", textData);
  
      if (!textData) {
        throw new Error("No data received");
      }
  
      try {
        const data = JSON.parse(textData); // Manually parse JSON
        console.log(data);
        setUser(data);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        navigate('/UserLogin');
      }
    } catch (err) {
      console.log(err);
      navigate('/UserLogin');
    }
  };

  useEffect(() => {
    callUserDashboard();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/UserLogout') // Corrected URL
      .then(res => {
        if (res.data.status) {
          navigate('/UserLogin');
        }
      })
      .catch(err => {
        console.log(err);
      });
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
          {/* ... (your center navigation links code here) */}

          {/* Right side - Search, Cart, Likes, Profile */}
          <div className="hidden md:block mr-8">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/UsersDishes" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
                </div>
              </div>
              <Link to="/UsersCart">
                <button className="ml-3 p-1 relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <Link to="/Usersliked">
                <button className="ml-3 p-1 relative">
                  <Heart className="h-6 w-6" />
                  {likedCount > 0 && (
                    <span className="absolute -top-3 -right-4 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {likedCount}
                    </span>
                  )}
                </button>
              </Link>
              <div className="relative">
                <button onClick={toggleDropdown} className="ml-3 p-1">
                  <UserRound className="h-6 w-6" />
                </button>
                <span className="inline-block h-6 w-6 ml-2">{User.ownerName}</span>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/UsersOrders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <ShoppingBag className="mr-2" />My orders
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="mr-2" />Log out
                    </button>
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
