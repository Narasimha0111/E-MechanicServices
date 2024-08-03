import {catchAsyncError} from '../middlewares/catchAsyncErrors.js'
import errorHandler from '../middlewares/error.js';
import {User} from '../models/userModel.js'
import {sendToken} from '../utils/jwtToken.js'

export const register=catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,role,password}= req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new errorHandler("Please fill full registration form"));
    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new errorHandler("User already registered with the above email"));
    }
    const user = await User.create({name,email,phone,role,password});
    sendToken(user,200,res,"User Registered Successfully")
})

export const login = catchAsyncError(async(req,res,next)=>{
    console.log(req.body);
    const {email,password,role} = req.body;
    if(!email || !password || !role){
        return next(new errorHandler("Please provide email password and role",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new errorHandler("Invalid Email or Password",400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new errorHandler("Invalid Email or Password",400))
    }
    if(user.role!== role){
        return next(new errorHandler("User with this role is not found",400) )
    }

    sendToken(user,200,res,"User Logged in Successfully!");
})


export const delUser = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role!=='Admin'){
        return next(new errorHandler("You are not allowed to delete any user",400));
    }
    const {id}=req.params;
    const delUse =await User.findByIdAndDelete(id);
    if(!delUse){
        return next(new errorHandler("User not found",400));
    } 
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
    })
})

export const valUser =catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role!=='Admin'){
        return next(new errorHandler("You are not allowed to validate any user",400));
    }
    const {id}=req.params;
    const user = await User.findByIdAndUpdate(id,{isvalidated:true},{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"User validated",
    })
})

export const getUsers = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role!=='Admin'){
        return next(new errorHandler("You are not allowed to view users",400));
    }
    const users = await User.find({isvalidated:false});
    res.status(200).json({
        success:true,
        message:"User's Fetched",
        users,
    })
})

export const getverUsers = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role!=='Admin'){
        return next(new errorHandler("You are not allowed to view users",400));
    }
    const users = await User.find({isvalidated:true});
    res.status(200).json({
        success:true,
        message:"User's Fetched",
        users,
    })
})

export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    // console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  });


export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires : new Date(Date.now()),
    }).json({
        success:true,
        message:"User logged out successfully!",
    })
})