const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());
dotenv.config('./.env');

const userRoutes=require("./routes/user.route.js")
const noteRoutes=require("./routes/note.route.js")
const searchRoutes=require("./routes/search.route.js")

app.use('/api/auth',userRoutes)
app.use('/api/notes',noteRoutes)
app.use('/api/search',searchRoutes)

app.listen(PORT,()=>console.log("Server up and running"));