import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { swaggerSpec, swaggerUi } from "./swagger.js";

// require('crypto').randomBytes(64).toString('hex') Create random secret
dotenv.config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listing on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed server due to sb server error", error);
  }
};
startServer();
