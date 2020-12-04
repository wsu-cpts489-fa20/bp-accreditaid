const mongoose = require("mongoose");

const tupleSchema = new mongoose.Schema({
    id: String,
    name: String
});


const workSample = new mongoose.Schema({
    importance: String,
    file : tupleSchema
});

const deliverable = new mongoose.Schema({
    deliverableName : String,
    prompt: String,
    SIPI: [String],
    studentWorkSamples: [workSample]
});

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
    courseProgram: String,
    courseSemester: String,
    courseYear: Number,
    courseStudents: Number,
    courseSyllabus: tupleSchema,
    courseSchedule: tupleSchema,
    courseRoster: tupleSchema,
    courseReadings: [tupleSchema],
    courseMaterials: [tupleSchema],
    courseDeliverables:[deliverable],

});
const Course = mongoose.model("Course",courseSchema); 

module.exports = Course;