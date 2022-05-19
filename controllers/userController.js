const passport = require("passport")

const ExpressError = require("../utils/ExpressError")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")

module.exports.login = (req, res, next) => {
  console.log("HERE")
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err)
    if (!user) return next(ExpressError("User not found", 401))
    await user.populate("wallet")
    await user.populate("history")
    req.login(user, err => {
      if (err) return next(err)
      const { hash, salt, ...userData } = user._doc
      return res.status(200).json(userData)
    })
  })(req, res, next)
}

module.exports.logout = async (req, res, next) => {
  req.logout()
  res.status(200).json("Successfully logged out")
}

module.exports.register = async (req, res, next) => {
  if (req.body.balance) return next(ExpressError("Bad request", 400))
  try {
    const { password } = req.body
    const user = new User({ ...req.body })
    const wallet = new Wallet({ owner: user._id })
    user.wallet.push(wallet)
    await wallet.save()
    await User.register(user, password)
    const { hash, salt, ...userData } = user._doc
    res.status(200).json(userData)
  }
  catch (err) {
    return next(new ExpressError(err.message, 400))
  }
}

module.exports.check = (req, res, next) => {
  if (!req.isAuthenticated()) 
    return res.status(200).json({ isLoggedIn: false });
  res.status(200).json({ isLoggedIn: true });
}