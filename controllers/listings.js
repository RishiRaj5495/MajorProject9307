
const Listing = require("../Models/listing.js");
const mbxGeocoding  = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken : mbxToken });

module.exports.index = async (req, res) => {
  console.log("Fetching listings...");
  const listings = await Listing.find();
  // console.log("ls"+listings); 
  res.render("listings/showServices.ejs", { listings } )}; 



  module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};


module.exports.showRoute = async (req, res) => {
  //console.log("Fetching listing by ID...");
let id = req.params.id;

let show = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}) //populate reviews and author of reviews
.populate("owner");//it show the hole content of reviews ,not show only the id of reviews like[id:8u87878787uyuyi] or populate tb krte hai jb ref use krte hai jaise listing.reveiw
if(!show){
  req.flash("error","Listing not found");
  return res.redirect("/listings");
}
console.log("show"+show);
  //console.log("Listing found:", show);
  //res.send(show);
  //res.json(show);
  //res.render("listings/show.ejs", { show });
  //console.log("Rendering listing page...");
res.render("listings/show.ejs", { show });

};


// npm uninstall cloudinary

// npm install cloudinary@1.41.3












module.exports.createNewListing = async (req, res, next) => { 
  let url = req.file.path;
  let filename = req.file.filename;  

  let response = await geocodingClient
 // Use the geocoding client to forward geocode the location
.forwardGeocode({
  query: req.body.listing.location , // Get the location from the request body
  //query: "New York, NY", // Example location
  limit: 1
   
}).send();
// console.log(response.body.feature[0].geometry);
// res.send("done")  ;
// if(!req.body.listing){
//   throw new ExpressError("Send valid data for listing",404)
// isLogged ,}


  // const createListing = new Listing({   //case1 start
  //   title: req.body.title,
  //   description: req.body.description,
  //   price: req.body.price,
  //   location: req.body.location,
  //   images: req.body.images,
  //   country: req.body.country
  // });
    

console.log("Go ahead");



  // await createListing.save();
  // console.log("Listing created successfully");
  // res.redirect("/listings");   // finishh the code

 
    let createNewListings = new Listing(req.body.listing);
    createNewListings.images = { url, filename }; 
  createNewListings.owner= req.user._id;
   // Assign the current user's ID to the owner field
  // You can also access other properties like username if available
 
 createNewListings.geometry = response.body.features[0].geometry; // Set the geometry field with the geocoded location
  console.log("Current user's username:", req.user.username);
  console.log(req.user.email);
  console.log(req.user.password);
  console.log(createNewListings.geometry.coordinates); // Log the coordinates to verify
  // console.log(response.body);
    console.log(createNewListings.images) ;//case2 start
 let printListing =  await createNewListings.save();
 console.log(printListing);
  req.flash("success","New listing Created");
  console.log("Listing created successfully");
  res.redirect("/listings");  //finish the code
};



// module.exports.renderEditForm = async (req, res) => {
//   let id = req.params.id;
//   let show = await Listing.findById(id);
// console.log(show.images.url);
//    let originalImage = show.images.url;
//    originalImage = originalImage.replace("/upload", "/upload/w_250"); // Adjust the image URL for display



//   res.render("listings/edit.ejs", { show , originalImage })}; // Pass the show object to the edit form


module.exports.renderEditForm = async (req, res) => {
  let id = req.params.id;
  let show = await Listing.findById(id);
  console.log(show.images.url);
  let originalImage = String(show.images.url);
  console.log(typeof originalImage)
  originalImage = originalImage.replace("/upload", "/upload/w_250"); // Adjust the image URL for display

  res.render("listings/edit.ejs", { show, originalImage });
};




module.exports.updateListing = async(req, res) => {
  let id = req.params.id;


  let showObject = await Listing.findByIdAndUpdate(id, {...req.body.listing},{new:true}); // Update the listing with the new data
if(typeof req.file != "undefined") { // Check if a new file was uploaded
  let url = req.file.path;
  let filename = req.file.filename;
  showObject.images = { url, filename }; // Update the images field with the new image data
  await showObject.save(); 
}// Save the updated listing object



  req.flash("success","Listing updated successfully");
  res.redirect("/listings/"+ id);
};

module.exports.deleteListing = async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndDelete(id); // one listing deleted
  req.flash("success","Listing deleted successfully");
  res.redirect("/listings");
};