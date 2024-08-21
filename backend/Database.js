import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { Paymentrouter } from "./Routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();  // Load environment variables

dotenv.config({path:path.join(__dirname,"config/config.env")});  // Load environment variables


const MONGODB_URI = `mongodb+srv://gopi3062003:CvZ2NYDjkNdfHLK9@gopi-cart.nyyua.mongodb.net/?retryWrites=true&w=majority&appName=Gopi-Cart`;

 // Log the URI to check if it's correct

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);  // Directly use the hardcoded URI here
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
