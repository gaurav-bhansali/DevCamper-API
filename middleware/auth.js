const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer Token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // Set token from cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }
  //   Make Sure that the token exists
  if (!token) {
    return next(new ErrorResponse(`Not Authorized to access this route`), 401);
  }
  try {
    //   Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse(`Not Authorized to access this route`), 401);
  }
});

// Grant Access to Specific Roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User Role ${req.user.role} is unauthorized to access this route`
        ),
        403
      );
    }
    next();
  };
};
