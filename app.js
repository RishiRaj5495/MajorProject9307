  
  if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();}

  
  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");

  const path = require("path");
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  const methodOverride = require("method-override");
  app.use(methodOverride("_method"));
  const ejsMate = require("ejs-mate");
  app.engine("ejs", ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));

const ExpressError = require("./utils/ExpressError.js"); 
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const User = require("./Models/users.js");
const LocalStrategy = require("passport-local");


   const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto :{
  secret : process.env.SECRET,

  },
  touchAfter: 24 * 3600 , // 1 day in seconds
   })
store.on("error", () => {
Console.log("error in session store",err);

})


const sessionOptions = {
  store,
secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true ,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 day
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
 
  },


};


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Use the LocalStrategy for authentication
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Middleware to set flash messages and user information in locals


  // app.use(express.static(path.join(__dirname, "public")));
// app.get("/", (req, res) => {
//     res.send("I am on with positive vibes");
//   });





  
app.use((req,res,next) => {

res.locals.success = req.flash("success");
res.locals.error = req.flash("error");
res.locals.currentUser = req.user; // Set the current user in locals for use in views
next();
});



 


//   app.all("*", (req, res, next) => {
//   // You can use 'throw' here, but it's not recommended in async code.
//   // For synchronous code, 'throw' works:
//   // throw new ExpressError("404, Page not found", 404);

//   // However, in Express, it's better to use 'next' to pass errors to the error handler:
//   next(new ExpressError("Page not found",404));
// });




 const listingsRouter = require("./routes/listings.js");
 app.use("/listings", listingsRouter);
const reviewsRouter = require("./routes/reviews.js");

app.use("/listings/:id/reviews", reviewsRouter);

const usersRouter = require("./routes/users.js");
const { Console } = require('console');
app.use("/users", usersRouter);


const dbUrl = process.env.ATLAS_URL;


  main()
.then(() => {
  console.log("MongoDb(webservices) connection successful Rishi Raj Chandra ");
})
.catch((err) => console.log (err));





async function main(){

  await mongoose.connect(dbUrl);

  
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




// app.get("/listings/:id", async (req, res) => {
//   console.log("Fetching listing by ID...");
// let id = req.params.id;

// let show = await Listing.findById(id);
// console.log(show);
// res.render("listings/show.ejs", { show });

// });//p


























// app.all("*",(req,res,next) =>{

// next(new ExpressError("Page not found",404));

// }); 




app.get("/", (req, res) => {
  res.redirect("/listings"); // ✅ sends users to /listings
});








app.use((err,req,res,next) =>{
  let {message ="Not valid",statusCode = 400} = err;
//  res.status(statusCode).send(message);
// console.log("my errr"+err);
 res.render("error.ejs",{err});
});






  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });