'use strict'

const express = require('express')
var UserController = require ('../controllers/user')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var md_upload = multipart({uploadDir: './uploads/users'})

api.post('/register', UserController.register)
api.post('/login', UserController.login)
api.put('/update-user/:id',md_auth.ensureAuth, UserController.update)
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage)

module.exports = api