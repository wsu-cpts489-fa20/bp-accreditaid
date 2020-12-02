const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose')
const AWS = require('aws-sdk');
const fs = require('fs');

const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

var uploadParams = {Bucket: 'accreditaid', Key: '', Body: ''};


//upload file route
router.post('/',  async (req, res, next) => {
        let upload = multer({ }).single('');
    
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
    
            // Display uploaded image for user validation
            console.log(req.file);
            res.send("File successfully uploaded");
        });
});

module.exports = router;