const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const to_do_users = require("./server/routes/appusers");
const to_do = require("./server/routes/inputdata");
const passport = require("passport");
const app = express();
const keys = require('./server/config/keys');

//Headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Content-Length');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Bodyparser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//bodyParser json
app.use(bodyParser.json());

// Database uri located in keys file
const db = require("./server/config/keys").mongoDB.dbURI;

// Connect to database
mongoose
    .connect(
        db,
        { useNewUrlParser: true,
         useUnifiedTopology: true }
    )
    .then(() => {
            let d = new Date()
                ,dateTime = d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ":" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + ":" + d.getMilliseconds();
            
            console.log(`MongoDB successfully connected.`)
            console.log(`The date and time is ${dateTime}`)

        })
    .catch(err => console.log(err));

// Initialize passport
app.use(passport.initialize());

// Configuration for passport
require("./server/config/passport")(passport);

// Routes
app.use("/api/to_do/auth", to_do_users);
app.use("/api/to_do", to_do);

app.get("/", (req, res) => {
    res.send("home page obtained")
})

const port = process.env.PORT || 5000
    ,d = new Date()
    ,dateTime = d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ":" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + ":" + d.getMilliseconds();

app.listen(port, () => {
    console.log(`Express running on port ${port}.`)
    console.log(`The date and time is ${dateTime}`)
});