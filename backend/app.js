import express from 'express';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import ordersRoutes from './routes/orders.js';
import paymentRoutes from './routes/payment.js';
import dashboardRoutes from './routes/adminStats.js';
import { connectDB } from './utils/feature.js';
import dotenv from 'dotenv';
import { errorMiddelware } from './middelwares/error.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import NodeCache from 'node-cache';
import morgan from 'morgan';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to DB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/";
connectDB(mongoURI);
const port = process.env.PORT

// CORS
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan("dev"));

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Stripe
export const stripe = new Stripe(process.env.STRIPE_KEY || "");
export const myCache = new NodeCache();

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', ordersRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is working");
});




app.use(errorMiddelware)

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})


// Error middleware
app.use(errorMiddelware);

export default app;


