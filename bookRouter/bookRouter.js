//import express library
const express = require("express");

//create a router object
const router = express.Router()

//import all methods from the controller
 const{
    createABook,
    displayBook,
    issueABook,
    updateBook,
    outdatedBook, 
    

 } = require("../bookController/bookController");

//endpoint to create books
router.post("/create", createABook);

//endpoint to display books
 router.get("/display", displayBook);

//endpoint to issue book
router.get("/issue/:titleId", issueABook);

//endpoint to update book
router.put("/update/:titleId", updateBook);

//endpoint to remove outdated book
router.delete("/remove/:bookId", outdatedBook);

//export the routers
module.exports = router;