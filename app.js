  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const Listing = require("./Models/listing.js");
  const path = require("path");
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));

  // app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.send("I am on with positive vibes");
  });

  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  }); 


  main()
.then(() => {
  console.log("MongoDb connection successful Rishi Raj Chandra");
})
.catch((err) => console.log (err));


async function main(){

  await mongoose.connect('mongodb://127.0.0.1:27017/webservices');
}

// app.get("/listeningss", async (req, res) => { 
//   const createListing = new Listing({
//     title: "The palace",
//     description: "This is a beautiful palace",
//     price: 500000,
//     location: "New York",
//     images: "",
//     country: "USA"
//   });




//   await createListing.save();
//   console.log("Listing created successfully");
//   res.send(createListing);


  
// });


app.get("/listings", async (req, res) => {
  console.log("Fetching listings...");
  const listings = await Listing.find();
  res.render("listings/showServices.ejs", { listings });
});



app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
} );

app.post("/listings/accomodation", async (req, res) => { 



  // const createListing = new Listing({   //case1 start
  //   title: req.body.title,
  //   description: req.body.description,
  //   price: req.body.price,
  //   location: req.body.location,
  //   images: req.body.images,
  //   country: req.body.country
  // });
    




  // await createListing.save();
  // console.log("Listing created successfully");
  // res.redirect("/listings");   // finishh the code

 
    let createNewListings = new Listing(req.body.listing); //case2 start
  await createNewListings.save();
  console.log("Listing created successfully");
  res.redirect("/listings");  //finish the code
});




app.get("/listings/:id", async (req, res) => {
let id = req.params.id;

let show = await Listing.findById(id);
res.render("listings/show.ejs", { show });

});




app.get("/listings/:id/edit", async (req, res) => {

  let id = req.params.id;
  let showObject = await Listing.findById(id);
  res.render("listings/edit.ejs", { showObject });
});
