'use strict'

const express = require('express')
var AdvertController = require ('../controllers/advert')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')

api.post('/post', md_auth.ensureAuth, AdvertController.post)

module.exports = api