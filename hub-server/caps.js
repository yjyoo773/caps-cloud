"use strict";

const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT);
const {logger} = require('./caps-handler')

const caps = io.of("/caps");

caps.on("connection", (socket) => {

  socket.on('join',room=>{
    console.log('room name: ',room)
    socket.join(room)
  })

  socket.on("pickup", (payload) => {

    logger('pickup',payload)
    caps.emit("pickup", payload);
  });

  socket.on("in-transit", (payload) => {

    logger('in-transit',payload)
    caps.to(payload.store).emit("in-transit", payload);
  });

  socket.on("delivered", (payload) => {

    logger('delivered',payload)
    caps.to(payload.store).emit("delivered", payload);
  });
});
