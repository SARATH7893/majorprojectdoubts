const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middelware.js");
const reviewController=require("../controllers/reviews.js");

//post review route
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));
    
//delete review route 
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;