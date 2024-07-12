import React from 'react'
import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import toast from 'react-hot-toast';
const ResDetails = () => {
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
        // window.location.reload(false);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://your-api-url", {
                method: "POST",
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
        <div className='bg-gray-100 ml-60 mt-[78px] h-[520px] w-full font-display'>
            <form className='my-4 mx-24 flex flex-col bg-white gap-y-4 pb-4' onSubmit={handleSubmit}>
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
                <div className='space-x-12 mx-6'>
                    <span >
                        Restaurant Name :
                        <input
                            type="text"
                            id="restaurantName"
                            placeholder="Restaurant Name"
                            className="mt-1 ml-2 px-3 py-2 w-[284px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                    <span>
                        Owner Name :
                        <input
                            type="text"
                            id="ownerName"
                            placeholder="Owner's Name"
                            className="mt-1 ml-2 px-3 py-2 w-72 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                </div>
                <div className='space-x-14 mx-6'>
                    <span >
                        Country Name :
                        <input
                            type="text"
                            id="country"
                            placeholder="Country"
                            className="mt-1 ml-2 px-3 py-2 w-[302px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                    <span>
                        State Name :
                        <input
                            type="text"
                            id="stateName"
                            placeholder="State"
                            className="mt-1 ml-2 px-3 py-2 w-[293px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                </div>
                <div className='space-x-28 mx-6'>
                    <span >
                        City :
                        <input
                            type="text"
                            id="city"
                            placeholder="City"
                            className="mt-1 ml-2 px-3 py-2 w-72 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                    <span>
                        Address :
                        <input
                            type="text"
                            id="address"
                            placeholder="Address"
                            className="mt-1 ml-2 px-3 py-2 w-[352px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                </div>
                <div className='space-x-16 mx-6'>
                    <span >
                        Opening Hour :
                        <input
                            type="time"
                            id="opening Hour"
                            placeholder="Opening time"
                            className="mt-1 ml-2 px-3 py-2 w-[288px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={openingHour}
                            onChange={(e) => setOpeningHour(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                    <span>
                        Closing Hour :
                        <input
                            type="time"
                            id="Closing hour"
                            placeholder="Closing time"
                            className="mt-1 ml-2 px-3 py-2 w-[288px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={closingHour}
                            onChange={(e) => setClosingHour(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                </div>
                <div className='ml-6 font-bold -mb-2'>
                    Contact details:
                </div>
                <div className='space-x-32 mx-6 mb-4'>
                    <span >
                        Contact number :
                        <input
                            type="text"
                            id="contact"
                            placeholder="Contact number"
                            className="mt-1 ml-2 px-3 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
                    <span>
                        Email Id :
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="mt-1 ml-2 px-3 py-2 w-[296px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editable}
                        />
                    </span>
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

export default ResDetails