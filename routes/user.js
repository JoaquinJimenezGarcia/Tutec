'use strict'

const express = require('express')
var UserController = require ('../controllers/user')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')

api.post('/register', UserController.register)
api.post('/login', UserController.login)
api.put('/update-user/:id',md_auth.ensureAuth, UserController.update)

module.exports = api