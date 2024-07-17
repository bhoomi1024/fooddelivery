import React, { useState } from 'react';
import { Grid, Typography, Modal, Box, Button, Card, CardContent } from '@mui/material';
import BackgroundImage from '../../assets/food.jpeg'; // Ensure the path is correct

const DelOrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    { id: '001', customerName: 'John Doe', details: '2x Pizza, 1x Coke', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    { id: '002', customerName: 'Jane Smith', details: '1x Burger, 2x Fries', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    { id: '001', customerName: 'John Doe', details: '2x Pizza, 1x Coke', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    { id: '002', customerName: 'Jane Smith', details: '1x Burger, 2x Fries', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    { id: '003', customerName: 'Alice Johnson', details: '3x Sushi, 1x Ramen', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    { id: '003', customerName: 'Alice Johnson', details: '3x Sushi, 1x Ramen', address: 'Chaman Singh Bagh Road, Ballia, Uttar Pradesh', contact: '9170302787' },
    // Add more orders as needed...
  ]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  const handleAccept = () => {
    console.log(`Order ${selectedOrder.id} accepted`);
    setSelectedOrder(null);
  };

  const handleReject = () => {
    console.log(`Order ${selectedOrder.id} rejected`);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrder.id));
    setSelectedOrder(null);
  };

  const OrderBox = ({ order, onClick }) => (
    <Card
      className="bg-yellow-50 shadow-lg hover:shadow-xl transition-shadow h-32 flex items-center justify-center cursor-pointer"
      onClick={() => onClick(order)}
    >
      <CardContent className="text-center">
        <Typography variant="h6" className="text-yellow-600 font-bold">
          Order #{order.id}
        </Typography>
        <Typography variant="body2" className="text-gray-800">
          {order.customerName}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-white ml-60 mt-20 w-full font-poppins h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <div className="w-full z-10">
        <Typography variant="h4" className="text-yellow-600 font-bold text-center mb-4">
          Orders
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <OrderBox order={order} onClick={handleOrderClick} />
            </Grid>
          ))}
        </Grid>
      </div>

      <Modal open={!!selectedOrder} onClose={handleClose}>
        <Box className="bg-white p-4 rounded-lg shadow-lg w-1/3 mx-auto mt-24 z-20">
          <Typography variant="h6" className="text-yellow-600 font-bold text-center mb-4">
            Order #{selectedOrder?.id}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            <strong>Customer Name:</strong> {selectedOrder?.customerName}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            <strong>Details:</strong> {selectedOrder?.details}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-2">
            <strong>Address:</strong> {selectedOrder?.address}
          </Typography>
          <Typography variant="body1" className="text-gray-800 mb-4">
            <strong>Contact:</strong> {selectedOrder?.contact}
          </Typography>
          <div className="flex justify-around">
            <Button variant="contained" color="success" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={handleReject}>
              Reject
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DelOrderManagement;
