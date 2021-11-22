import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"
import { userCreateValidation } from "../validation.js";
import { tokenVarify } from "./tokenVarify.js";

const router = express.Router();
// user login here 

// create new user route 
router.post('/create', async(req,res)=>{
    // check input validations
    const { error }=userCreateValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
        // Check email already has
        const hasEmail=await UserModel.findOne({email:req.body.email})
        if (hasEmail) return res.send("email already taken")

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(req.body.password, salt);

        // create new user here 
        const newUser=new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:hashPass
        })
        try {
            const user=await newUser.save()
            res.send(user)
        } catch (error) {
            res.send(error)
        }

})
// user login router
router.post('/login', async(req,res)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(!user) return res.send("User and pass not exist ");
    console.log(user);
     const check= await bcrypt.compareSync(req.body.password, user.password);
     if(!check) return res.send("Email and password are not match")

     const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET)
    //  res.send(check)
    res.header("auth-token",token).send(token)
})

// test route check auth
router.get('/getuser',tokenVarify,(req,res)=>{
res.send('token verify')
})
export default router;