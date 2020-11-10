import mongoose from 'mongoose';


//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new mongoose.Schema({
    id: String, //unique identifier for user
    password: String,
    email: String, //Name to be displayed within app
    authStrategy: String, //strategy used to authenticate, e.g., github, local
    securityQuestion: String,
    accountType: {type: String, required: true, enum: ['ABET Evaluator','College Admin', 'Instructor']},
    securityAnswer: {type: String, required: function() 
      {return this.securityQuestion ? true: false}}
});
const User = mongoose.model("User",userSchema); 

module.exports = User;