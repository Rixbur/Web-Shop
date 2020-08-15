const express = require('express');
const products = require('./products')

const app = express();
const port = 3000;

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
app.listen( port,
            () =>{
                console.log("The app is active on localhost:3000.");
            });