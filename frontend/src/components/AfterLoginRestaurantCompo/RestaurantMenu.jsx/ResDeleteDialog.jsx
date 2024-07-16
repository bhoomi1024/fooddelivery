// src/components/Modal.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';

const DeleteDialog = ({ show, handleClose,id }) => {

    // Define the spring animation for the modal
    const animation = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0%)' : 'translateY(-50%)',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://your-api-url", {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Item could not be deleted!");
            }
            toast.success("Item deleted successfully!");
        } catch (error) {
            handleClose();
            toast.error("Item could not be deleted!");
        }
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50" onClick={handleClose}></div>
                    <animated.div style={animation} className="bg-white rounded-lg p-6 z-10 w-1/3 font-display">
                        <form onSubmit={handleSubmit}>
                            <h1 className='font-bold text-xl pb-3'>
                                Are you sure you want to delete this item?
                            </h1>                               
                            <div className='flex gap-x-3'>
                                <button
                                    className="mt-4 bg-neutral-900 hover:scale-[0.95] text-white font-bold py-2 px-4 rounded"
                                >
                                    Confirm
                                </button>
                                <button
                                    className="mt-4 bg-gray-300 py-2 px-4 rounded hover:scale-[0.95]"
                                    onClick={handleClose}
                                    type='button'
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </animated.div>
                </div>
            )}
        </>
    );
};

export default DeleteDialog;
