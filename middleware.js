const ExpressError = require("./utils/ExpressError")

const Wallet = require("./models/walletModel")

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated())
    return next(new ExpressError("You must log in first", 401))
  next()
}

module.exports.isWalletOwner = (req, res, next) => {
  const { id } = req.params
  const wallet = Wallet.findById(id)
  if (!req.user._id.equals(wallet.owner))
    return next(new ExpressError("You are not the wallet owner", 401))
  next()
}