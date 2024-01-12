//import express
const express = require("express");

//import confg
require("./dbConfig/bookdbConfig")

require("dotenv").config();

// create an app from express module
const app = express();
// import routers
const libraryRouter = require("./bookRouter/bookRouter");

// use the express middleware
app.use(express.json());

const port = process.env.port

app.get("/", (req,res)=>{
    res.send("You're welcome to the THE PAGE CAFE. From Fantasy to Reality and Everything in between!")
})

app.use("/api/v1", libraryRouter)



//listen to  the port
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})