import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    payStatus: { type: String },
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    orderItems: { type: Array, required: true },
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
}, { strict: false });

export const Payment = mongoose.model('Payment', paymentSchema);
