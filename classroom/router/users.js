  const express = require("express");
  const router = express.Router();
  
  
  
  
  
  router.get("/", (req, res) => {
    res.send("Get for users");
  });
  //show - users
  router.get("/:id", (req, res) => {
    // const userId = req.params.id;
    res.send("Get for users id");
  });
  //post - users
  router.post("/", (req, res) => {
    
    res.send("Post for users")
  });

  //delete - users
  router.delete("/:id", (req, res) => {
    // const userId = req.params.id;
    res.send("Delete for users id");
  });

  module.exports = router;