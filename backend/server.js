const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorHandler = require("./middleWare/errorMiddleware")
var cookieParser = require('cookie-parser')

const userRoute = require("./routes/userRoute");


const app = express()
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())


//Routes Middleware
app.use("/api/user", userRoute)

//Routes

app.get('/', (req,res) => {
    res.send('Home');
})


const PORT = process.env.PORT|| 5000;

// Error middleware
app.use(errorHandler);

// conect to DB and Sgart server
mongoose
    .connect(process.env.MONGO_URI)
     .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
     })
     .catch((err)=>console.error(err))


