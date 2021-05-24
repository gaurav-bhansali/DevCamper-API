const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

router.get("/:id", getReview);
router.post("/", protect, authorize("user", "admin"), addReview);
router.put("/:id", protect, authorize("user", "admin"), updateReview);
router.delete("/:id", protect, authorize("user", "admin"), deleteReview);
module.exports = router;
