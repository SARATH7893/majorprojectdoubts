const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middelware.js");

const listingController=require("../controllers/listing.js");

//INDEX ROUTE
router.get("/",wrapAsync(listingController.index));
  
//NEW ROUTE
router.get("/new",isLoggedin,listingController.renderNewForm);
  
//SHOW ROUTE
router.get("/:id", wrapAsync(listingController.showListing));

//CREATE ROUTE
router.post("/",validateListing,isLoggedin,wrapAsync(listingController.createListing));

//EDIT ROUTE
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

//UPDATE ROUTE
router.put("/:id",isLoggedin,isOwner,validateListing, wrapAsync(listingController.updateListing));

//DELETE ROUTE
router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;