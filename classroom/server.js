 const express = require("express");
  const app = express();
  const usersRouter = require("./router/users.js");
const postsRouter = require("./router/post.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode")); // Secret key for signing cookies  
   const session = require("express-session");
   const flash = require("connect-flash");

const path = require("path");


app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views",path.join(__dirname,"views")); // Set the directory for views




const sessionOptions = {
secret : "mysupersecretkey",
  resave : false,
  saveUninitialized : true ,
};


app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash  ("success");
  res.locals.error = req.flash("error");
  next();
});  

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name; // Store the name in the session
  console.log(req.session.name);
  // res.send(`Welcome to the registration page, ${name}!`);
  
if(req.session.name != "anonymous")
    req.flash("success","user registered successfully!" ); // Set a flash message here success is keyword.  
else
    req.flash("error","user not registered successfully!" ); // Set a flash message here success is keyword.

  res.redirect("/login"); // Redirect to the login page after registration

});


app.get("/login", (req, res) => {
  //  res.send(`Hello ${req.session.name || "Guest"}! You are logged in.`); // Access the name from the session
// console.log(res.flash("success"));


 //case 1 msg ke through flash message
   //res.render("page.ejs", { name: req.session.name || "Guest" , msg:req.flash("success")}); // Render a login page with the name // msg ke through flash message

   //case 2 
//  res.locals.msg = req.flash("success");
//  res.locals.error = req.flash("error");
   res.render("page.ejs", { name: req.session.name || "Guest"});

});




app.get("/count", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  }
  else{
    req.session.views = 1;
  }
  res.send(`Request send to ${req.session.views} times`);
});
  





// app.get("/getcookies", (req, res) => {
//   res.cookie("made-in", "India",{signed: true}); // Set a signed cookie

//   // res.cookie("sessionId", "123456789"); // Set a regular cookie

//     res.send("Signed cookie set!");
//   });


//   app.get("/",(req, res) => {
//     res.send("Get for post");
//     console.dir(req.cookies);
//   });



//   app.get("/greet", (req, res) => {
// let {name = "Anonymous"} = req.cookies;
//     if (!name) {
//       res.send("Hello, Guest!");
//     } else {
//       res.send(`Hello, ${name}!`);
//     }
//   });


//   app.get("/verify", (req, res) => {

//   //  console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("Cookies verified!");

//   });


// app.use("/users", usersRouter);
// app.use("/posts", postsRouter);



  

 


  app.listen(8080, () => {
    console.log(" Classroom Server is running on port 8080");
  });