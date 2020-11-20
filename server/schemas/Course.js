const mongoose = require("mongoose");

//Define schema that maps to a document in the course collection in the appdb
//database.
const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNumber: String,
    coursePrefix: String,
    courseCredits: String,
    coursePrerequisites: String,
    courseSOs: String,
    courseDeliverables: String,
    courseInstructor: String,
    courseEmail: String
});
const Course = mongoose.model("Course",courseSchema); 

module.exports = Course;