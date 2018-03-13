'use strict'

var User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')

function register(req, res){
    var user = new User()
    var params = req.body

    user.email = params.email
    user.name = params.name
    user.registeredAs = 'USER'
    user.city = params.city
    user.zone = params.zone

    if (params.password) {
        bcrypt.hash(params.password, null, null, function(err, hash) {
        user.password = hash

        if (user.email != null && user.registeredAs != null) {
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({message: 'Error registering the user'})
                } else {
                    if (!userStored) {
                        res.status(404).send({message: 'The user hasn\'t been registered'})
                    } else {
                        res.status(200).send({user: userStored})
                    }
                }
            })
        } else {
            res.status(500).send({message: 'Missing params'})
        }
    })
    } else {
        res.status(500).send({message: 'Select a password'})
    }
}

module.exports = {
  register
}