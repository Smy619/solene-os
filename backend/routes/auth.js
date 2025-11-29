import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * POST /api/login
 *
 * This route handles admin authentication.
 * The frontend sends a password, and the backend verifies it against an
 * environment variable (ADMIN_PASSWORD). If the password is correct,
 * the backend returns a signed JWT token that the frontend will store
 * and use for authorized requests.
 */
router.post("/login", (req, res) => {
  const { password } = req.body;

  // Validate request payload
  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  // Ensure backend is properly configured
  if (!adminPassword) {
    return res
      .status(500)
      .json({ error: "Server error: ADMIN_PASSWORD is not defined." });
  }

  // Validate password
  if (password !== adminPassword) {
    return res.status(401).json({ error: "Invalid password." });
  }

  // Generate a JWT token valid for 7 days
  const token = jwt.sign(
    { role: "admin" }, // payload stored inside the token
    process.env.JWT_SECRET, // secret key used to sign the token
    { expiresIn: "7d" } // expiration time
  );

  // Send token back to client
  return res.json({ token });
});

export default router;
