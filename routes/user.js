const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middelware.js");

const userConTroller=require("../controllers/users.js");

router.get("/signup",userConTroller.renderSignupForm);

router.post("/signup",wrapAsync(userConTroller.signUp));

router.get("/login",userConTroller.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userConTroller.login);

router.get("/logout",userConTroller.logout);

module.exports=router;