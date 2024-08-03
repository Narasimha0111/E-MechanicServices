import {catchAsyncError} from './catchAsyncErrors.js'
import errorHandler from './error.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/userModel.js'

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
    // console.log(req);
    const {token}= req.cookies;
    // console.log(`Token is ${token}`);
    console.log(req.cookies);
    if(!token){
        return next(new errorHandler("User not authorised",400))
    }
    console.log(token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = await User.findById(decoded.id);

    next();
})