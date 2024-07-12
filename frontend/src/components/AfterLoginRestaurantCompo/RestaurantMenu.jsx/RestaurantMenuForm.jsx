// src/components/Modal.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Modal = ({ show, handleClose }) => {
    const [image, setImage] = useState(null);
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://your-api-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image, dishName, price, description }),
            });

            if (!response.ok) {
                throw new Error("Item could not be added!");
            }
            toast.success("Item added successfully!");
            console.log({image, dishName, price, description});

        } catch (error) {
            toast.error("Item could not be added!");
            handleClose();
        }

    }

    return (
        <>
            <div className={`fixed inset-0 flex items-center justify-center  ${show ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 "></div>
                <div className="bg-white rounded-lg p-6 z-10 w-1/3 font-display animate-modalf">
                    <form onSubmit={handleSubmit}>
                        <h1 className='font-bold text-xl pb-3'>
                            Add new item
                        </h1>
                        <div className='flex gap-x-3 mb-2'>
                            <div className='w-60'>
                                <label htmlFor="name" class="block mb-1 text-sm font-medium text-gray-900">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Type product name"
                                    value={dishName}
                                    onChange={(e) => {
                                        setDishName(e.target.value)
                                    }}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="price" class="block mb-1 text-sm font-medium text-gray-900">Price</label>
                                <input
                                    type="number"
                                    name="price" id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Set Price"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    required />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                            <textarea
                                id="description"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Write product description here"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }} />

                        </div>
                        <div>
                            <label htmlFor="name" class="block mb-1 text-sm font-medium text-gray-900">Item Image</label>
                            <input
                                type="file"
                                name="image"
                                id="img"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value)
                                }} />
                        </div>
                        <div className='flex gap-x-3'>
                            <button
                                className="mt-4 bg-neutral-900 hover:scale-[0.95] text-white font-bold py-2 px-4 rounded"

                            >
                                Add item
                            </button>
                            <button
                                className="mt-4 bg-gray-300 py-2 px-4  rounded hover:scale-[0.95]"
                                onClick={handleClose}
                                type='button'
                            >
                                Close
                            </button>
                        </div>
                    </form>



                </div>
            </div>
        </>
    );
};

export default Modal;