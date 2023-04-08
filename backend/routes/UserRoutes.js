const express = require("express");

const router = express.Router();

const User = require("../models/User");

const { body, validationResult } = require("express-validator");
const jwt =require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const jwtSecret ="THISISASECRETKEYFORLOGINAUTH"

router.post(
  "/create-user",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "length should be min 5 character ").isLength({ min: 5 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body.password);
    const salt =await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    

    try {
      
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      })
      .then(res.json({ success: true }));
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
router.post(
  "/login-user",
  [
    body("email").isEmail(),
    body("password", "length should be min 5 character ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: "Try with correct credentials" });
      }

      const pwd =await bcrypt.compare(req.body.password ,userdata.password);

      if (!pwd) {
        return res.status(400).json({ errors: "Try with correct credentials" });
      }
      const data ={
        user :{
          id:userdata.id
        }
      }
      const authToken =jwt.sign(data,jwtSecret)
      res.json({ success: true ,authToken:authToken});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
