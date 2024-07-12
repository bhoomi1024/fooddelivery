import React, { useState, useEffect } from "react";
import ResForgotPasswordDialog from "../../components/RestaurentLoginRegisterCompo/ResForgotPasswordDialog";

import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";
import wayConceptImage from "../../assets/way-concept-illustration.png"; // Import the image
import Footer from "../../components/HomePageCompo/Footer";

const DeliveryPartnerLoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
 
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !firstName || !lastName || !phone || !email) {
      setError("Please fill in all fields");
      return;
    }

    // Example of API call (replace with your backend endpoint)
    try {
      const response = await fetch("https://your-api-url/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, firstName, lastName, phone, email }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Handle successful registration
      setError("");
      // Redirect or set authentication state
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`h-20 w-full fixed z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md' } top-0`}>
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-yellow-400 flex justify-center items-center">
                <span>fo</span>
                <SiGreasyfork className="rotate-90 mt-1 mr-[1px]" size={20} />
                <span>die</span>
              </span>
              <span>Buddy</span>
            </h1>
          </div>
          <nav className="flex gap-x-7 items-center">
            <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
              <li>
                <Link to="/" className={`text-gray-700 hover:text-gray-900 ${isScrolled ? 'bg-gray' : ''}`}>
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center mt-16 lg:flex-row lg:justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md m-4 lg:m-0 lg:ml-16 mt-4">
          <h2 className="text-2xl font-bold mb-4">DeliveryPartner Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder="Username or Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
          <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
            Login with Gmail
          </button>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
            <button
             
              className="text-sm text-blue-500 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
        <div
          className="hidden lg:flex flex-1 bg-cover bg-center"
          style={{
            backgroundImage: `url(${wayConceptImage})`,
            minHeight: "calc(100vh - 80px)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Background image container */}
        </div>
      </div>
     
     
      <Footer />
    </div>
  );
};

export default DeliveryPartnerLoginRegister ;
