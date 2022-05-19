const express = require("express")

const notification = require("../controllers/notificationController")
const catchAsync = require("../utils/catchAsync")
const { isLoggedIn } = require("../middleware")

const router = express.Router()

router.get("/", catchAsync(notification.read))

module.exports = router