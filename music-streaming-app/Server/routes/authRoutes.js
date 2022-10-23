const {Router} = require("express");
const authController = require("../controllers/authController")
const router = Router();
const passport = require('passport');
const jwtConfig = require("../config/jwtConfig") ;


router.post("/signup", authController.signup_post);
router.post("/ArtistSignup", authController.artistSignup_post);
router.post("/login", authController.login_post);
router.post("/artistLogin", authController.artistLogin_post);
router.get("/logout", authController.logout_get);
router.get("/auth/google", authController.oauthlogin);
router.get("/auth/google/trusic", authController.callback, jwtConfig.storeToken);
router.get("/getUser", authController.sendUser);



module.exports = router;