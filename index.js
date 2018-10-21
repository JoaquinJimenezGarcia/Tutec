'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3977

mongoose.connect('mongodb://localhost:27017/tutec', (err, res) => {
    if (err) {
        throw err
    } else {
        console.log('Conexión a la base de datos establecida correctamente')

        app.listen(port, function () {
            console.log('Servidor API escuchando en el puerto: ' + port)
        })
    }
})