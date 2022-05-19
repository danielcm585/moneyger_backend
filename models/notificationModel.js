const mongoose = require("mongoose")

const User = require("./userModel")
const Wallet = require("./walletModel")

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  body: String,
  read: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ["Warning, Info, Congratulation, Basic"],
    default: "Basic"
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Notification", notificationSchema)