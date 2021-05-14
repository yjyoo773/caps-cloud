'use strict'

const {pickupHandler} = require('./driver-handlers.js')

const io = require('socket.io-client')
const HOST = process.env.HOST || 'http://localhost:3000'

const capsConnection = io.connect(`${HOST}/caps`)


capsConnection.on('pickup',payload=>{
    pickupHandler(capsConnection,payload)
})
