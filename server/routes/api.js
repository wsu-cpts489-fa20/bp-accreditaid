const express = require('express');
const router = express.Router();


router.get('/test', function (req, res) {
  res.status(200).json({'test': 'it works!'});
});

module.exports = router;