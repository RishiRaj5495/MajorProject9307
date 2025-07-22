  const mongoose = require('mongoose');
  const insData = require('./init/data.js');
  const Listing = require('./Models/listing.js');
const { listingSchema } = require('./schima.js');

  main()
.then(() => {
  console.log("MongoDb connection successful Rishi Raj Chandra");
})
.catch((err) => console.log (err));


async function main(){

  await mongoose.connect('mongodb://127.0.0.1:27017/webservices');
}


const initializeData = async () => {
 
    await Listing.deleteMany({}); // Clear existing data
    console.log("Existing data cleared");
     insData.data = insData.data.map((obj) => (
      {

    ...obj, // Spread operator to copy properties from obj
 owner : "683f1ac2a4d20ece4f1e2edf",

      }
    ));

  let list =  await Listing.insertMany(insData.data);   
    console.log(list);
   

};

initializeData();
