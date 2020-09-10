const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mail = require("./mail.json");

const router = express.Router();
router.use(cors({ origin: "*" }));

router.post("/", (req, res) => {
    let user = req.body;

    let mailOptions = {
        from: mail.email,
        to: user.data.email,
        subject: "Order confirmed",
        html: `<h1>Hello, ${user.data.name}!</h1>
           Yor address: ${user.data.address}.<br/>
           Your order will be sent soon. <br/>
           Ordered products:<br/>${user.products}<br/>
          Best wishes, your team! `
    };

    try{
        sendMail(mailOptions, info => {
        console.log(`Email is sent. Id: ${info.messageId}`);
        res.send(info);
        });
    }
    catch{
        res.status(200).json({ message: "Can't currently log into mail because GMAIL doesn't allow it"});
    }
});

router.post('/fromuser', (req, res) => {
    let user = req.body;

    let mailOptions = {
        from: mail.email,
        to: mail.email,
        subject: "[user contact]",
        html: `<h3> Sender: ${user.name}!</h3>
               <h3> Mail: ${user.mail}</h3>
               <p>${user.text}</p>`
    };
    try{
        sendMail(mailOptions, info => {
        console.log(`User mail is sent. Id: ${info.messageId}`);
        res.send(info);
        });
    }
    catch{
        res.status(200).json({ message: "Can't currently log into mail because GMAIL doesn't allow it"});
    }

});

async function sendMail(mailOptions, callback) {
  
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

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

module.exports = router;
