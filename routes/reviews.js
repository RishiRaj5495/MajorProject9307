const express = require("express");
const router = express.Router({mergeParams :true}); // mergeParams allows us to access params from the parent route
const wrapAsync = require("../utils/wrapAsync.js") ;
const { validateReview ,isLogged, isReviewAuthor} = require("../middlewear.js");
const {createReview, deleteReview} = require("../controllers/reviews.js"); // Import the functions from the controller



router.post("/",isLogged,validateReview, wrapAsync(createReview));


router.delete("/:reviewId",isLogged,isReviewAuthor, wrapAsync(deleteReview));



module.exports = router;





