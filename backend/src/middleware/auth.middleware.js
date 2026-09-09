import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //console.log("Token from cookies:", token); // Log the token for debugging
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized -Invalid token" });
    }
    //.select("-password") is used to exclude the password field from the user object that is returned from the database. This is a security measure to ensure that sensitive information like passwords is not exposed in the request object or sent back to the client. By excluding the password, we reduce the risk of accidental exposure of sensitive data.
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute middleware:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
