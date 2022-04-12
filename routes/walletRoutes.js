const express = require("express")

const wallet = require("../controllers/walletController")
const catchAsync = require("../utils/catchAsync")
const { isLoggedIn, isWalletOwner } = require("../middleware")

const router = express.Router()

router.post("/", isLoggedIn, catchAsync(wallet.create))
router.get("/:id", isWalletOwner, catchAsync(wallet.show))
router.post("/:id", isWalletOwner, catchAsync(wallet.update))

module.exports = router