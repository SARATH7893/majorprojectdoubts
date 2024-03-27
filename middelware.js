const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
const Listing=require("./models/listing");
const Review=require("./models/review");

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","YOU MUST BE LOGGED IN TO CREATE A LISTING!" );
         return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
if(req.session.redirectUrl){
res.locals.redirectUrl=req.session.redirectUrl;
}
next();
};

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    console.log(listing);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","YOU ARE NOT THE OWNER OF THIS LISTING!");
      return res.redirect(`/listings/${id}`); 
    }
    next();
};


module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id, reviewId } = req.params;
  let review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","YOU ARE NOT THE AUTHOR  OF THIS REVIEW!");
    return res.redirect(`/listings/${id}`); 
  }
  next();
};
