import React from "react";
import Card from "../../components/HomePageCompo/Card";
import { FaBowlFood } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { data } from "./RestaurentcardData/foodData";
import logo from "../../assets/food-delivery-main page.avif"
const Home = () => {
  // Duplicate the data array 5 times
  const repeatedData = Array.from({ length: 12 }, () => data).flat();
  return (
    <>
      <div className="hidden w-full h-[550px] md:grid lg:grid-cols-2 bg-yellow-300 mt-20">
        <div className="h-full flex flex-col items-center ">
          
          {/*grid column 1 containing image */}
          <h1 className="mt-24 ml-7 text-7xl  gap-y-6 flex flex-col font-display font-extrabold">
            <span>One stop</span>
            <span>for all your</span>
            <span>
              <span className="text-green-700">Food </span>
              cravings
            </span>
          </h1>
          <p className="mt-11 ml-10 tracking-[0.01em] text-[20px] font-poppins font-semibold">
            Hungry? Sick of a boring diet plan? We deliver
          </p>
          <p className="ml-12 tracking-[0.01em] text-[20px] font-poppins font-semibold">
            fresh and delicious food right at your doorstep.
          </p>
        </div>
        <div className="h-full">
          {" "}
          {/* grid column 2 containing image*/}
          <img
            className="ml-20 mt-9 h-[460px] w-[485px] rounded-full shadow-lg"
            src={logo}
            alt="food delivery"
          />
        </div>
      </div>
      {/* first grid ends */}

      {/*second grid starts */}
      <div className="hidden md:grid grid-cols-2 bg-gradient-to-r from-neutral-100 to-yellow-100">
        <div className="size-[180] ml-14 mt-14 ">
          <img
            src="https://www.shutterstock.com/image-photo/dosa-thin-batterbased-dish-originating-600nw-2189193999.jpg"
            alt="food image"
          />
        </div>
        <div className="mt-16 mr-16 ml-10 space-y-8">
          <p className="text-4xl font-display font-extrabold ">
            We offer best quality food and excellent services
          </p>
          <p className="font-poppins text-[16px] ">
            FoodieBuddy brings your favorite restaurant meals straight to your
            door, offering convenience and variety at your fingertips. Enjoy
            delicious food and essentials delivered swiftly, making mealtime
            effortless and enjoyable.
          </p>
          <div className="h-[210px] w-[590px] flex gap-x-8 font-poppins">
            <div className="h-36 w-40 border border-gray-200 shadow-md rounded-md hover:border-gray-950 transition duration-100 bg-white">
              <div className="flex ml-7 mt-6">
                <FaBowlFood size={30} />
              </div>
              <div className="flex text-lg mt-5 ml-6 font-medium ">
                Fresh Food
              </div>
            </div>
            <div className="h-36 w-40 border border-gray-200 shadow-md rounded-md hover:border-gray-950 transition duration-100 bg-white">
              <div className="flex mt-6 ml-6 ">
                <IoTimerOutline size={35} />
              </div>
              <div className="flex justify-center text-lg mt-3 ml-6 mr-3 flex-wrap font-medium">
                Quick Delivery
              </div>
            </div>
            <div className="h-36 w-40 border border-gray-200 shadow-md rounded-md hover:border-gray-950 transition duration-100 bg-white">
              <div className="flex ml-6 mt-6">
                <BiSolidOffer size={35} />
              </div>
              <div className="flex justify-center text-lg mt-3 ml-6 mr-3 flex-wrap font-medium">
                Amazing Offers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Card */}
      <h1 className="ml-36 mt-10 font-extrabold text-4xl font-display">
        Top restaurants for you
      </h1>
      <div className="hidden md:grid grid-cols-4 mx-16 my-6 pl-20  pt-6 pb-10 gap-y-12">
        {repeatedData.map((food, index) => (
          <Card
            key={index} // Make sure to add a unique key prop
            src={food.src}
            restaurant={food.restaurant}
            cuisine={food.cuisine}
            rating={food.rating}
            address={food.address}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
