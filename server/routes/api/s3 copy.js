const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose')
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

//upload file route
router.post('/',  async (req, res, next) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let doc = req.files.doc;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            var filepath = './uploads/' + doc.name;
            doc.mv(filepath);

            //upload the file to s3
            var fileStream = fs.createReadStream(file);
            fileStream.on('error', function(err) {
                console.log('File Error', err);
            });

            var uploadParams = {Bucket: 'accreditaid', Key: '', Body: ''};
            uploadParams.Body = fileStream;
            var path = require('path');
            uploadParams.Key = path.basename(filepath);

            s3.upload (uploadParams, function (err, data) {
                if (err) {
                  console.log("Error", err);
                } if (data) {
                  console.log("Upload Success", data.Location);
                }
            });

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: doc.name,
                    mimetype: doc.mimetype,
                    size: doc.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }

});

router.get('/',  async (req, res, next) => {
    if (req.body === undefined || 
        !req.body.hasOwnProperty("name") || 
        !req.body.hasOwnProperty("id"))
        {
      //Body does not contain correct properties
      return res.status(400).send("/api/s3 GET request formulated incorrectly.")
    }

    var getParams = {Bucket: 'accreditaid', Key: ''};
    var path = require('path');
    getParams.Key = path.basename(name);
    getParams.VersionId = id;
    
    s3.getObject(getParams, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully dowloaded data from  bucket");
            console.log(data.Body.toString('utf-8'));
        }
    });

});

router.delete('/',  async (req, res, next) => {
    if (req.body === undefined || 
        !req.body.hasOwnProperty("name") || 
        !req.body.hasOwnProperty("id"))
        {
      //Body does not contain correct properties
      return res.status(400).send("/api/s3 DELETE request formulated incorrectly.")
    }

    var deleteParams = {Bucket: 'accreditaid', Key: ''};
    var path = require('path');
    deleteParams.Key = path.basename(file);
    deleteParams.VersionId = 'wZM8uJoM9NOro_XDXG.2p._nuyU4A6a.';
    
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