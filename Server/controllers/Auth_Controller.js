const User = require('../models/User'); // User model
const jwt = require("jsonwebtoken"); // JWT for tokens
const bcrypt = require("bcryptjs"); // Bcrypt for hashing
const ResponseService = require('../utils/RresponseService')


const JWT_SECRET = process.env.JWT_SECRET;

// Signup
exports.signUp = async function (req, res) {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.json({status: 404, msg: "user already exists" });
  }else{
    let user = { name, email, password: encryptedPassword, }

    new User(user).save((err, doc) => {
      ResponseService.generalPayloadResponse(err, doc, res);
    });
  }  
}

// Login
exports.login = async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({status: 404, msg: "User Not found" });
  }
  if (user.role=='pending') {
    return res.json({status: 401, msg: "Please Contact Admin Your account still not active " });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 86400,
    });
    if (res.status(200)) {
      return res.json({  status: 200, data: token });
    } else {
      return res.json({  status: 400, msg: "error" });
    }
  }
  return res.json({ status: 400, msg: "Invalid Password" });
}

exports.getUserDetails = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
}