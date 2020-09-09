const express = require("express");
const userModel = require("./usersModel");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const user = req.body;
  //console.log(user.email);
  var query  = userModel.where({ email: user.email });
  query.findOne(function (err, userInMongo) {
    console.log(user.email);
    console.log(userInMongo);
    if (
      user.email === userInMongo.email &&
      user.password === userInMongo.password
    ) {
      return res.status(200).json({ message: "Login success!"});
    } else {
      return res.status(403).json({ message: "Wrong email/password" });
    }
  
  })
  // const userInMongo =  userModel.findOne({ email: user.email })
  // console.log(user.email);
  // console.log(userInMongo);
  // if (
  //   user.email === userInMongo.email &&
  //   user.password === userInMongo.password
  // ) {
  //   return res.status(200).json({ message: "Login success!"});
  // } else {
  //   return res.status(403).json({ message: "Wrong email/password" });
  // }
});

userRouter.post("/register", async (req, res) => {
  const user = req.body;
  // check if user email exists
  const query  = await userModel.findOne({ email: user.email }).exec();
  console.log(query);
  
  if(query==null){
    const userInMongo = new userModel(user);
    console.log(userInMongo);
    await userInMongo.save();

    return res.status(202).send();
  }
  return res.status(201).json({ message: "Already registered!"});
});

module.exports = userRouter;
