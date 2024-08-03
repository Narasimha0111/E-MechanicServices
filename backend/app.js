import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js'
import requestRouter from './routes/requestRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import {connectT0DB} from './database/dbConnection.js'
import {errorMiddleware} from "./middlewares/error.js";




const app=express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin:function(origin, callback) {
        // Check if the origin is allowed or if it is undefined (meaning same-origin)
        if (!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods:['GET','PUT','POST','DELETE','OPTIONS'],
    credentials:true,
}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/request',requestRouter);
app.use('/api/v1/application',applicationRouter);


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))





connectT0DB();

app.use(errorMiddleware);

export default app;