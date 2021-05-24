const express = require("express");
const { getIndex, login, register } = require("../controllers/views");

const router = express.Router();
router.get("/", getIndex);
router.get("/api/v1/auth/login", login);
router.get("/api/v1/auth/register", register);
module.exports = router;
