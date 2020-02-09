const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")
const UserSession = require('../models/Session');

//User model
const User = require("../models/User");

// Validation variables
const validateRegisterInput = require("../config/register");
const validateLoginInput = require("../config/login");

router.post("/login", (req, res) => {
    //Validate Login
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Finding user by email
    User.findOne({ email }).then(user => {
        //User exists?
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        //Password check
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    user_id: user._id,
                    name: user.name
                };
                //Token signature with user details
                jwt.sign(
                    payload,
                    keys.session.cookieKey,
                    {
                        expiresIn: 15778476  //in seconds
                    },
                    (err, token) => {

                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            name:   payload.name,
                            user_id: payload.user_id
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Incorrect password" });
            }
        });
    });
});

router.route("/register").post((req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        //Avoiding duplicates
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else 
        // Registration
        {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Password hash with bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.get("/users", (req, res) => {

    //Obtaining users
    return User.find(
        (err, list) => {
            if (err) return console.error(err)
            res.send(list)
        }
    )
})

router.get("/:id", (req, res) => {
    
    //User info
    return User.findById(req.params.id, '-password',
        (err, list) => {
            if (err) return console.error(err)
            res.send(list)
        }
    )
})

module.exports = router;