const mongoose = require("mongoose");

//Define schema that maps to a document in the course collection in the appdb
//database.
const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNumber: Number,
    coursePrefix: String,
    courseCredits: Number,
    coursePrerequisites: String,
    courseInstructor: String,
    courseEmail: String,
    courseProgram: String
});
const Course = mongoose.model("Course",courseSchema); 

module.exports = Course;