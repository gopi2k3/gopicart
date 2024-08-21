import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Products from "./Routes/product.js";
import { connectDb } from "./Database.js";
import { ErrorMiddleware } from './middleware/error.js';
import { Auth } from "./Routes/auth.js";
import { OrderRouter } from "./Routes/order.js";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { Paymentrouter } from "./Routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();  // Load environment variables

app.use(express.json());  // Middleware
app.use(cookieParser());  // Middleware
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));  // Serve static files

connectDb();  // Database Connection

// Advanced CORS setup
const corsOptions = {
  origin: 'http://localhost:8080',  // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Allow cookies and other credentials
  optionsSuccessStatus: 204  // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

app.use("/cart", Products);
app.use("/cart", Auth);
app.use('/cart', OrderRouter);
app.use('/cart', Paymentrouter);

app.use(ErrorMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

const Server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.log('Shutting down the server due to an unhandled rejection');
  Server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.log('Shutting down the server due to an uncaught exception');
  Server.close(() => {
    process.exit(1);
  });
});
