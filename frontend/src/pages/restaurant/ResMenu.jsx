import React, { useState, useEffect } from 'react'
import RestaurantMenuCard from '../../components/AfterLoginRestaurantCompo/RestaurantMenu.jsx/RestaurantMenuCard'
import { MenuData } from './ResMenuCardData/ResMenuCardData';
import { IoMdAdd } from "react-icons/io"; 
import Modal from '../../components/AfterLoginRestaurantCompo/RestaurantMenu.jsx/RestaurantMenuForm';

const ResMenu = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  const repeatedItem = Array.from({ length: 12 }, () => MenuData).flat();
  return (
    <>
      <div className='bg-gray-100 ml-60 mt-[78px] w-full font-poppins'>
        <div className='flex justify-end items-center -mb-3'>
          <div className='flex items-center mr-24 mt-4 bg-white rounded-md shadow-md'>
            <p className='p-2 '>
              Add item
            </p>
            <button className='mr-2 p-[6px] rounded-2xl bg-gray-200 hover:bg-gray-300'
            onClick={showModal}>
              <IoMdAdd />
            </button>
          </div>
        </div>
        <Modal show={show} handleClose={hideModal}/>  
            
        {repeatedItem.map((menuItem, index) => (
          <RestaurantMenuCard
            key={index}
            src={menuItem.src}
            title={menuItem.dishTitle}
            description={menuItem.description}
            price={menuItem.price}
          />
        ))}
      </div>
    </>
  )
}

export default ResMenu