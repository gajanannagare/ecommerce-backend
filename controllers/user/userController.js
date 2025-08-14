import { UserModel } from "../../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      res
        .status(409)
        .status({ success: true, message: "User is alredy present" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPass,
        role,
      });
      res.status(201).json({
        success: true,
        data: user,
        message: "You have signed up successfuly",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error ${error}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentails" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5h" }
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 5 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      accessToken: accessToken,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const refreshUser = () => {};
