import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (userId, res) => {
  try {
    // Check if JWT_SECRET is available in environment variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return;
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "8d", // Token expiration time
    });

    // Set the cookie in the response
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds
      httpOnly: true, // Makes the cookie inaccessible to JavaScript
      sameSite: "strict", // Ensures the cookie is sent only with same-site requests
      secure: process.env.NODE_ENV !== "development", // Only send cookie over HTTPS in production
    });

    // For mobile testing...
    // res.cookie("jwt", token, {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   sameSite: "lax", // ✅ allows cookies on cross-origin GET/POST from same-site
    //   secure: false, // ✅ must be false for local development (no HTTPS)
    // });

    return token;
  } catch (error) {
    console.error("Error in createToken:", error);
    throw new Error("Error generating token");
  }
};
