import express from 'express'
import {
  checkout,
  verify
} from "../Controllers/payment.js";


const router = express.Router();

// checkout
router.post('/checkout',checkout);


router.post('/verify-payment', verify);



export default router;