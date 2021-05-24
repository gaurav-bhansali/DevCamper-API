const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

// Include other Resource Routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
// Re-route into other resources Routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.get("/", advancedResults(Bootcamp, "courses"), getBootcamps);
router.get("/:id", getBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.post("/", protect, authorize("publisher", "admin"), createBootcamp);

router.put("/:id", protect, authorize("publisher", "admin"), updateBootcamp);
router.put(
  "/:id/photo",
  protect,
  authorize("publisher", "admin"),
  bootcampPhotoUpload
);

router.delete("/:id", protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
