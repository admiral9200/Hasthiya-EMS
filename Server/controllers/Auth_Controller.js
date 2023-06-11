const User = require('../models/User'); // User model
const jwt = require("jsonwebtoken"); // JWT for tokens
const bcrypt = require("bcryptjs"); // Bcrypt for hashing
const nodemailer = require("nodemailer");// Nodemailer for sending emails
const ResponseService = require('../utils/RresponseService')


const JWT_SECRET = process.env.JWT_SECRET;

// Signup
exports.signUp = async function (req, res) {
  const { name, email, password } = req.body;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return res.json({ status: 422, msg: "Invalid Email!" });
  }
  if (password.length < 8) {
    return res.json({ status: 422, msg: "Password should consist at least 8 characters including letters and numbers!" });
  }
  
  // Check if password contains at least one letter and one number
  var hasLetter = false;
  var hasNumber = false;
  for (var i = 0; i < password.length; i++) {
    var char = password[i];
    
    if (/[a-zA-Z]/.test(char)) {
      hasLetter = true;
    } else if (/[0-9]/.test(char)) {
      hasNumber = true;
    }
    
    // If both letter and number are found, return true
    if (hasLetter && hasNumber) {
      return true;
    }
  }

  if (!(hasLetter && hasNumber)) {
    return res.json({ status: 422, msg: "Password should consist at least 8 characters including letters and numbers!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.json({ status: 404, msg: "user already exists" });
  } else {
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
    return res.json({ status: 404, msg: "User Not found" });
  }
  if (user.role == 'pending') {
    return res.json({ status: 401, msg: "Please Contact Admin Your account still not active " });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });
    if (res.status(200)) {
      res.cookie('jwt', token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
      })
      return res.json({ status: 200, data: token });
    } else {
      return res.json({ status: 400, msg: "Invalid Credentials" });
    }
  }
  return res.json({ status: 400, msg: "Invalid Credentials" });
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
    User.findOne({ email: useremail }).populate('designation', 'name').populate('reportPerson', 'name')
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
}


//forgot password mail
exports.getForgetPasswordMail = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: 404, msg: "User Not found" });
  }

  // sending email for users
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Forget Password",
    html: `
    <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
     <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td>
                <h2 style="color: #333333;">Forgot Password</h2>
                <p style="color: #666666;">Dear ${user.name},</p>
                <p style="color: #666666;">We received a request to reset your password. If you did not make this request, please ignore this email.</p>
                <p style="color: #666666;">To reset your password, click the button below:</p>
                <p style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:8080/forgetPassword/${user._id}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Reset Password</a>
                </p>
                <p style="color: #666666;">If the above button does not work, you can copy and paste the following link into your web browser:</p>
                <p style="color: #666666; margin-bottom: 30px;">http://localhost:8080/forgetPassword/${user._id}</p>
                <p style="color: #666666;">Thank you,<br>
                sakya thilakarathana<br>
                Hasthiya IT.</p>
            </td>
        </tr>
      </table>
    </body>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ status: 200, msg: "Check your mail" });
    }
  });
}

// forget password
exports.setForgetPassword = (async (req, res) => {

  const { password } = req.body;

  if (password.length < 8) {
    return res.json({ status: 422, msg: "Password should consist at least 8 characters including letters and numbers!" });
  }
  
  // Check if password contains at least one letter and one number
  var hasLetter = false;
  var hasNumber = false;
  for (var i = 0; i < password.length; i++) {
    var char = password[i];
    
    if (/[a-zA-Z]/.test(char)) {
      hasLetter = true;
    } else if (/[0-9]/.test(char)) {
      hasNumber = true;
    }
    
    // If both letter and number are found, return true
    if (hasLetter && hasNumber) {
      return true;
    }
  }

  if (!(hasLetter && hasNumber)) {
    return res.json({ status: 422, msg: "Password should consist at least 8 characters including letters and numbers!" });
  }
  
  const encryptedPassword = await bcrypt.hash(password, 10);
  const newuser = { password: encryptedPassword }
  User.findByIdAndUpdate(req.params.id, newuser, (err, doc) => {
    ResponseService.generalPayloadResponse(err, doc, res, "password updated successfully");
  });
});