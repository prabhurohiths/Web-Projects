const User = require("../models/User");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const {createToken, maxAge} = require("../config/jwtConfig") 

// controller actions

// ************************ SIGNUP AND LOGIN FOR LISTENERS ************************ //

// Signup using Register Form
module.exports.signup_post = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const role = "user";
  const oAuthUser = false;
    try {
    const user = await User.create({ name, phone, email, password, role, oAuthUser});
    req.app.set("user", user);
    const token = await createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user, token});
    } catch(err) {
      console.log(err);
    }
}

// Signin using Login Form
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user.password) {
      req.app.set("user", user);
      const token = createToken(user._id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user, token });
    } else if (user.googleId) {
      res.json({ message: "Use Google sign in" });
    } else {
      res.json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};


// ************************ SIGNUP AND LOGIN FOR ARTISTS ************************ //

// Signup using Register Form
module.exports.artistSignup_post = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const role = "artist";
  const oAuthUser = false;
    try {
    const user = await User.create({ name, phone, email, password, role, oAuthUser});
    const token = await createToken(user._id);
    req.app.set("user", user);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user, token});
    } catch(err) {
      console.log(err);
    }
}


// Signin using Login Form
module.exports.artistLogin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if(user.password && user.role === "artist") {
    req.app.set("user", user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user, token});
    }
    else if(user.password && user.role !== "artist") {
      res.json({message: "Not an artist"});
    }
    else {
      res.json({user});
    }
    
  }
  catch (err){
    console.log(err);
    res.status(400).json({err});
  }
}


// ************************ LOGOUT ************************ //

module.exports.logout_get = (req,res) => {
  res.cookie("jwt", "", {maxAge: 1});
  req.app.set("user", {message: "Not logged in"});
}

// ************************ OAUTH ************************ //

// Send user to frontend after OAuth
module.exports.sendUser = (req, res) => {
  const user = req.app.get("user");
  res.json(user);
 
};

// Passport Middleware and Callback for OAuth
module.exports.oauthlogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

module.exports.callback = passport.authenticate("google", {
  failureRedirect: "https://trusic.herokuapp.com/login",
});
