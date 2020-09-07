const express = require("express");
const userModel = require("./usersModel");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const user = req.body;
  const userInMongo = userModel.findOne({ email: user.email });

  if (
    user.email === userInMongo.email &&
    user.password === userInMongo.password
  ) {
    return res.status(200).json({ message: "Login success!" });
  } else {
    return res.status(403).json({ message: "Wrong email/password" });
  }
});

userRouter.post("/register", async (req, res) => {
  const user = req.body;
  // TODO check if user email exists
  const userInMongo = new userModel(user);
  console.log(userInMongo.db.name);
  console.log(userInMongo);
  await userInMongo.save();
  return res.status(201).send();
});

module.exports = userRouter;
