import express from 'express';
import DeliveryAddressModel from '../models/DelAddress.js';

const router = express.Router();

router.post('/Deliveryaddress', async (req, res) => {
  try {
    const { address, country, state, city } = req.body;
    console.log("Request body:", req.body);

    const FullAddress = await DeliveryAddressModel.create({
      address,
      country,
      state,
      city,
   
    });

    res.status(200).json(FullAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
