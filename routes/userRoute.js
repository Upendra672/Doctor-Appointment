const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middlewares/authMiddleWare");

router.post("/register", async (req, res) => {
  try {
    console.log("req: ", req);
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      // Use status code 409 for conflict (user already exists)
      return res
        .status(400)
        .send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);

    // Use status code 201 for created, as you're creating a new user
    return res
      .status(201)
      .send({ message: "User Registered successfully ", success: true });
  } catch (error) {
    // Use status code 500 for internal server error
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error creating user", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Implement your login logic here
    const user = await User.findOne({ email: req.body.email });
    console.log("user: ", user);

    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .send({
          message: "Logged in Successfully",
          token: token,
          userId: user._id,
          success: true,
        });
    }
  } catch (error) {
    console.log("login error: ", error);
    // Use status code 500 for internal server error
    return res
      .status(500)
      .send({ message: "Error during login", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.UserId });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    return res
      .status(200)
      .send({
        data: { name: user.name, email: user.email },
        message: "User info",
        success:true
      });
  } catch (error) {
    return res.status(500).send({ message: "Error getting users info", success: false });
  }
});

module.exports = router;
