const express = require("express");
const userModel = require("./usersModel");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const query  = await userModel.findOne({ email: loginInfo.email, password: loginInfo.password }).exec();
  if(query==null){
    return res.status(202).send();
  }
  return res.status(201).json({ message: "Logged in!"});
});

userRouter.post("/register", async (req, res) => {
  const user = req.body;
  const query  = await userModel.findOne({ email: user.email }).exec();
  
  
  if(query==null){
    const userInMongo = new userModel(user);
    
    await userInMongo.save();

    return res.status(202).send();
  }
  return res.status(201).json({ message: "Already registered!"});
});


userRouter.get("/user/:email", async (req, res) => {
  const userEmail = req.params.userEmail;
  console.log(req.params);
  const userInfo = await userModel.find({email: userEmail}).exec();
  if(userInfo==null){
    return res.status(202).send();
  }
  return res.status(201).json(userInfo);
});



module.exports = userRouter;
