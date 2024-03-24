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