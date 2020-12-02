const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose')
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

var uploadParams = {Bucket: 'accreditaid', Key: '', Body: ''};

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

module.exports = router;