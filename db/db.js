import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("DB Connected");
  } catch (error) {
    console.log("Error occur while connecting db", error);
    throw error;
  }
};
