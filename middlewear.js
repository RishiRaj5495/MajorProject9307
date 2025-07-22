
const Listing = require("./Models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const{ listingSchema } = require("./schima.js");
const{ reviewSchema } = require("./schima.js");
const Review = require("./Models/review.js");

module.exports.isLogged = (req, res, next) => {
  // console.log(req);
 

  if (!req.isAuthenticated()) {
     req.session.redirectUrl = req.originalUrl; // Save the original URL to redirect after login
    req.flash("error", "You must be signed in first!");
    return res.redirect("/users/login");
  }

    next();

};

module.exports.saveRidirectUrl = (req, res, next) => {



if(req.session.redirectUrl) {
  res.locals.redirectUrl = req.session.redirectUrl ;} // Make current user available in views
 next();


}


module.exports.isOwner = async(req, res, next) => {


  let id = req.params.id;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currentUser._id)){ // Check if the current user is the owner(owner id already saved) of the listing
    req.flash("error","You do not have permission to edit this listing");
    return res.redirect("/listings");
  }

next();

};


  module.exports.validateListing = (req,res,next) => { 
      let {error} = listingSchema.validate(req.body); 
    
      console.log(error); 

      if(error){
        throw new ExpressError(error,400); 
      }else{
        next();
      }
  };


    module.exports.validateReview = (req,res,next) =>{
      
       let {error} = reviewSchema.validate(req.body); 
      let err = reviewSchema.validate(req.body); 
       console.log(err);
      

      if(error){
        let erMsg = error.details.map((el) => el.message).join(", ");
        console.log(erMsg);
         throw new ExpressError(erMsg,400); 
      }else{
       next();
      }

 };


 module.exports.isReviewAuthor = async(req, res, next) => {


  let reviewId = req.params.reviewId;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currentUser._id)){ // Check if the current user is not the author of the review
    req.flash("error","You do not have permission to delete this review");
    return res.redirect("/listings");
  }

next();

};
