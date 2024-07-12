//Restaurent Schema
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RestaurentSchema = new Schema({
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    ownerName: { type: String, required: true},
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    countryName: { type: String, required: true },
    stateName: { type: String, required: true }
});

const RestaurentModel = model("Restaurent", RestaurentSchema);

export default RestaurentModel;

//

