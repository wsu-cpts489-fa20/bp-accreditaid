const express = require('express');
const router = express.Router();

const users = require("./api/users")

router.get('/test', function (req, res) {
  res.status(200).json({'test': 'it works!'});
});

router.use("/users", users);

module.exports = router;