import React from 'react'
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const ResEditDelMenuDialog = ({ show, hideEditDelDialog }) => {
    return (
        <>
            <div className={` absolute inset-x-0 inset-y-auto m-0 translate-x-[1012px] translate-y-[10px] z-10  ${show ? '' : 'hidden'} `}>
                <div className='w-48 h-[99px] py-2 m-2 shadow-lg bg-white rounded-md border border-gray-200'>
                <ul className="  font-poppins">
                    <li className='w-full hover:bg-gray-100'>
                        <a className='flex items-center p-2 gap-x-4' href="">
                            <span className='ml-3'><FiEdit/></span>
                            <span>Edit item</span>
                        </a>
                    </li>
                    <li className='w-full hover:bg-gray-100'>
                        <a className='flex items-center p-2 gap-x-4' href="">
                            <span className='ml-3'><AiOutlineDelete size={18}/></span>
                            <span>Delete item</span>
                        </a>
                    </li>
                </ul>
                </div>


                {/*                 
                <div className="fixed inset-0 "> 
                                    
                </div>
                <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 z-10 w-44 font-poppins">
                    <div className='flex bg-purple-200'>
                        <span>
                            <FiEdit/>
                        </span>
                        <span>
                            Edit
                        </span>
                    </div>
                    <div className='flex bg-green-200'>
                        <span>
                            <LuDelete/>
                        </span>
                        <span>
                          Delete item
                        </span>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default ResEditDelMenuDialog