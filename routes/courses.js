const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Course = require("../models/Course");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  advancedResults(Course, {
    path: "bootcamp",
    select: "name description",
  }),
  getCourses
);
router.get("/:id", getCourse);

router.post("/", protect, authorize("publisher", "admin"), addCourse);

router.put("/:id", protect, authorize("publisher", "admin"), updateCourse);

router.delete("/:id", protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
