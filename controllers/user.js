'use strict'

var User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')

function login(req, res){
    var params = req.body

    var email = params.email
    var password = params.password
    
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Error in the API.'})
        } else {
            if(!user) {
                res.status(404).send({message: 'The user doesn\'t exist.'})
            } else {
                bcrypt.compare(password, user.password, function(err, check){
                    if (check) {
                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        } else {
                            res.status(200).send({user})
                        }
                    } else {
                        res.status(404).send({message: 'Wrong password.'})
                    }
                })
            }
        }
    })
}

function register(req, res){
    var user = new User()
    var params = req.body

    user.email = params.email
    user.name = params.name
    user.registeredAs = 'USER'
    user.city = params.city
    user.zone = params.zone

    User.findOne({email: user.email.toLowerCase()}, (err, userExisting) => {
        if(err) {
            res.status(500).send({message: 'Error in the API.'})
        } else {
            if(!userExisting) {
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
            } else {
                res.status(404).send({message: 'This email is currently in use.'})
            }
        }
    })
}

module.exports = {
  register,
  login
}