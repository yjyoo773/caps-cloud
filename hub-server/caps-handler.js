"use strict";

function logger(event,payload){
    let timestamp = new Date()
    console.log(event,timestamp,payload)
}

module.exports = {logger}