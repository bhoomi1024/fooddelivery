import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AddressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
        ref: "User"
}
});


const DeliveryAddressModel = model('DeliveryAddress', AddressSchema);

export default DeliveryAddressModel;

