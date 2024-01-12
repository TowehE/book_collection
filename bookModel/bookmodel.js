const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  position: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
   
  },
  title: {
    type: String,
    required: true,
    unique: true,

  },
  
  author: {
    type: String,
    required: true
  },
  
  genre: {
    type: String,
    required: true
  },
 
  
}, { timestamps: true });

const libraryModel = mongoose.model('library', librarySchema);

module.exports = libraryModel;
