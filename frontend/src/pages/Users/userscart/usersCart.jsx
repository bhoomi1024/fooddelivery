import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../../redux/slices/cartSlice';
import { useNavigate } from "react-router-dom";
import AddressPopup from './AddressPopup';
import axios from 'axios';

const UsersCart = () => {
  const [userAddress, setUserAddress] = useState({});
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [showCartTotal, setShowCartTotal] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState(null);
  const cartItems = useSelector(state => state.cart.cartItems.filter(cartItem => cartItem.userId === userId));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchDeliveryAddresses());
    dispatch((handlePayment()))
  }, [dispatch])

  const fetchDeliveryAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/addresses/deliveryaddress/${userId}`);
      setUserAddress(response.data.fullAddress);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while fetching the delivery addresses');
      }
    }
  };

  const handleDeliveryAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/addresses/deliveryaddress", {
        userId,
        address,
        country,
        state,
        city,
      });
      console.log(response);
      setShowCartTotal(true);
      setShowAddressPopup(false);
      setIsEditing(false);
      fetchDeliveryAddresses();
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        console.error(err.response.status);
        setError(err.response.data.error);
      } else {
        console.error(err);
      }
    }
  };

  const handlePayment = async () => {
    try {
      const body = { products: cartItems, userAddress };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch("http://localhost:3000/api/payment/checkout", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const orderResponse = await response.json();
      const { orderId, amount: orderAmount } = orderResponse;

      var options = {
        key: "rzp_test_Jp05EcVr7cQRf3",
        amount: orderAmount * 100,
        currency: "INR",
        name: "Foodiebuddy",
        description: "Food delivery website",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            ownerId: userId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cartItems,
            shippingadress :userAddress,
            quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
          };

          const api = await fetch("http://localhost:3000/api/payment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          const apiResponse = await api.json();
          console.log("razorpay res ", apiResponse);
          if (apiResponse.success) {
            clearCart();
            navigate("/UsersOrders");
          } else {
            console.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Bhoomi Verma",
          email: "vbhoomi1024@gmail.com",
          contact: "9170302787",
        },
        notes: {
          address: "krishna nagar",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log("Order response:", orderResponse);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleEditAddress = () => {
    setIsEditing(true);
    setShowAddressPopup(true);
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
                          dispatch(decrementQuantity({ _id: item._id, userId: userId }));
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
                          dispatch(incrementQuantity({ _id: item._id, userId: userId }));
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
            {showCartTotal ? (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                  <button
                    onClick={handleEditAddress}
                    className="bg-white border rounded-md px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 transition duration-300"
                  >
                    <MdEdit size={20} />
                    <span>Edit</span>
                  </button>
                </div>
                {userAddress && (
                  <div>
                    <p>{userAddress.address}</p>
                    <p>{userAddress.country}</p>
                    <p>{userAddress.state}</p>
                    <p>{userAddress.city}</p>
                  </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-4">
                  <button
                    onClick={handlePayment}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 transition duration-300 hover:bg-blue-600 focus:outline-none"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Enter Delivery Address</h2>
                <AddressPopup
                  address={address}
                  setAddress={setAddress}
                  country={country}
                  setCountry={setCountry}
                  state={state}
                  setState={setState}
                  city={city}
                  setCity={setCity}
                  handleDeliveryAddress={handleDeliveryAddress}
                  setShowAddressPopup={setShowAddressPopup}
                  showAddressPopup={showAddressPopup}
                  isEditing={isEditing}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersCart;

