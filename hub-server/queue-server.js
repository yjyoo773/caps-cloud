"use strict";

const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT);
const uuid = require("uuid").v4;
const { logger } = require("./caps-handler");

const caps = io.of("/caps");

const queue = {
  "acme-widgets": {},
  "1-206-flowers": {},
};

// GOT TO THE POINT WHERE ORDERS ARE STORED IN QUEUE AND WHEN CLIENT LOGS IN LOGS MISSED ORDERS
// TODO: FIND A WAY IT DOESNT SAVE INTO QUEUE IF SERVER IS ON

caps.on("connection", (socket) => {
  socket.on("join", (room) => {
    console.log("room name: ", room);
    socket.join(room);
  });

  socket.on("received", (payload) => {

    let storeName = payload.store
    let orderID = payload.orderID
    delete queue[storeName][orderID];
});

  socket.on("getAll", (payload) => {

    Object.keys(queue[payload]).forEach((id) => {
    socket.emit("message", { id, payload: queue[payload][id] });

    });
  });

  socket.on("pickup", (payload) => {
    logger("pickup", payload);
    caps.emit("pickup", payload);
  });

  socket.on("in-transit", (payload) => {
    logger("in-transit", payload);
    caps.to(payload.store).emit("in-transit", payload);
  });

  socket.on("delivered", (payload) => {
    logger("delivered", payload);
    let storeName = payload.store
    let orderID = payload.orderID
    queue[storeName][orderID] = { payload };
    caps.to(storeName).emit("delivered", payload);
  });
});
