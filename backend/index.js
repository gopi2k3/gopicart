import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Products from "./Routes/product.js";
import { connectDb } from "./Database.js";
import {ErrorMiddleware} from './middleware/error.js'
import { Auth } from "./Routes/auth.js";
import { OrderRouter } from "./Routes/order.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Paymentrouter } from "./Routes/payment.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(express.json()); //MiddleWare

app.use(cookieParser());  //MiddleWare

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));


dotenv.config();  //MiddleWare



 
connectDb()   //Data Base Coonetion

// Advanced CORS setup (specifying options)
const corsOptions = {
  origin: 'http://localhost:3000', // frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow cookies and other credentials
  optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;







app.use("/cart", Products);
app.use("/cart", Auth);
app.use('/cart',OrderRouter)
app.use('/cart',Paymentrouter)

app.use(ErrorMiddleware)



if(process.env.NODE_ENV=='production'){
 app.use( express.static(path.join(__dirname,'../frontend/build')))

 app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
 })
}







const Server=app.listen(PORT, () => {
  console.log(`Server Running Port ${PORT}  ${process.env.NODE_ENV}`);
});


process.on('unhandledRejection',(err)=>{

  console.log(`Error ${err}`)

  console.log('Shutting  down the Server due to unhandled rejection Error')

  Server.close(()=>{
    process.exit()
  })

})



process.on('uncaughtException',(err)=>{

  console.log(`Error ${err}`)

  console.log('Shutting  down the Server due to uncaught ExceptionError')
  Server.close(()=>{
    process.exit()
  })

})

