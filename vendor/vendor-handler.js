'use strict'

function thanksHandler(payload){
    console.log(`thank you for delivering ${payload.orderID}`)
}

module.exports = {thanksHandler}