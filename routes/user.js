const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middelware.js");

const userConTroller=require("../controllers/users.js");

router.route("/signup")
.get(userConTroller.renderSignupForm)
.post(wrapAsync(userConTroller.signUp));

router.route("/login")
.get(userConTroller.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userConTroller.login);

router.get("/logout",userConTroller.logout);

module.exports=router;