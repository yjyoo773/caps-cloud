"use strict";

const faker = require("faker");
const io = require("socket.io-client");
const { thanksHandler } = require("./vendor-handler.js");

const HOST = process.env.HOST || "http://localhost:3000";
const capsConnection = io.connect(`${HOST}/caps`);

const store = "1-206-flowers";
// const store = process.argv.splice(2)[0]

capsConnection.emit("join", store);
capsConnection.emit('getAll',store)
capsConnection.on('message',msg =>{
  console.log('messages: ',msg.payload.payload)
  capsConnection.emit('received',msg.payload.payload)
})
capsConnection.on('delivered',thanksHandler)
capsConnection.on("delivered",(msg)=>{
  capsConnection.emit('received',msg)
})

// capsConnection.on("delivered", thanksHandler);
// setInterval(() => {
//   let newOrder = {
//     store: store,
//     orderId: faker.datatype.uuid(),
//     customerName: faker.name.findName(),
//     productName: faker.commerce.productName(),
//     address: faker.address.streetAddress(),
//   };
//   capsConnection.emit("pickup", newOrder);
// }, 5000);
