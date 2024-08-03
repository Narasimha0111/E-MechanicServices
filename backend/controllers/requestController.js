import {catchAsyncError} from '../middlewares/catchAsyncErrors.js'
import errorHandler from '../middlewares/error.js'
import {request} from '../models/requetModel.js'
import { User } from '../models/userModel.js';



export const getAllreq = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated} = req.user;
    if(role !=='Admin'){
        return next(new errorHandler("You are not allowed to see all requests",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const requests = await request.find();
    res.status(200).json({
        success:true,
        requests,
    })
})

export const getActivereq = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated} = req.user;
    if(role !=='Mechanic'){
        return next(new errorHandler("You are not allowed to see active requests",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const requests = await request.find({status:"Raised"});
    res.status(200).json({
        success:true,
        requests,
    })
})


export const postReq=catchAsyncError(async(req,res,next)=>{
    console.log(req);
    const {role,isvalidated} = req.user;
    if(role === "Mechanic" || role ==="Admin"){
        return next(new errorHandler("You are not allowed to post a request",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const  {title,description,category,status,location,expired,requestCreatedon,pickedby} =req.body;

    if(!title || !description || !category || !location){
        return next(new errorHandler("Please provide all details of the request",400)); 
    }
    const p = await User.findById(req.user._id);
    const requestedBy = req.user._id;
    const req_name = p.name;
    const phone = p.phone;
    const Req = await request.create({
        title,description,category,status,location,expired,requestCreatedon,pickedby,requestedBy,req_name,phone
    })
    res.status(200).json({
        success:true,
        message:"Request created successfully",
        Req,
    })

})




export const acceptReq = async(req,res,next)=>{
    const {role,isvalidated} = req.user
    if(role !=='Mechanic'){
        return next(new errorHandler("You are not allowed to accept a request",400)); 
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const {id}=req.params;
    let Req = await request.findById(id);
    if(!Req){
        return next(new errorHandler("Request not present",400));
    }
    const p = await User.findById(req.user._id);
    const pick_name = p.name;
    const pick_phone = p.phone;
        Req = await request.findByIdAndUpdate(id,{pickedby:req.user._id,status:"Picked and reviewed",pick_name:pick_name,pick_phone:pick_phone},{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
    res.status(200).json({
        success:true,
        message:'Request Accepted Successfully!',
    })
}

export const getMyrequests = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated}=req.user
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    if(role!=='Customer'){
        return next(new errorHandler("You are not allowed to see requests",400));
    }
    const myReq = await request.find({requestedBy:req.user._id , status:{ $ne: 'Service completed' }});
    res.status(200).json({
        success:true,
        message:"Your requets are Fetched",
        myReq,
    })
})

export const CompletedRequests = catchAsyncError(async(req,res,next)=>{
    console.log(req);
    console.log('Rajasekhar');
    const {role,isvalidated}=req.user
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    if(role!=='Customer'){
        return next(new errorHandler("You are not allowed to see requests",400));
    }
    const myReq = await request.find({requestedBy:req.user._id ,status:'Service completed'});
    res.status(200).json({
        success:true,
        message:"Your requets are Fetched",
        myReq,
    })
})

export const getMyServices = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated}=req.user
    
    if(role!=='Mechanic'){
        return next(new errorHandler("You are not allowed to see Services",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const myServ = await request.find({pickedby:req.user._id,status:{ $ne: 'Service completed' }});
    
    res.status(200).json({
        success:true,
        message:"Your Services are Fetched",
        myServ,
    })
})


export const CompletedServices = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated}=req.user
    
    if(role!=='Mechanic'){
        return next(new errorHandler("You are not allowed to see Services",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const myServ = await request.find({pickedby:req.user._id,status:'Service completed'});
    res.status(200).json({
        success:true,
        message:"Your Services are Fetched",
        myServ,
    })
})





export const UpdateReq = catchAsyncError(async(req,res,next)=>{
    const { role,status,isvalidated } = req.user;
    if(role==='Admin'){
        return next(new errorHandler("You are not allowed to update the request",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const {id}=req.params;
    let Req = await request.findById(id);
    if(!Req){
        return next(new errorHandler("Request not present",400));
    }
    Req = await request.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:'Request Updated Successfully!',
        Req,
    })
})



export const delReq = catchAsyncError(async(req,res,next)=>{
    const {role,isvalidated}=req.user
    if(role!=='Customer'){
        return next(new errorHandler("You are not allowed to delete any request",400));
    }
    if(!isvalidated){
        return next(new errorHandler("You are not yet allowed to see all requests,because you are not validated yet",400));
    }
    const {id}=req.params
    let Req = await request.findByIdAndDelete(id);
    if(!Req){
        return next(new errorHandler("Request not found",400));
    }
    res.status(200).json({
        success:true,
        message:"Request deleted successfully",
        Req,
    })
})

export const getSingleRequest = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    // console.log(id);
    try {
        const req = await request.findById(id);
        // console.log(req);
        if(!req){
            return next(new errorHandler("Request Not Found",404));
        }
        res.status(200).json({
            success:true,
            req,
        })
    } catch (error) {
        return next(new errorHandler("Invalid Id/Cast",400))
    }
})