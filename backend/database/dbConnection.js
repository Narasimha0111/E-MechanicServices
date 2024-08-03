import mongoose from "mongoose";
import validator from "validator";

export const connectT0DB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Online_Mechanic_Services"
        });
        console.log('DB is connected');
    }
    catch(error){
        console.log( `DB not connected due to some issue like this : ${error}`);
    }
}
