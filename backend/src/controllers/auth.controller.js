import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  res.send("login route");
}

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists.Please use a different email" });
    }

    const avatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${fullName}`;

    const newUser = new User({
      fullName,
      email,
      password,
      profilePic: avatar,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true, // it is use so that javascript can not access the cookie and it is only accessible by the  browser when   req come browser sent cookie to the  backend and here verify it then further process is done
      secure: process.env.NODE_ENV === "production", // in .env we  development is write so secure=false means jwt is access by HTTP And HTTPS but when we deploy change to production then secure=true means jwt is access by HTTPS only not HTTP
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict", // it means only same site can access the cookie example that we login some website then on other pagesecond website open and this website try to access the cookie of first website then it is not allowed because sameSite is strict so only same site can access the cookie
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error("error in auth controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
export function logout(req, res) {
  res.send("logout route");
}
// https://youtu.be/ZuwigEmwsTM
