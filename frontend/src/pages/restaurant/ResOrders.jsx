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
                <div className='flex mx-8 my-3 bg-white shadow-md'>
                    <div>
                            
                    </div>
                    <div>

                    </div>
                </div>
            </div>
       
    )
}

export default ResOrders