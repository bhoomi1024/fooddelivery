import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from "cookie-parser";
import ResRouter from "./routes/ResRoutes.js";
import UserRoutes from './routes/UserRoutes.js';
import DelRoutes from './routes/DelRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import addressRoutes from './routes/AddressRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());

// Proxy middleware for MapQuest API
app.use('/api/mapquest', createProxyMiddleware({
    target: 'http://www.mapquestapi.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/mapquest': '', // Remove /api/mapquest prefix when forwarding to target
    },
}));

app.use('/auth', ResRouter);
app.use('/auth', UserRoutes);
app.use('/auth', DelRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/payment', paymentRouter);
app.use('/api/addresses', addressRoutes);
app.use('/api/order', orderRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));
