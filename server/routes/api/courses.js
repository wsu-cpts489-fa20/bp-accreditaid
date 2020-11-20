
const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose')
const Course = require("./../../schemas/Course.js");

//CREATE course route: Adds a new course as a subdocument to 
//a document in the courses collection (POST)
router.post('/:name',  async (req, res, next) => {
  console.log("in /api/courses route (POST) with params = " + 
      JSON.stringify(req.params) +
      " and body = " + JSON.stringify(req.body));  
  if (req.body === undefined || 
      !req.body.hasOwnProperty("courseNumber") || 
      !req.body.hasOwnProperty("coursePrefix") ||
      !req.body.hasOwnProperty("courseCredits") || 
      !req.body.hasOwnProperty("coursePrerequisites") ||
      !req.body.hasOwnProperty("courseInstructor") ||
      !req.body.hasOwnProperty("courseEmail")) 
      {
    //Body does not contain correct properties
    return res.status(400).send("/api/courses POST request formulated incorrectly.")
  }
  try {
    let thisCourse = await Course.findOne({name: req.params.name});
    if (thisCourse) { // course already exists
      res.status(400).send("There is already a course under that name: " + req.params.name);
    } else { // add to database
      thisCourse = await new Course({
        courseName: req.params.name,
        courseNumber: req.body.courseNumber,
        coursePrefix: req.body.coursePrefix,
        courseCredits: req.body.courseCredits,
        coursePrerequisites: req.body.coursePrerequisites,
        courseInstructor: req.body.courseInstructor,
        courseEmail: req.body.courseEmail,
        courseProgram: req.body.courseProgram,
      }).save();
      return res.status(201).send("New course of the name '" + 
      req.params.name + "' successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up course in database. " + err);
  }
});

//READ course route: Returns all courses associated 
//with a given program in the courses collection (GET)
router.get('/all/:courseProgram', async(req, res) => {
  console.log("in /courses route (GET) with courseProgram = " + 
    JSON.stringify(req.params.courseProgram));
  try {
    let courses = await Course.find({courseProgram: req.params.courseProgram});
    if (!courses) {
      return res.status(400).send("No courses with specified courseProgram was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(courses));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up course in database: " + err);
  }
});

//READ course route: Returns the data associated 
//with a given course in the courses collection (GET)
router.get('/:courseId', async(req, res) => {
  console.log("in /courses route (GET) with courseId = " + 
    JSON.stringify(req.params.courseId));
  try {
    let thiscourse = await Course.findOne({id: req.params.courseId});
    if (!thiscourse) {
      return res.status(400).send("No course with specified courseId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thiscourse));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up course in database: " + err);
  }
});

//UPDATE course route: Updates a specific course 
//for a given course in the courses collection (PUT)
router.put('/:courseId', async (req, res, next) => {
  console.log("in /courses (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  const validProps = ['courseName', 'courseNumber', 'coursePrefix', 'courseCredits', 'coursePrerequisites',
    'courseInstructor', 'courseEmail', 'courseProgram'];
  let bodyObj = req.body;
  delete bodyObj._id; //Not needed for update
  delete bodyObj.__v; //Not needed for update
  delete bodyObj.sos; //Not needed for update
  delete bodyObj.deliverables; //Not needed for update
  delete bodyObj.completion; //Not needed for update
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("courses/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'courseName', 'courseNumber', 'coursePrefix', 'courseCredits', 'coursePrerequisites', 'courseInstructor', 'courseEmail', 'courseProgram'");
    }
  }
  try {
    console.log(JSON.stringify(bodyObj));
    let status = await Course.updateOne(
      {_id: (req.params.courseId)}
      ,{"$set" : bodyObj}
    );
    console.log(status);
    if (status.nModified != 1) {
      res.status(400).send("Unexpected error occurred when updating course in database. course was not updated.");
    } else {
      res.status(200).send("course successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when updating course in database: " + err);
  } 
});

//DELETE Course route: Deletes the document with the specified name from Courses collection (DELETE)
router.delete('/:courseId', async(req, res, next) => {
  console.log("in /api/courses route (DELETE) with courseId = " + 
    JSON.stringify(req.params.courseId));
  try {
    let status = await Course.deleteOne({_id: req.params.courseId});
    if (status.deletedCount != 1) {
      return res.status(404).send("No Course " +
        req.params.courseId + " was found. Course could not be deleted.");
    } else {
      return res.status(200).send("Course  " +
      req.params.courseId + " was successfully deleted.");
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when attempting to delete Course with courseId " +
      req.params.courseId + ": " + err);
  }
});

module.exports = router;