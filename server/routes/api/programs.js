
const express = require('express');
const router = express.Router();
const Program = require("./../../schemas/Program.js")

////////////////////////
//Program REST ROUTES
////////////////////////////////


//READ ALL Programs route: Retrieves all Programs from Programs collection (GET)
router.get('/', async(req, res, next) => {
  console.log("in /api/programs route (GET) ");
  try {
    let Programs = await Program.find({});
    if (!Programs) {
      return res.status(404).send("No Programs were found in database.");
    } else {
      return res.status(200).json(JSON.stringify(Programs));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up Programs in database: " + err);
  }
});

//READ Program route: Retrieves the Program with the specified name from Programs collection (GET)
router.get('/:name', async(req, res, next) => {
  console.log("in /api/programs route (GET) with name = " + 
    JSON.stringify(req.params.name));
  try {
    let thisProgram = await Program.findOne({name: req.params.name});
    if (!thisProgram) {
      return res.status(404).send("No Program with name " +
        req.params.name + " was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisProgram));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up Program with name " +
      req.params.name + " in database: " + err);
  }
});
  
//CREATE Program route: Adds a new Program to the Programs collection (POST)
router.post('/:name',  async (req, res, next) => {
  console.log("in /api/programs route (POST) with params = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));  
  if (req.body === undefined || 
      !req.body.hasOwnProperty("department") ||
      !req.body.hasOwnProperty("college") ||
      !req.body.hasOwnProperty("credits") ){
    //Body does not contain correct properties
    return res.status(400).send("/api/programs POST request formulated incorrectly. ")
  }
  try {
    let thisProgram = await Program.findOne({name: req.params.name});
    if (thisProgram) { //program already exists
      res.status(400).send("There is already a program under that name'" + req.params.name);
    } else { // add to database
      thisProgram = await new Program({
        name: req.params.name,
        department: req.body.department,
        college: req.body.college,
        credits: req.body.credits,
      }).save();
      return res.status(201).send("New program of the name '" + 
        req.params.name + "' successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up Program in database. " + err);
  }
});
  
//UPDATE Program route: Updates a Program in the Programs collection (POST)
router.put('/:name',  async (req, res, next) => {
  console.log("in /api/programs update route (PUT) with name = " + JSON.stringify(req.params) + 
    " and body = " + JSON.stringify(req.body));
  if (!req.params.hasOwnProperty("name"))  {
    return res.status(400).send("/api/programs PUT request formulated incorrectly." +
        "It must contain 'name' as parameter.");
  }
  const validProps = ['name', 'department', 'college', 
    'credits'];
  for (const bodyProp in req.body) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("Programs/ PUT request formulated incorrectly." +
        "Only the following props are allowed in body: " + validProps.toString());
    } 
  }
  try {
        let status = await Program.updateOne({name: req.params.name}, 
          {$set: req.body});
        if (status.nModified != 1) { //program could not be found
          res.status(404).send("No Program with the name " + req.params.name + " exists. Program could not be updated.");
        } else {
          res.status(200).send("Program " + req.params.name + " successfully updated.")
        }
      } catch (err) {
        res.status(400).send("Unexpected error occurred when updating Program data in database: " + err);
      }
});
  
//DELETE Program route: Deletes the document with the specified name from Programs collection (DELETE)
router.delete('/:name', async(req, res, next) => {
  console.log("in /api/programs route (DELETE) with name = " + 
    JSON.stringify(req.params.name));
  try {
    let status = await Program.deleteOne({name: req.params.name});
    if (status.deletedCount != 1) {
      return res.status(404).send("No Program " +
        req.params.name + " was found. Program could not be deleted.");
    } else {
      return res.status(200).send("Program  " +
      req.params.name + " was successfully deleted.");
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when attempting to delete Program  with name " +
      req.params.name + ": " + err);
  }
});

module.exports = router;