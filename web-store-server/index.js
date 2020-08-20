const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const mail = require("./mail.json");
const products = require('./products')

const app = express();
const port = 3000;


app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.listen( port,
    () =>{
        console.log("The app is active on localhost:3000.");
    });


app.get('/', (req,res)=>{

    console.log("Hello world!");
    res.send();
});

app.get('/api/products',(req,res)=>{
    console.log("Sending all products");
    res.status(200);
    res.set('Content-type','application/json');
    res.send(JSON.stringify(products));

});

app.post("/sendmail", (req, res) => {
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
          Thank you for thrusting us. You ordered: ${cart.order}.
           Your order will be sent soon.
          Best wishes, oyur team! `
    };

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}


