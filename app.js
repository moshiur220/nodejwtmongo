import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import auth from './routes/auth.js'

dotenv.config()
const app=express();
// Database connection
// json encode middliware
app.use(express.json());
mongoose.connect("mongodb://localhost:27017",{dbName:"mycrud"})

app.use('/user',auth)
// app.get('/',(req,res)=>{
//     console.log('it is work');
//     res.send('he')
// })

app.listen(process.env.PROT_NUMBER,()=>{
    console.log('Server is runing ');
})

