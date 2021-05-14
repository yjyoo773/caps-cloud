'use strict'

function pickupHandler(socket,payload){
    setTimeout(()=>{
        console.log(`picking up ${payload.orderID}`)
        socket.emit('in-transit',payload)
    },1500)

    setTimeout(()=>{
        console.log(`delivered ${payload.orderID}`)
        socket.emit('delivered',payload)
    },3000)
}

module.exports = {pickupHandler}