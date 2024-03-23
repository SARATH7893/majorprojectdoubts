const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
};

router.get("/",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));
   
router.get("/new",(req,res)=>{
       res.render("./listings/new.ejs");
});
  
//SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
           let { id } = req.params;
             const listing = await Listing.findById(id).populate("reviews");
             if(!listing){
              req.flash("error","LISTING YOU REQUESTED FOR DOES NOT EXIST!" );
              res.redirect("/listings");
             }
             res.render("./listings/show.ejs", { listing });
     })
);

//CREATE ROUTE
router.post("/",validateListing,wrapAsync(async (req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","NEW LISTING CREATED!");
    res.redirect("./listings");
}));

//EDIT ROUTE
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","LISTING YOU REQUESTED FOR DOES NOT EXIST!" );
      res.redirect("/listings");
     }
    res.render("./listings/edit.ejs",{listing});
}));

//UPDATE ROUTE
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  req.flash("success","LISTING UPDATED!");
  res.redirect(`/listings/${id}`); 
}));

//DELETE ROUTE
router.delete("/:id",wrapAsync(async (req,res)=>{
    let { id } = req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," LISTING DELETED!");
    res.redirect("/listings");
}));

module.exports=router;