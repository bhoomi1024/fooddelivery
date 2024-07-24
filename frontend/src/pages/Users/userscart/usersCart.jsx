import React, { useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../../redux/slices/cartSlice';
import { loadStripe } from '@stripe/stripe-js'
import AddressPopup from './AddressPopup';


const UsersCart = () => {
  const [address, setAddress] = useState('');
  const [showCartTotal, setShowCartTotal] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId');
  const cartItems = useSelector(state => state.cart.cartItems.filter(cartItem => cartItem.userId == userId));


  const calculateTotal = (item) => item.price * item.quantity;
  const cartTotal = cartItems.reduce((total, item) => total + calculateTotal(item), 0);
  const dispatch = useDispatch();

  const handleRemoveItem = (_id) => {
    dispatch(removeFromCart({_id:_id, userId:userId}));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setShowCartTotal(true);
    setShowAddressPopup(false);
    setIsEditing(false);
  };

  const handleEditAddress = () => {
    setIsEditing(true);
    setShowAddressPopup(true);
  };

  // payment integration
  const makePayment = async() => {
    const stripe = await loadStripe("pk_test_51PfmkeSHU32U4EZ1ZZGtsGphSf8hRGDxOkmHEji0Txy2lTBErrWG1iFddikkHggxolUXWrVad0Ch2uafIkO8XZoq00HBrrW9zb");

    const body = {
      products: cartItems
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch("http://localhost:3000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    if(result.error) {
      console.log(result.error);
    }
  }

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
                  <th className="border p-3 text-center">Title</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Quantity</th>
                  <th className="border p-3 text-center">Total</th>
                  <th className="border p-3 text-center">Remove item</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="border p-3">{item.dishName}</td>
                    <td className="border p-3">Rs. {item.price.toFixed(2)}</td>
                    <td className="flex justify-center border p-3">
                      <button
                        onClick={() => {
                          dispatch(decrementQuantity({_id:item._id, userId: userId}));
                        }}
                        className="px-3 py-2 text-red-500 hover:text-red-600 transition-colors duration-300 focus:outline-none"
                      >
                        <svg className="w-5 h-5 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 12H4"></path>
                        </svg>
                      </button>
                      <p className="px-3 py-2 font-semibold text-gray-800 bg-neutral-200 rounded-sm">{item.quantity}</p>
                      <button
                        onClick={() => {
                          dispatch(incrementQuantity({_id:item._id, userId:userId}));
                          }}
                        className="px-3 py-2 text-green-500 hover:text-green-600 transition-colors duration-300 focus:outline-none"
                      >
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                    </td>
                    <td className="border p-3">Rs. {calculateTotal(item).toFixed(2)}</td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-neutral-800 hover:text-neutral-950 transition duration-300">
                        <span >
                          <MdDelete size={24} />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:w-1/3">
            {!showCartTotal ? (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Ready to complete your order?</h2>
                <button
                  onClick={() => setShowAddressPopup(true)}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Enter Delivery Address
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                  <button
                    onClick={handleEditAddress}
                    className="text-yellow-500 hover:text-yellow-600 transition duration-300"
                  >
                    <MdEdit size={24} />
                  </button>
                </div>
                <p className="mb-4 p-3 bg-white rounded shadow">{address}</p>
                <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                <p className="mb-4">Total: Rs {cartTotal.toFixed(2)}</p>
                <button
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                  onClick={makePayment}
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddressPopup 
        showAddressPopup={showAddressPopup}
        isEditing={isEditing}
        address={address}
        setAddress={setAddress}
        handleAddressSubmit={handleAddressSubmit}
        setShowAddressPopup={setShowAddressPopup}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default UsersCart;