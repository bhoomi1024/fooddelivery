import React from 'react'
import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import toast from 'react-hot-toast';
const Details = () => {
    // will be fetched from backend
    const restaurantData = {
        restaurantName: "Haldiram's",
        ownerName: "XYZ",
        country: "India",
        state: "Delhi",
        city: "Delhi",
        address: "Krishna Nagar",
        openingHour: "11:00",
        closingHour: "20:00",
        contactNo: "7903208367",
        email: "xyz@gmail.com"
    };
    const [restaurantName, setRestaurantName] = useState(restaurantData.restaurantName);
    const [ownerName, setOwnerName] = useState(restaurantData.ownerName);
    const [country, setCountry] = useState(restaurantData.country);
    const [state, setState] = useState(restaurantData.state);
    const [city, setCity] = useState(restaurantData.city);
    const [address, setAddress] = useState(restaurantData.address);
    const [openingHour, setOpeningHour] = useState(restaurantData.openingHour);
    const [closingHour, setClosingHour] = useState(restaurantData.closingHour);
    const [contactNo, setContactNo] = useState(restaurantData.contactNo);
    const [email, setEmail] = useState(restaurantData.email);
    const [editable, setEditable] = useState(false);

    const handleCancel = () => {
        setEditable(false);
        window.location.reload(false);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://your-api-url", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ restaurantName, ownerName, country, state, city, address, openingHour, closingHour, contactNo, email }),
            });

            if (!response.ok) {
                throw new Error("Could not update !!");
            }
            toast.success("Updated successfully!");
            setEditable(false);

        } catch (error) {
            toast.error("Could not update information!");
            setEditable(false);
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        }

    }
    return (
        <div className='bg-gray-100 ml-60 mt-[78px] w-full font-display'>
            <form className='my-4 mx-32 flex flex-col bg-white gap-y-4 pb-4' onSubmit={handleSubmit}>
                <div className='flex '>
                    <div className='w-full'>
                        <h1 className='flex justify-center items-center font-bold text-3xl mt-4'>
                            {restaurantName}
                        </h1>
                    </div>
                    <button className='p-2 mt-4 flex justify-end items-center mr-10 bg-gray-100 rounded-md hover:bg-gray-200'
                        onClick={() => setEditable(true)}
                        type='button'>
                        <MdEdit size={24} />
                    </button>
                </div>
                <div className='flex justify-center gap-x-10 '>
                    <div className='w-80'>
                        <label htmlFor="resName" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Restaurant Name</label>
                        <input
                            type="text"
                            id="restaurant name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={restaurantName}
                            onChange={(e) =>
                               { setRestaurantName(e.target.value)}}
                            required 
                            disabled={!editable}/>
                    </div>
                    <div className='w-80'>
                        <label htmlFor="resOwner" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Owner's Name</label>
                        <input
                            type="text"
                            id="Owner name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                            disabled={!editable}/>
                    </div>
                </div>
                
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="country" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Country Name</label>
                        <input
                            type="text"                            
                            id="country"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={country}
                            onChange={(e) =>
                               { setCountry(e.target.value)}}
                            required 
                            disabled={!editable}/>
                    </div>
                    <div className='w-80'>
                        <label htmlFor="state" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">State Name</label>
                        <input
                            type="text"
                            id="state"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            disabled={!editable}/>
                    </div>
                </div>
                
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="city" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">City</label>
                        <input
                            type="text"                            
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={city}
                            onChange={(e) =>
                               { setCity(e.target.value)}}
                            required 
                            disabled={!editable}/>
                    </div>
                    <div className='w-80'>
                        <label htmlFor="address" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled={!editable}/>
                    </div>
                </div>
                
                
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="openingTime" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Opening Hour</label>
                        <input
                            type="time"                            
                            id="openingTime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={openingHour}
                            onChange={(e) =>
                               { setOpeningHour(e.target.value)}}
                            required 
                            disabled={!editable}/>
                    </div>
                    <div className='w-80'>
                        <label htmlFor="closingTime" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Closing Hour</label>
                        <input
                            type="time"
                            id="closingTime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={closingHour}
                            onChange={(e) => setClosingHour(e.target.value)}
                            required
                            disabled={!editable}/>
                    </div>
                </div>

                <div className='ml-[90px] font-bold -mb-2'>
                    Contact details:
                </div>
                
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="contact" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Contact</label>
                        <input
                            type="text"                            
                            id="contact"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={contactNo}
                            onChange={(e) =>
                               { setContactNo(e.target.value)}}
                            required 
                            disabled={!editable}/>
                    </div>
                    <div className='w-80'>
                        <label htmlFor="email" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editable}/>
                    </div>
                </div>
                {editable && <div className='flex justify-center gap-x-4'>
                    <button
                        type="submit"
                        className="w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                    <button
                        type="reset"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>}

            </form>
        </div>
    )
}

export default Details