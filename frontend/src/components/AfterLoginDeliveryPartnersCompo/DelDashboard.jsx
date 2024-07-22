import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import UserImage from '../../assets/graph.jpeg'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const DelDashboard = () => {
  const navigate = useNavigate();
  const [delUser, setDelUser] = useState(null);

  const callDelDashboard = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/DelLayout/DelDashboard', { // Update with the correct backend URL and port
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
  
      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const textData = await res.text(); // Get response as text
      console.log("Response text:", textData);
  
      if (!textData) {
        throw new Error("No data received");
      }
  
      try {
        const data = JSON.parse(textData); // Manually parse JSON
        console.log(data);
        setDelUser(data);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        navigate('/DelLogin');
      }
    } catch (err) {
      console.log(err);
      navigate('/DelLogin');
    }
  };

  useEffect(() => {
    callDelDashboard();
  }, []);

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full font-poppins p-4 h-screen flex">
      <div>
        <h2 className='flex justify-center text-2xl my-4 font-semibold'>
          {delUser && delUser.ownerName}
        </h2>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-32 flex items-center justify-center mb-4 border border-yellow-300">
              <CardContent className="text-center">
                <Typography variant="h6" className="text-yellow-600 font-bold">
                  Pending Orders
                </Typography>
                <ul className="list-disc pl-5 text-gray-800">
                  <li>Order #001</li>
                  <li>Order #002</li>
                  <li>Order #003</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-32 flex items-center justify-center mb-4 border border-yellow-300">
              <CardContent className="text-center">
                <Typography variant="h6" className="text-yellow-600 font-bold">
                  Completed Orders
                </Typography>
                <ul className="list-disc pl-5 text-gray-800">
                  <li>Order #101</li>
                  <li>Order #102</li>
                  <li>Order #103</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-32 flex items-center justify-center mb-4 border border-yellow-300">
              <CardContent className="text-center">
                <Typography variant="h6" className="text-yellow-600 font-bold">
                  Earnings
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  Daily: <strong>$200</strong>
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  Weekly: <strong>$1400</strong>
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  Monthly: <strong>$6000</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-32 flex items-center justify-center mb-4 border border-yellow-300">
              <CardContent className="text-center">
                <Typography variant="h6" className="text-yellow-600 font-bold">
                  Performance Metrics
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  Average Delivery Time: <strong>30 mins</strong>
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  Ratings: <strong>4.5/5</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Image on the side with increased top distance */}
      <div className="w-1/3 flex items-start justify-center mt-12">
        <img src={UserImage} alt="User" className="w-64 h-48 object-cover rounded-none" />
      </div>
    </div>
  );
};

export default DelDashboard;
