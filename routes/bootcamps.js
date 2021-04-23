const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

const router = express.Router();

router.get("/", getBootcamps);
router.get("/:id", getBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.post("/", createBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);

module.exports = router;
