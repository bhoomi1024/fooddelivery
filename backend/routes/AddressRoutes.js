import express from 'express';
import DeliveryAddressModel from '../models/DelAddressModel.js';
import {AuthenticateUser} from './UserRoutes.js'

const router = express.Router();

router.post('/deliveryaddress', AuthenticateUser ,async (req, res) => {
  const { address, country, state, city } = req.body;

  try {
  
    let userId =  req.rootUser._id
    const FullAddress = new DeliveryAddressModel({
      address,
      country,
      state,
      city,
      userId
    });

    await FullAddress.save();

    res.status(200).json({message: "Address added",FullAddress, success:true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Route to get deliveryaddress
router.get('/deliveryaddress',AuthenticateUser,async (req, res) => {
    try {
      let userId =  req.rootUser._id
      const Address = await DeliveryAddressModel.find({userId:userId }).sort({createdAt:-1});
      res.status(200).json({message:Address , FullAddress:Address[0]});
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }
  });
export default router;

