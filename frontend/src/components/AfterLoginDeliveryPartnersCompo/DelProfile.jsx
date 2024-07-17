import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import BackgroundImage from '../../assets/profile.jpg'; // Ensure the path is correct

const DelProfile = () => {
  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full font-poppins h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow 
      w-full max-w-xl p-8 border border-yellow-300 relative z-10">
        <CardContent className="text-center">
          <Typography variant="h4" className="text-yellow-500 font-bold mb-4">
            Profile
          </Typography>

          <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
            Personal Information
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Name: <strong>John Doe</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Email: <strong>john@example.com</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Phone: <strong>(123) 456-7890</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Address: <strong>123 Main St</strong>
          </Typography>

          <div className="mt-4">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Documents Upload
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Driving License Number: <strong>Uploaded</strong>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelProfile;

