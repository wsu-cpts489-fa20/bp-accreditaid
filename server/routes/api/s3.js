const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose')
const AWS = require('aws-sdk');
const fs = require('fs');

const stream = require('stream');

const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

var uploadParams = {Bucket: 'accreditaid', Key: '', Body: ''};


/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
function bufferToStream(binary) {

    const readable = new stream.Readable()
    readable._read = () => {} // _read is required but you can noop it
    readable.push(binary)
    readable.push(null)
    
    return readable;
}


//upload file route
router.post('/',  async (req, res, next) => {
        console.log("POST request on /api/s3/")
        let upload = multer({ }).single('file');
    
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an file to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
    
            // Display uploaded image for user validation
            let fileStream = bufferToStream(req.file.buffer)

            var uploadParams = {Bucket: 'accreditaid', Key: '', Body: ''};
            uploadParams.Body = fileStream;
            uploadParams.Key = req.file.originalname;

            s3.upload (uploadParams, function (err, data) {
                if (err) {
                  console.log("Error", err);
                  res.status(400).send("Error");
                } if (data) {
                  console.log("Upload Success", data.Location);
                              //send response
                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: req.file.originalname,
                            mimetype: req.file.mimetype,
                            size: req.file.size,
                            VersionId: data.VersionId
                        }
                    });
                }
            });
        });
});

router.get('/',  async (req, res, next) => {
    if (req.query === undefined || 
        !req.query.hasOwnProperty("name") || 
        !req.query.hasOwnProperty("id"))
        {
      //Body does not contain correct properties
      console.log(req.query);
      return res.status(400).send("/api/s3 GET request formulated incorrectly.")
    }

    var getParams = {Bucket: 'accreditaid', Key: ''};
    var path = require('path');
    getParams.Key = path.basename(req.query.name);
    getParams.VersionId = req.query.id;
    
    s3.getObject(getParams, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully dowloaded data from  bucket");
            console.log(data.Body.toString('utf-8'));
        }
    });

    res.send();

});


router.delete('/',  async (req, res, next) => {
    if (req.query === undefined || 
        !req.query.hasOwnProperty("name") || 
        !req.query.hasOwnProperty("id"))
        {
      //Body does not contain correct properties
      return res.status(400).send("/api/s3 DELETE request formulated incorrectly.")
    }

    var deleteParams = {Bucket: 'accreditaid', Key: ''};
    var path = require('path');
    deleteParams.Key = path.basename(req.query.name);
    deleteParams.VersionId = req.query.id;
    
    s3.deleteObject(deleteParams, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted data from  bucket");
            console.log(data);
        }
    });

});

module.exports = router;