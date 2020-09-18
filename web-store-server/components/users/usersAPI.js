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

    return res.status(201).send();
  }
  return res.status(202).json({ message: "Already registered!"});
});

userRouter.post("/update", async (req, res, next) => {
  console.log("hello im updating");
  try{
    const info = req.body;
    const query  = await userModel.findOne({ email: info.email, password: info.password }).exec();
    console.log("hello I found you");
    if(query==null){
      console.log("update failed");

      return res.status(202).send();
    }
    const updated={
      _id: query._id, 
      email: info.email, 
      password: info.newPassword, 
      address: info.address, 
      name: info.name
    };
    console.log(updated);
    await userModel.updateOne({ _id: query._id }, {$set: updated}).exec();
    console.log(update.success);
    return res.status(201).send();

  }
  catch(e){
    next(e);
  }
});

userRouter.get("/info/:email", async (req, res) => {
  const userEmail = req.params.email;
  console.log(req.params.email);
  const userInfo = await userModel.findOne({email: userEmail}).exec();
  if(userInfo==null){
    return res.status(202).send();
  }
  // console.log(userInfo);
  // console.log(userInfo.email);
  return res.status(201).json(userInfo);
});



module.exports = userRouter;
