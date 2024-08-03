import mongoose from "mongoose";
const reqSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide the problem for your automobile"],
        minLength : [7,"Problem title should have atleast 7 characters"],
        maxLength : [30,"Problem title can have maximum of 30 characters"],
    },
    description:{
        type:String,
        required:[true,"Please provide a detail view of your problem to acquire accurate proceedings with the service"],
        minLength : [20,"Problem description should have atleast 20 characters"],
        maxLength : [300,"Problem description can have maximum of 300 characters"],
    },
    ser_des:{
        type:String,
        minLength : [20,"Problem description should have atleast 20 characters"],
        maxLength : [300,"Problem description can have maximum of 300 characters"],
    },
    category:{
        type:String,
        required:[true,"Service Category Required!!"]
    },
    status:{
        type:String,
        required:true,
        enum:["Raised","Picked and reviewed","Repairing","Service completed"],
        default:"Raised",
    },
    location:{
        type:String,
        required:[true,"Please provide your location"],
        minLength : [7,"Location should have atleast 7 characters"],
        maxLength : [30,"Location can have maximum of 30 characters"],
    },
    req_name:{
        type:String,
        required:true,
    },
    pick_name:{
        type:String,
        default:null,
    },
    phone:{
        type:String,
        required:true,
    },
    pick_phone:{
        type:String,
        default:null,
    },
    expired:{
        type:Boolean,
        default:false,
    },
    requestCreatedon:{
        type:Date,
        default:Date.now,
    },
    requestedBy:{
        type:String,
        required:true,
    },
    pickedby:{
        type:String,
        default:null,
    }
})

export const request = mongoose.model("Request",reqSchema);