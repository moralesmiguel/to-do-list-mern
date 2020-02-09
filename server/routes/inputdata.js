const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateInput = require("../config/data");

// Load Data model
const Data = require("../models/Data");

router.get("/all", (req, res) => {
    return Data.find(
        (err, list) => {
            if(err) return console.error(err)
            res.send(list)
        }
    )
})

router.delete( '/:id', async (req, res) => {

    try{
        let to_do = await Data.findByIdAndDelete(req.params.id);
        if(!to_do) res.status(404).send({"err": "No item found"})
        res.status(200).send({})
    } catch(err) {
        res.status(500).send(err)
    }
})

router.get( '/:id', (req, res) => {
    let id = req.params.id

    return Data.find(
        { user_id: id },
        (err, list) => {
            if(err) return console.error(err)
            res.send(list)
        }
    )
})

router.post( '/', (req, res) => {
    //Validation
    const { errors, isValid } = validateInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Object with data from Data model
    let ToDoItem = new Data({
        user_id: req.body.user_id,
        data: req.body.data
    })

    // Save the object
    ToDoItem.save(function(err, data) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while saving the list." });
        } else {
            res.status(200).send({ message: "The item has been added to the list."});
        }
    });
})

module.exports = router;