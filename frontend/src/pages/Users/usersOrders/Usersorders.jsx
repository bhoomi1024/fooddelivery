import React, { useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';

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

const Usersorder = () => {
  const [orders, setOrders] = useState([
    { id: 1, price: 50.00, status: 'Processing' },
    { id: 2, price: 75.50, status: 'Shipped' },
    { id: 3, price: 25.99, status: 'Delivered' },
  ]);

  const handleCancelOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
  };

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.status !== 'Cancelled' ? (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <span className="text-gray-500">Cancelled</span>
                    )}
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

export default Usersorder;