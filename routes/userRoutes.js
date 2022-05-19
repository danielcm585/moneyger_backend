const express = require("express")

const user = require("../controllers/userController")
const { isLoggedIn } = require("../middleware")

const router = express.Router()

router.post("/login", user.login)
router.post("/logout", user.logout)
router.post("/register", user.register)
router.get("/check", user.check)

module.exports = router