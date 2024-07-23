//Restaurent Schema
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    password: { type: String, required: true },
    ownerName: { type: String, required: true},
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', required: true } 
});

const UserModel = model("User", UserSchema);

export default UserModel;