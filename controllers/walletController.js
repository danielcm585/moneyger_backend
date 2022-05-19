const ExpressError = require("../utils/ExpressError")

const User = require("../models/userModel")
const Wallet = require("../models/walletModel")
const Activity = require("../models/activityModel")

module.exports.create = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const wallet = new Wallet({
    ...req.body,
    owner: user._id
  })
  user.wallet.push(wallet)
  await wallet.save()
  await user.save()
  res.status(200).json(wallet)
}

module.exports.show = async (req, res, next) => {
  const { id } = req.params
  const wallet = await Wallet.findById(id).populate("history")
  res.status(200).json(wallet)
}

module.exports.update = async (req, res, next) => {
  const { id } = req.params
  const wallet = await Wallet.findById(id)
  const user = await User.findById(wallet.owner)
  const activity = new Activity({
    ...req.body,
    user: user._id,
    wallet: id,
  })
  user.balance += req.body.amount
  user.history.push(activity)
  wallet.balance += req.body.amount
  wallet.history.push(activity)
  await wallet.save()
  await user.save()
  await activity.save()
  res.status(200).json(wallet)
}