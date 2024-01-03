const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();

const PORT=process.env.PORT;
const DB=process.env.DB;

// importing routes
const userRoutes=require("./routes/user.route.js")
const noteRoutes=require("./routes/note.route.js")
const searchRoutes=require("./routes/search.route.js")

// essential middlewares
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected.");
}).catch((err) => {
    console.log("Database error");
    console.log(err);
});


// routes
app.use('/api/auth',userRoutes)
app.use('/api/notes',noteRoutes)
app.use('/api/search',searchRoutes)


app.listen(PORT,()=>console.log(`Server up and running ${PORT}`));