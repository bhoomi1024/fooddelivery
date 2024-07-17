import React, { useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BackgroundImage from '../../assets/profile.jpg'; // Ensure the path is correct

const faqs = [
  {
    question: "What is the delivery process?",
    answer: "The delivery process involves several steps: order placement, preparation, dispatch, and delivery."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order through the tracking link sent to your email."
  },
  {
    question: "What should I do if my order is delayed?",
    answer: "If your order is delayed, please contact our support team for assistance."
  }
];

const DelSupport = () => {
  const [open, setOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleOpen = (answer) => {
    setSelectedAnswer(answer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer('');
  };

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
            Support
          </Typography>

          <div className="text-left">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Contact Support
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Live Chat: <strong>Available</strong>
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Email Support: <strong>support@example.com</strong>
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Helpline: <strong>(123) 456-7890</strong>
            </Typography>
          </div>

          <div className="mt-4 text-left">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              FAQs
            </Typography>
            <ul className="list-disc list-inside text-gray-800">
              {faqs.map((faq, index) => (
                <li key={index} className="cursor-pointer" onClick={() => handleOpen(faq.answer)}>
                  {faq.question}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Answer</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedAnswer}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DelSupport;
