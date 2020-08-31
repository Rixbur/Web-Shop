const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mail = require("./mail.json");

const router = express.Router();
router.use(cors({ origin: "*" }));

router.post("/", (req, res) => {
    console.log("Request has come.");
    let user = req.body;
    sendMail(user, info => {
        console.log(`Email is sent. Id: ${info.messageId}`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
  
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        //port: 465,
        port: 587,
        secure: false, // true for 465
        requireTLS: true,
        reqireSSL: true,
        auth: {
            user: mail.email,
            pass: mail.password
        },
        enable_starttls_auto: true
    });

    let mailOptions = {
        from: mail.email,
        to: user.email,
        subject: "Order confirmed",
        html: `<h1>Hello, ${user.name}!</h1>
          Thank you for thrusting us. Yor address: ${user.address}.
           Your order will be sent soon.
          Best wishes, your team! `
    };

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

module.exports = router;
