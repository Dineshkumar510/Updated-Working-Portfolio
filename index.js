require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const port = process.env.PORT || 8080;
const router = require('./Router');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));
app.use(router);


app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers:'SSLv3',
        }
    });

    // Testing nodemailer using with mailtrap on dkk6089456@gmail.com
    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log(success, 'Server is ready to take our messages');
        }
     });


    const mailOptions = {
        from: req.body.email,
        to:   process.env.EMAIL_USERNAME,
        subject: `Message from ${req.body.name}: from phone:"${req.body.phone}"`,
        text: req.body.message,
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.send("Something error check Backend;" + " " + error);

        }
        else{
            console.log('Email sent' + info); 
            res.send("success");
        }
    });
});


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});