// backend/middleware/auth.js

import jwt from "jsonwebtoken";

/**
 * Authentication middleware for protected routes.
 *
 * This middleware checks for a valid JWT token in the Authorization header.
 * If the token is missing, invalid, or expired, the request will be rejected.
 * If the token is valid, the decoded payload will be attached to req.user
 * and the request will continue to the next handler.
 *
 * Usage example:
 *   router.get("/admin-data", authMiddleware, (req, res) => {...});
 */
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if an Authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Expected format: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // Verify the token using the backend secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Token verified — attach decoded payload to the request
    req.user = decoded;

    // Continue to the next middleware / route handler
    next();
  });
}
