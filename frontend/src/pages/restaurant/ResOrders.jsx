import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ResOrders = () => {

    //Get restaurant orders
    const resId = localStorage.getItem('restaurantId');
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');

    const getOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/order/getOrdersByResId/${resId}`,
                {
                    withCredentials: true,
                }
            );
            console.log(res.data);
            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Update order status
    const updateOrderStatus = async (orderId,newstatus) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/order/updateOrder/${orderId}`,
                {
                    orderStatus: newstatus
                },
                {
                    withCredentials: true,
                }
            );
            console.log('status updated', res.data);
            getOrders();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    const handleStatusChange = (e, orderId) => {
        setStatus(e.target.value);
        updateOrderStatus(orderId,e.target.value);
    }

    return (
        <div className='bg-gray-100 ml-60 mt-[78px] w-full font-poppins'>
            <div>
                <ul className='flex gap-x-6 p-4 text-neutral-500'>

                    <button className='flex p-1 bg-white rounded-md w-32 justify-center shadow-md'>
                        Past orders
                    </button>

                </ul>
            </div>
           
                {
                    orders.map((order) => (
                        <>
                         <div className='flex justify-between mx-20 my-3 bg-white shadow-md rounded-md'>

                            <div className='flex flex-col m-4 p-2'>
                                <div>
                                    Order ID: {order.paymentId.orderId}
                                    {/* //Change this to payment order id */}
                                </div>
                                <div>
                                    Customer's Name:{order.user.ownerName}
                                </div>
                            </div>
                            <div className='m-4'>
                                Order Info:
                                {
                                    order.orderItems.map((item) => (
                                        <div>
                                            {item.item.dishName} - {item.quantity}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col m-4'>
                                <label htmlFor="status">Status</label>
                                <select name="" id="" value={status} onChange={(e) => { handleStatusChange(e, order._id) }} className='shadow-md border-none rounded-md'>
                                    <option value={order.orderStatus}>{order.orderStatus}</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Ready">Ready</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                </select>

                            </div>
                            </div>
                        </>
                    ))
                }
            </div>
    )
}

export default ResOrders