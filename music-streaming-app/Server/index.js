// jwt token and google oauth is used to authenticate the user
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const GoogleStrategy = require('passport-google-oauth20').Strategy;


const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileUploadRoutes");


const User = require("./models/User");

const app = express();

require('dotenv').config();
require('./config/OAuthConfig')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors({ credentials: true, origin: "https://trusic.herokuapp.com" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "/../Client/build"))
);


// database connection
const dbURI = 'mongodb+srv://rosita:test123@cluster0.1b23i.mongodb.net/streaming-site';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})



// Routes

app.get("/", (req,res) => {res.send("This is home")});
app.use(authRoutes);
app.use(fileRoutes.routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../Client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

