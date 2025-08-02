import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import { footwearData } from '../../assets/footWearData.js';
//import Footwear from '../model/FootwearModel.js';
 //import { allProducts } from '../../assets/access.js';
 //import Accessory from './accessoryModel.js';
//import {womenProds} from '../../assets/women.js'; ✅
//import Women from './womenModel.js';
import { manProducts } from '../../assets/manData.js';
import Men from './manModel.js';
dotenv.config();

const seedData = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI not defined in .env file");
    process.exit(1); // Exiting with an error code if MONGO_URI is not set
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // Remove existing data from Men collection
    await Men.deleteMany();
    console.log('Old data removed');

    // Insert the new data from manImages
    await Men.insertMany(manProducts);
    console.log("New data seeded successfully ✅");

    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");

    process.exit(0); // Exit script successfully

  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1); // Exit script with error code
  }
};

seedData();

//node src/model/seed.js