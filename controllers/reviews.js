const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");



 module.exports.createReview = async(req, res) => {
 
   console.log("Adding a new review...");
   let listing = await Listing.findById(req.params.id);
    
   let review = new Review(req.body.review);
   review.author = req.user._id;
   listing.reviews.push(review);
 
   await review.save();
   await listing.save();
    req.flash("success","New review added successfully!");
   res.redirect(`/listings/${listing._id}`);

 };


 module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};