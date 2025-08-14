import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB Connected");
  } catch (error) {
    console.log("Error occur while connecting db", error);
    throw error;
  }
};
