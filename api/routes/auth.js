const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(401).json("Email already exists!");
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong email1 or password!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong email or password!");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "100d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
