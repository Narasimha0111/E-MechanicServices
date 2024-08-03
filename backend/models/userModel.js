import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your username"],
        minLength:[3,"Name must contain atleast 3 characters"],
        maxLength:[30,"Name cannot exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email!"],
        validate:[
            validator.isEmail,"Please provide valid email"
        ],
    },
    phone:{
        type:Number,
        required:[true,"Please enter your mobile number"],
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minLength:[8,"Password must contain atleast 8 characters"],
        maxLength:[32,"Password cannot contain more than 32 characters"],
        select : false,

    },
    role:{
        type:String,
        required:[true,"Please select your role "],
        enum:["Customer","Mechanic","Admin"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    isvalidated:{
        type:Boolean,
        default:false,
    }
})


//Hashing the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//Comparing the password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//Generating the JWT token for authorization
//id:this._id
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

export const User  = mongoose.model("User",userSchema);