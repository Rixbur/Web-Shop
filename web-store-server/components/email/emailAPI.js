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
        to: user.data.email,
        subject: "Order confirmed",
        html: `<h1>Hello, ${user.data.name}!</h1>
           Thank you for thrusting us. 
           Yor address: ${user.data.address}.<br/>
           Your order will be sent soon. <br/>
           Ordered products:<br/>${user.products}<br/>
          Best wishes, your team! `
    };

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

module.exports = router;
