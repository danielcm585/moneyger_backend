const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
const LocalStrategy = require("passport-local")
// if (process.env.NODE_ENV === "PRODUCTION")
  require("dotenv").config()

const User = require("./models/userModel")
const userRouter = require("./routes/userRoutes")
const walletRouter = require("./routes/walletRoutes")
const activityRouter = require("./routes/activityRoutes")

// Connect to database
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/MoneyGer"
const secretKey = process.env.SECRET_KEY || "thisisasecret"

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(console.log(`CONNECTED TO DATABASE ${dbUrl}`))
  .catch(err => console.log(err))

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secretKey,
  touchAfter: 60 * 60 * 24
})
  
store.on("error", err => {
  console.log("SESSION STORE ERROR", err)
})

// Create express app
const app = express()

app.set("trust proxy", 1)
const sessionConfig = {
  store, 
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none"
  }
}

// Use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(cors({ origin: true, credentials: true }))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({ usernameField: "username" }, User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Create routes
app.get("/", (req, res) => {
  res.send("API SUCCESFULLY CONNECTED")
})

app.get("/session", (req, res) => {
  res.json(req.user);
})

app.use("/user", userRouter)
app.use("/wallet", walletRouter)
app.use("/activity", activityRouter)

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = "Oh no, something went wrong!"
  res.status(statusCode).json(err)
})

// Listen to port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})