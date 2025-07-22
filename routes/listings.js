const express = require("express");

const router = express.Router();
  const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js") ;
const listingController = require("../controllers/listings.js"); //hm reqiure krke (listimgController.index) ko bhi use kr skte hai case 1 example below
const {renderNewForm } = require("../controllers/listings.js"); //hm direct require krke (renderNewForm) ko bhi use kr skte hai case 2 example below
const {isLogged,isOwner,validateListing} = require("../middlewear.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js"); // Importing storage from cloudinary
 
const upload = multer({ storage});










router.get("/",wrapAsync(listingController.index));// example 1: using listingController.index directly


//2
router.get("/new",isLogged ,renderNewForm); // example 2: using renderNewForm directly
// //2


//3
router.post("/accomodation", isLogged,
  
 upload.single("listing[images]"),  validateListing,
  wrapAsync(listingController.createNewListing));//3

// router.post("/accomodation",upload.single("listing[images]"),(req,res) => {
//  console.log(req.file);
//   res.send(req.file);
// });//3

router
.route("/:id") // Using route to chain methods for the same path
.get(wrapAsync(listingController.showRoute))
.put(isLogged ,isOwner,
   upload.single("listing[images]"),
  validateListing,
  wrapAsync(listingController.updateListing)) //4
.delete(isLogged ,isOwner, wrapAsync(listingController.deleteListing)); //5




router.get("/:id/edit",isLogged ,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;