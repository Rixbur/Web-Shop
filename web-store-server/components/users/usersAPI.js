const express = require("express");
const userModel = require("./usersModel");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const query  = await userModel.findOne({ email: loginInfo.email, password: loginInfo.password }).exec();
  if(query==null){
    return res.status(202).send();
  }
  return res.status(201).json({ message: "Already registered!"});
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

module.exports = userRouter;
