import express, { json } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product/productController.js";
import jwt from "jsonwebtoken";

const router = express();

const authenticate = (req, res, next) => {
  try {
    console.log(req.headers);
    const authHeaders = req.headers["authorization"];
    const accessToken = authHeaders && authHeaders.split(" ")[1];

    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid or expired token" });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error ${error}` });
  }
};

/**
 * @swagger
 * /api/product/getProducts:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */

router.get("/getProducts", authenticate, getProducts);
router.get("/getProduct/:id", authenticate, getProductById);
router.post("/createProduct", authenticate, createProduct);

export default router;
