const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");

/* SIGNUP */

router.post("/signup", async (req,res)=>{
  try{

    const {name,email,password} = req.body;

    const hashPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashPassword
    });

    await user.save();

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}
    );

    res.json({
      message:"User Registered Successfully",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    });

  }catch(err){
    res.status(500).json(err);
  }
});


/* LOGIN / SIGNIN */

router.post("/login", async(req,res)=>{
  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
      return res.status(400).json({message:"Invalid Password"});
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}
    );

    res.json({
      message:"Login Successful",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    });

  }catch(err){
    res.status(500).json(err);
  }
});

/* SIGNIN ALIAS */
router.post("/signin", async(req,res)=>{
  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
      return res.status(400).json({message:"Invalid Password"});
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}
    );

    res.json({
      message:"Login Successful",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    });

  }catch(err){
    res.status(500).json(err);
  }
});


/* HOME */

router.get("/home", verifyToken ,(req,res)=>{
  res.json({
    message:"Welcome to Home Page",
    user:req.user
  });
});

module.exports = router;