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
      url : String,
      filename : String,

    },
    country :{
      type: String,
    },
  reviews :[
     {
      type : Schema.Types.ObjectId,
    ref : "Review"
          
    },
],
    owner :{
 type : Schema.Types.ObjectId,
    ref : "User"
    },


geometry : { // GeoJSON format for map required

       type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  }







      



  
    });


    listeningSchema.post("findOneAndDelete", async function (listing) {
      await mongoose.model("Review").deleteMany({ _id: { $in: listing.reviews } });  // Delete all reviews associated with the listing)
  
    });    
 
    


    const Listing = mongoose.model("Listing", listeningSchema);
    module.exports =  Listing;
    // Export the model



