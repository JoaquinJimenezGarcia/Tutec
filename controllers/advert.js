'use strict'

var Advert = require('../models/advert')

function post(req, res){
    var advert = new Advert()
    var params = req.body

    advert.owner = params.owner
    advert.title = params.title
    advert.prize = params.prize
    advert.photo = params.photo
    advert.description = params.description
    advert.city = params.city
    advert.zone = params.zone

    if (advert.title != null && advert.description != null) {
        advert.save((err, advertStored) => {
            if (err) {
                res.status(500).send({message: 'Error registering the user'})
            } else {
                if (!advertStored) {
                    res.status(404).send({message: 'The user hasn\'t been registered'})
                } else {
                    res.status(200).send({advert: advertStored})
                }
            }
        })
    } else {
        res.status(500).send({message: 'Missing params'})
    }
}

module.exports = {
  post
}