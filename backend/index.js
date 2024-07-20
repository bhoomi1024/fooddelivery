import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import ResRouter from "./routes/ResRoutes.js";
import UserRoutes from './routes/UserRoutes.js';
import DelRoutes from './routes/DelRoutes.js'
import cookieParser from "cookie-parser";
import menuRoutes from './routes/menuRoutes.js'; // Adjust path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser())
app.use('/auth', ResRouter);
app.use('/auth', UserRoutes);
app.use('/auth', DelRoutes);
app.use('/api/menu', menuRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));

      