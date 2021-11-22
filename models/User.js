import mongoose from "mongoose"

// create user schema 

const user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,min:5,max:10}
    
})


const userModel=mongoose.model("User",user);
export default userModel;