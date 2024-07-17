import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import BackgroundImage from '../../assets/graph.jpeg'; // Ensure the path is correct

const DelEarnings = () => {
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

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow w-full max-w-xl p-8 border border-yellow-300 relative z-10">
        <CardContent className="text-center">
          <Typography variant="h4" className="text-yellow-500 font-bold mb-4">
            Earnings and Payouts
          </Typography>

          <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
            Earnings History
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

          <div className="mt-4">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Payout Method
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Bank Account: <strong>**** **** 1234</strong>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelEarnings;
