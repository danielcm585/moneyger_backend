const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const Wallet = require("./walletModel")
const Activity = require("./activityModel")
const Notification = require("./notificationModel")

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    default: "https://i.ibb.co/B2cSS4q/download.png"
  },
  balance: {
    type: Number,
    default: 0
  },
  wallet: [{
    type: Schema.Types.ObjectId,
    ref: "Wallet"
  }],
  history: [{
    type: Schema.Types.ObjectId,
    ref: "Activity"
  }],
  notification: [{
    type: Schema.Types.ObjectId,
    ref: "Notification",
  }]
})

userSchema.plugin(passportLocalMongoose, { usernameField: "username" })

module.exports = mongoose.model("User", userSchema)