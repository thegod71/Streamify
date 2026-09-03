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

    const existingUser = User.findOne({ email });

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

    await newUser.save();
  } catch (err) {}
}
export function logout(req, res) {
  res.send("logout route");
}
// https://youtu.be/ZuwigEmwsTM
