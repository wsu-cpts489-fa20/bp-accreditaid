
const express = require('express');
const router = express.Router();
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
        name: req.params.name,
        courseNumber: req.body.courseNumber,
        coursePrefix: req.body.coursePrefix,
        courseCredits: req.body.courseCredits,
        coursePrerequisites: req.body.coursePrerequisites,
        courseInstructor: req.body.courseInstructor,
        courseEmail: req.body.courseEmail,
      }).save();
      return res.status(201).send("New course of the name '" + 
      req.params.name + "' successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up course in database. " + err);
  }
});

//READ course route: Returns all courses associated 
//with a given course in the courses collection (GET)
router.get('/courses/:courseId', async(req, res) => {
  console.log("in /courses route (GET) with courseId = " + 
    JSON.stringify(req.params.courseId));
  try {
    let thiscourse = await course.findOne({id: req.params.courseId});
    if (!thiscourse) {
      return res.status(400).message("No course account with specified courseId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thiscourse.courses));
    }
  } catch (err) {
    console.log()
    return res.status(400).message("Unexpected error occurred when looking up course in database: " + err);
  }
});

//UPDATE course route: Updates a specific course 
//for a given course in the courses collection (PUT)
router.put('/courses/:courseId/:courseId', async (req, res, next) => {
  console.log("in /courses (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  const validProps = ['date', 'course', 'type', 'holes', 'strokes',
    'minutes', 'seconds', 'notes'];
  let bodyObj = {...req.body};
  delete bodyObj._id; //Not needed for update
  delete bodyObj.SGS; //We'll compute this below in seconds.
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("courses/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'date', 'course', 'type', 'holes', 'strokes', " +
        "'minutes', 'seconds', 'notes'");
    } else {
      bodyObj["courses.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await course.updateOne(
      {"id": req.params.courseId,
       "courses._id": mongoose.Types.ObjectId(req.params.courseId)}
      ,{"$set" : bodyObj}
    );
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

//DELETE course route: Deletes a specific course 
//for a given course in the courses collection (DELETE)
router.delete('/courses/:courseId/:courseId', async (req, res, next) => {
  console.log("in /courses (DELETE) route with params = " + 
              JSON.stringify(req.params)); 
  try {
    let status = await course.updateOne(
      {id: req.params.courseId},
      {$pull: {courses: {_id: mongoose.Types.ObjectId(req.params.courseId)}}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when deleting course from database. course was not deleted.");
    } else {
      res.status(200).send("course successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting course from database: " + err);
  } 
});

module.exports = router;