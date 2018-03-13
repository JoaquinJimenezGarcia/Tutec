'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdvertSchema = Schema({
    owner: String,
    title: String,
    prize: Number,
    photo: String,
    description: String,
    city: String,
    zone: String,
    peopleInterested: Number,
    visits: Number,
    publicated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Advert', AdvertSchema)