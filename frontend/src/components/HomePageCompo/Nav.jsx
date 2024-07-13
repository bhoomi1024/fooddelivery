import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { SiGreasyfork } from "react-icons/si";

const Nav = () => {
  const [loggedIn,setLoggedIn] = useState(true);

  return (
    <div className="h-20 w-full fixed z-[50] bg-white top-0">
      <div className="p-5 flex justify-center shadow-md ">
        <nav className="flex gap-x-40">
          <div className="flex justify-center items-center">
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-yellow-400 flex justify-center items-center">
                <span>fo</span>
                <SiGreasyfork className='rotate-90 mt-1 mr-[1px]' size={20} />
                <span>die</span>
              </span>
              <span>Buddy</span>
            </h1>
          </div>
          <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
            <div className="relative mx-auto w-96">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg shadow-sm border border-gray-400"
                placeholder="Search restaurants or items"
                required
              />
            </div>
            <Link to="/DeliveryPartnerLoginRegister">
              <li className="hover:cursor-pointer hover:scale-[0.975]">
                Delivery partner
              </li>
            </Link>

          {/* If restaurant is logged in then it goes to admin dashboard else it goes to login for restaurant */}
            <Link to= "/RestaurantLoginRegister">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Restaurant login
            </li>
            </Link>

            <Link to="/UserLoginRegister">
              <li className="flex justify-center items-center gap-x-1 hover:cursor-pointer hover:scale-[0.975]">
                Login/Register <VscAccount size={20} />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
