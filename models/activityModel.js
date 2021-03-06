const mongoose = require("mongoose")

const User = require("./userModel")
const Wallet = require("./walletModel")

const Schema = mongoose.Schema

const activitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "Wallet"
  },
  amount: Number,
  category: {
    type: String,
    enum: ["Food","Clothes","Home","Work","Entertainment",
          "Income","Interest","Cashback"],
    default: "Income"
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Activity", activitySchema)