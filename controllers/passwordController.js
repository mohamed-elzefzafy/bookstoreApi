const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

/**
 * @desc    Get Forgot Password View   
 * @route   /password/forgot-Password
 * @mrthod  GET
 * @access  public
 */
module.exports.getForgotPsswordView = asyncHandler((req , res) => {
  res.render("forgot-password");
})




/**
 * @desc    send Forgot Password link   
 * @route   /password/forgot-Password
 * @mrthod  POST
 * @access  public
 */
module.exports.sendForgotPsswordLink = asyncHandler( async (req , res) => {
  const user = await User.findOne({email : req.body.email});
  if (!user) {
    res.status(404).json({message : "user not found"})
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({email : user.email , id : user.id} , secret , {
    expiresIn : "10m"
  });

  const link = `http://localhost:5000/password/reset-Password/${user.id}/${token}`;

       const transporter = nodemailer.createTransport({
        service : "gmail" ,
        auth : {
          user : process.env.USER_EMAIL ,
          pass : process.env.USER_PASS,
        } });

        const mailOptions = {
          from : process.env.USER_EMAIL ,
          to : user.email,
          subject: "rest password" ,
          html : `<div>
          <h4>click on the link below to reset the password</h4>
          <p>${link}</p>
          
        </div>`
        

        }


        transporter.sendMail(mailOptions , function (error , success) {
          if (error) {
            console.log(error);
            res.status(500).json({message : "some thing went wrong"});
          } else {
            console.log("email sent" + success.response);
            res.render("link-send");
          }
        });

        
  
})






/**
 * @desc    Get reset Password view   
 * @route   password/reset-Password/:userid/:token
 * @mrthod  GET
 * @access  public
 */
module.exports.getRestPasswordView = asyncHandler( async (req , res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404).json({message : "user not found"})
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  
  try {
    jwt.verify(req.params.token , secret);
    res.render("reset-Password" , {email : user.email});
  } catch (error) {
    console.log(error);
    res.json({message : "error"});
  }
  

})




/**
 * @desc     reset the Password    
 * @route   password/reset-Password/:userid/:token
 * @mrthod  POST
 * @access  public
 */
module.exports.RestThePassword = asyncHandler( async (req , res) => {
  const {error} = validateChangePassword(req.body);
  if (error) {
    return res.status(400).json({message : error.details[0].message})
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404).json({message : "user not found"})
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  
  try {
    jwt.verify(req.params.token , secret);
    const salt =await bcrypt.genSalt(10);
    req.body.password = await  bcrypt.hash(req.body.password , salt);
  
    user.password = req.body.password;
    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({message : "error"});
  }
  

})

