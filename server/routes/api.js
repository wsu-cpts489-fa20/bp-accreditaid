const express = require('express');
const router = express.Router();

const users = require("./api/users")
const programs = require("./api/programs")
const courses = require("./api/courses")

router.get('/test', function (req, res) {
  res.status(200).json({'test': 'it works!'});
});

router.use("/users", users);
router.use("/programs", programs)
router.use("/courses", courses)

module.exports = router;