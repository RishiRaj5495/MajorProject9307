  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const Listing = require("./Models/listing.js");
  const path = require("path");
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  const methodOverride = require("method-override");
  app.use(methodOverride("_method"));
  const ejsMate = require("ejs-mate");
  app.engine("ejs", ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));


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
  console.log(listings);
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
    

console.log("Go ahead");


  // await createListing.save();
  // console.log("Listing created successfully");
  // res.redirect("/listings");   // finishh the code

 
    let createNewListings = new Listing(req.body.listing);
    console.log(createNewListings) ;//case2 start
  await createNewListings.save();
  console.log("Listing created successfully");
  res.redirect("/listings");  //finish the code
});




app.get("/listings/:id", async (req, res) => {
  console.log("Fetching listing by ID...");
let id = req.params.id;

let show = await Listing.findById(id);
console.log(show);
res.render("listings/show.ejs", { show });

});




app.get("/listings/:id/edit", async (req, res) => {

  let id = req.params.id;
  let show = await Listing.findById(id);
  res.render("listings/edit.ejs", { show });
});


app.put("/listings/:id", async (req, res) => {
  let id = req.params.id;
  let showObject = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
  res.redirect("/listings/"+ id);
});


app.delete("/listings/:id", async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

