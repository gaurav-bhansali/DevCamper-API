const express = require("express");
const dotenv = require("dotenv");
// Load env vars
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const colors = require("colors");

const connectDB = require("./config/db");
const bootcamps = require("./routes/bootcamps");
const errorHandler = require("./middleware/error");

// Connect To Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mounting Routes
app.use("/api/v1/bootcamps", bootcamps);
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
