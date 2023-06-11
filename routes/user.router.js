const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
// const { auth } = require("../middleware/auth.middleware");
const bcrypt=require("bcrypt");
require("dotenv").config();
const { UserModel } = require("../model/user.model");

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User already exists, please login" });
    }

    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        return res.json({ error: err.message });
      } else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.json({ msg: "User has been registered", user: req.body });
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          let token = jwt.sign({userID:user._id,user:user.name}, process.env.secret);
          // Imseh jo user._id hai woh uper waleh const user se mila hua hai
          res.json({ msg: "User Logged IN", token });
        } else {
          res.json({ error: "Invalid password" });
        }
      });
    } else {
      res.json({ error: "User does not exist" });
    }
  } catch (err) {
    res.json({ error: err.message || "An error occurred" });
  }
});

// userRouter.post("/login", async (req, res) => {
//   const { email, pass } = req.body;
//   try{
//     const user=await UserModel.findOne({email});
//     if(user){
//       bcrypt.compare(pass, user.pass,(err,result)=>{
//         if(result){
//           let token=jwt.sign({course:"BE"},"masai")
//           res.json({ msg: "User Logged INN",token});
//         }else{
//           res.json({ error: err.message });
//         }
//       })
//     }else{
//       res.json({ msg: "User doesnot exist"});
//     }
//   }catch (err) {
//     res.json({ error: err.message });
//   }
// })


module.exports = { userRouter };
