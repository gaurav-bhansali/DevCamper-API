const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
// Load env vars
dotenv.config({ path: "./config/config.env" });

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const fileupload = require("express-fileupload");

const connectDB = require("./config/db");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const errorHandler = require("./middleware/error");

// Connect To Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Uploading
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mounting Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
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
