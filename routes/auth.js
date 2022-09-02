const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req,res) => {
    console.log('GETS HERE')
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
        userId,
    } = req.body;
    console.log(
        "GETS HERE AS WELL:", userId
    );
    User.findById(mongoose.Types.ObjectId(userId))
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