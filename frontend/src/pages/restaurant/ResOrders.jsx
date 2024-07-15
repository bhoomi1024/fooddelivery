import React from 'react'

const ResOrders = () => {
    return (
        <div className='bg-gray-100 ml-60 mt-[78px] w-full font-poppins'>
            <div>
                <ul className='flex gap-x-6 p-4 text-neutral-500'>
                    <button className='flex p-1 bg-white ml-4 rounded-md w-32 justify-center shadow-md active:text-red-500'>
                        Preparing
                    </button>
                    <button className='flex p-1 bg-white rounded-md w-24 justify-center shadow-md'>
                        Ready
                    </button>
                    <button className='flex p-1 bg-white rounded-md w-44 justify-center  shadow-md'>
                        Out for delivery
                    </button>
                    <button className='flex p-1 bg-white rounded-md w-32 justify-center shadow-md'>
                        Past orders
                    </button>

                </ul>
            </div>
            <div className='flex justify-between mx-20 my-3 bg-white shadow-md rounded-md'>
                <div className='flex flex-col m-4'>
                    <div>
                        Order ID:
                    </div>
                    <div>
                        Customer's Name:
                    </div>
                </div>
                <div className='m-4'>
                    Order Info
                </div>
                <div className='flex flex-col m-4'>
                    <label htmlFor="status">Status</label>
                    <select name="" id="">
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Out for delivery">Out for delivery</option>
                    </select>

                </div>
            </div>
        </div>

    )
}

export default ResOrders