import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import axios from 'axios';
import UsersCart from '../userscart/usersCart';
const StatusBadge = ({ status }) => {
  let bgColor, textColor;
  switch (status) {
    case 'Processing':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Shipped':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'Delivered':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Cancelled':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const UsersOrder = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState({});

  const userOrder = async () => {
    try {
      const api = await axios.get('http://localhost:3000/api/payment/UsersOrders', {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log("user order ", api.data);
      setOrders(api.data);
      if (api.data.length > 0) {
        setLatestOrder(api.data[0]);
      }
    } catch (error) {
      console.error("Error fetching user orders: ", error);
    }
  };

  useEffect(() => {
    userOrder();
    dispatch(fetchDeliveryAddresses());
    dispatch(handlePayment());
  }, [dispatch]);

  console.log("latestOrder", latestOrder);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersOrder;
