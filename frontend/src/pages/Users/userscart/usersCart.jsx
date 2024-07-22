import React, { useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import { useSelector } from 'react-redux';

const UsersCart = () => {
  const [promoCode, setPromoCode] = useState('');

  // Sample cart items (replace with actual data)
  const cartItems = useSelector(state => state.cart.cart) 

  const calculateTotal = (item) => item.price * item.quantity;
  const cartTotal = cartItems.reduce((total, item) => total + calculateTotal(item), 0);

  const handleRemoveItem = (id) => {
    // Implement remove item logic
  
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Title</th>
                  <th className="border p-3 text-left">Price</th>
                  <th className="border p-3 text-left">Quantity</th>
                  <th className="border p-3 text-left">Total</th>
                  <th className="border p-3 text-left">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="border p-3">{item.title}</td>
                    <td className="border p-3">Rs. {item.price.toFixed(2)}</td>
                    <td className="border p-3">{item.quantity}</td>
                    <td className="border p-3">Rs. {calculateTotal(item).toFixed(2)}</td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-yellow-500 hover:text-yellow-600 transition duration-300"
                      >
                        <span className="text-xl font-bold">×</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
              <p className="mb-4">Total: Rs {cartTotal.toFixed(2)}</p>
              <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
                Proceed to Payment
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersCart;