  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;
  const listeningSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    location: {
      type: String,
    },
    images: {
      default: "https://thehamiltoncollection.com/cdn/shop/articles/ev-22_1.jpg?v=1738216710&width=1100",
      type: String,
      set : (v) => v === "" ? "https://thehamiltoncollection.com/cdn/shop/articles/ev-22_1.jpg?v=1738216710&width=1100" : v,

    },
    country :{

      type: String,
    },
   
    });


    const Listing = mongoose.model("Listing", listeningSchema);
    module.exports =  Listing;
    // Export the model



