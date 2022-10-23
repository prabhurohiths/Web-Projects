const jwt = require('jsonwebtoken');
const Cookies = require("js-cookie");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge
  });
}

// Store token in a cookie, send data and redirect the user to dashboard
module.exports.storeToken = (req,res) => {
    try {
   
    const id = req.user.googleId ? req.user.googleId : req.user._id;
    const user = req.user;
    const token = createToken(id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    req.app.set("user", user);
    if (req.user.googleId || req.user.oAuthUser !== false) {
      return res.redirect("https://trusic.herokuapp.com/displaySongs");
    } else {
    res.status(200).json({user, token});
    }
    } catch(err) {
      console.log(err);
    }

}

module.exports.createToken = createToken;
module.exports.maxAge = maxAge;




