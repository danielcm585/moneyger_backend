const express = require("express")

const user = require("../controllers/userController")
const { isLoggedIn } = require("../middleware")

const router = express.Router()

router.post("/login", user.login)
router.post("/logout", isLoggedIn, user.logout)
router.post("/register", user.register)
// router.get("/wallets", isLoggedIn, user.getWallets)

module.exports = router