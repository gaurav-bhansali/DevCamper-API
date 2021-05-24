const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const contentSecurityPolicy = require("helmet-csp");

const connectDB = require("./config/db");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const errorHandler = require("./middleware/error");

// Connect To Database
connectDB();

const app = express();

//
app.use(express.urlencoded({ extended: false }));
// Body Parser
app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// Cookie Parser
app.use(cookieParser());

// Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", "default.example"],
      scriptSrc: ["'self'", "js.example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);
// File Uploading
app.use(fileupload());

// Sanitize Data
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, //10 mins
//   max: 100,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mounting Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
// is route k baad hi ana hoga taaki error catch kar sake
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Creating a server
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise Rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red.bold);
  // Close Server and exit process
  server.close(() => process.exit(1));
});
