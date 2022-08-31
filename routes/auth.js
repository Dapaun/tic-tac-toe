const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req,res) => {
    const {
        email,
        password,
    } = req.body;
    if (!email || !password ) {
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: "User not found"});
            if(user.password === password) {
                return res.status(200).json({
                    user: {
                        id: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        registerDate: user.register_date
                    }
                })
            } else {
                return res.status(400).json({msg: "Invalid credentials"})
            }
        });

});

router.post('/userId', (req, res) => {
    const {
        id,
    } = req.body;

    User.findById(mongoose.Types.ObjectId(id))
        .then(user => {
            if(!user) return res.status(400).json({msg: "User not found"});
            return res.status(200).json({
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    registerDate: user.register_date
                }
            })
        })
})

module.exports = router;