import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: 'rzp_test_Jp05EcVr7cQRf3',
  key_secret: 'aXpDOvINq7xksY6otZQRvHX3',
}); 

// checkout
export const checkout = async (req, res) => {
  try {
    const { products } = req.body;
    console.log(products);
    const amount = products.reduce((total, product) => total + product.price * product.quantity, 0) * 100; // in paise
     console.log(amount)
    var options = {
      amount: amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount / 100, // in INR
      payStatus: "created",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};
