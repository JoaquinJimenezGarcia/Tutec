'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = Schema({
    email: String,
    name: String,
    registeredAs: ['USER', 'TECHNICIAN', 'ADMIN'],
    photo: String,
    password: String,
    city: String,
    zone: String,
    rate: { type: Number, min: 1, max: 5 },
    dateOfRegistration: { type: Date, default: Date.now },
    commentaries: String,
    publicationsOrReparations: Number
})

module.exports = mongoose.model('User', UserSchema)