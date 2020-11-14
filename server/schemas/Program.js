const mongoose = require("mongoose");


//Define schema that maps to a document in the Users collection in the appdb
//database.
const programSchema = new mongoose.Schema({
    name: String, //unique identifier for user
    password: String,
    department: String, //Name to be displayed within app
    college: String, //strategy used to authenticate, e.g., github, local
    creditsRequired: Number,
});
const Program = mongoose.model("Program",programSchema); 

module.exports = Program;