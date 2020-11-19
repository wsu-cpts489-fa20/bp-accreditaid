require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();


var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.EMAILLPASSWORD,
  },
  secure:true,
});




router.post("/", async (req, res, next) =>{
    var mailOptions = {
        from: 'acreditaid@gmail.com',
        to: req.body.toList,
        subject: req.body.emailSubject,
        text: req.body.emailBody,
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.sendStatus(500);
        } else {
          console.log('Email sent: ' + info.response);
          return res.sendStatus(200);
        }
      });
});

module.exports = router;