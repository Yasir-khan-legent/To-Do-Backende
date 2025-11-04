import mongoose from "mongoose";
import dotenv from 'dotenv'

async function Connection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is Connected ✅");
  } catch (error) {
    console.log("Database Connection Error ❌", error.message);
    process.exit(1);
  }
}

export default Connection;
