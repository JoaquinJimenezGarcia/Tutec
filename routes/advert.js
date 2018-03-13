'use strict'

const express = require('express')
var AdvertController = require ('../controllers/advert')
var api = express.Router()

api.post('/post', AdvertController.post)

module.exports = api