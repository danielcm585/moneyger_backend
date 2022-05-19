const mongoose = require("mongoose")

const User = require("./userModel")
const Activity = require("./activityModel")

const Schema = mongoose.Schema

const walletSchema = new Schema({
  label: {
    type: String,
    default: "Cash"
  },
  balance: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["Cash","E-Money","Bank Account","Credit Card"],
    default: "Cash"
  },
  history: [{
    type: Schema.Types.ObjectId,
    ref: "Activity"
  }]
})

module.exports = mongoose.model("Wallet", walletSchema)