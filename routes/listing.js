const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middelware.js");

const listingController=require("../controllers/listing.js");

router.route("/")
.get(wrapAsync(listingController.index))//INDEX ROUTE
.post(validateListing,isLoggedin,wrapAsync(listingController.createListing));//CREATE ROUTE

//NEW ROUTE
router.get("/new",isLoggedin,listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))//SHOW ROUTE
.put(isLoggedin,isOwner,validateListing, wrapAsync(listingController.updateListing))//UPDATE ROUTE
.delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));//DELETE ROUTE

//EDIT ROUTE
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;