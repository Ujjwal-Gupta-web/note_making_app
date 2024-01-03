const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());
dotenv.config('./.env');

app.get("/",(req,res)=>{
    return res.json({"message" : "HI"})
})

app.listen(PORT,()=>console.log("Server up and running"));