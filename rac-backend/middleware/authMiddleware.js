const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // 🔧 DEV MODE (optional bypass)
    if (process.env.NODE_ENV === "development" && process.env.BYPASS_AUTH === "true") {
      req.user = {
        id: "devUserId",
        role: "selector",
      };
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("❌ Auth Middleware Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { protect };