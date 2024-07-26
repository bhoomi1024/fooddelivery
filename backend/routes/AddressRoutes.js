import express from 'express';
import DeliveryAddressModel from '../models/DelAddress.js';
import { AuthenticateUser } from './UserRoutes.js';

const router = express.Router();

router.post('/deliveryaddress', AuthenticateUser, async (req, res) => {
  const { address, country, state, city } = req.body;

  try {
    const ownerId = req.rootUser._id; // Get the user's ID from the authenticated user

    const FullAddress = new DeliveryAddressModel({
      address,
      country,
      state,
      city,
      ownerId
    });

    await FullAddress.save();

    res.status(200).json(FullAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Route to get deliveryaddress
router.get('/deliveryaddress',async (req, res) => {
    try {
      const FullAddress = await DeliveryAddressModel.find({
        ownerId :req.rootUser._id
      });
      res.status(200).json(FullAddress);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }
  });
export default router;
