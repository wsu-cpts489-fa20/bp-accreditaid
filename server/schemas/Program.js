const mongoose = require("mongoose");


//Define schema that maps to a document in the Users collection in the appdb
//database.
const programSchema = new mongoose.Schema({
    name: String, //unique name for a program
    department: String, 
    college: String, //strategy used to authenticate, e.g., github, local
    credits: Number,
});
const Program = mongoose.model("Program",programSchema); 

module.exports = Program;