  const express = require("express");
  const router = express.Router();
  
  
  
  
  
  router.get("/", (req, res) => {
    res.send("Get for posts");
  });
  //show - users
  router.get("/:id", (req, res) => {
    // const userId = req.params.id;
    res.send("Get for posts id");
  });
  //post - users
  router.post("/", (req, res) => {
    
    res.send("Post for posts")
  });

  //delete - users
  router.delete("/:id", (req, res) => {
    // const userId = req.params.id;
    res.send("Delete for posts id");
  });

  module.exports = router;