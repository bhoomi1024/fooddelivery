import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import ResRouter from "./routes/ResRoutes.js";
import UserRoutes from './routes/UserRoutes.js';
import DelRoutes from './routes/DelRoutes.js'
import cookieParser from "cookie-parser";
import menuRoutes from './routes/menuRoutes.js'; // Adjust path as needed
import Stripe from "stripe";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = Stripe('sk_test_51O7fULSHZlt3LJGtFPhRuWy62jcDcQp22MnrWff4hXwmDNIKcM0zCMgQZntpyY2OBVTlWlqXLTwtcqqGRgzo7w5U005KYw2TIP')
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser())
app.use('/auth', ResRouter);
app.use('/auth', UserRoutes);
app.use('/auth', DelRoutes);
app.use('/api/menu', menuRoutes);
// checkout api

app.post("/api/create-checkout-session",async(req,res)=>{
    const stripe = Stripe('sk_test_51PfmkeSHU32U4EZ1q42LgYw341ypg4NQOrYz0Muo93KzpPTk4gn9pODlFrWQLDu4MF04c9mCftyrA78gk5gOw3Oj00ZXoGGv8M')
    const {products} = req.body;
console.log(products)

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dishName,
               
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/UsersOrders",
        cancel_url:"http://localhost:3000/UsersCart",
    });

    res.json({id:session.id})
 
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));