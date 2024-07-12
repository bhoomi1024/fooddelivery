import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import ResEditDelMenuDialog from './ResEditDelMenuDialog';

const RestaurantMenuCard = (props) => {
    const [show, setShow] = useState(false);

    const showEditDelDialog = () => {
      setShow(true);
    };
  
    const hideEditDelDialog = () => {
      setShow(false);
    };
    useEffect(() => {
      if (show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [show]);
    return (
        <>
            <div className='flex items-center my-8 mx-24 border border-neutral-300 bg-white rounded-xl'>
                <div className='flex justify-center items-center h-44 w-44 '>
                    <img src={props.src} alt="food image" className='h-[70%] w-[70%] object-cover size-60 ' />
                </div>
                <div className='flex flex-col gap-y-3 ml-5 py-4 w-[700px]'>
                    <div className='flex justify-between items-center max-w-[680px]'>
                        <h1 className='text-xl font-semibold'>
                            {props.title}
                        </h1>
                        <div className='flex gap-x-3'>
                            <label class="inline-flex items-center cursor-pointer">
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">Out of stock</span>
                                <input type="checkbox" value="" class="sr-only peer" />                             
                                <div class="relative w-11 h-6 bg-gray-300 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                
                            </label>
                            <button onClick={showEditDelDialog}>
                                <BsThreeDotsVertical size={20}/>
                            </button>
                            <ResEditDelMenuDialog show={show} hideEditDelDialog={hideEditDelDialog}/>
                        </div>
                    </div>
                    <div>
                        <p className='flex flex-wrap max-w-[680px]'>
                            {props.description}
                        </p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>
                            {props.price}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantMenuCard