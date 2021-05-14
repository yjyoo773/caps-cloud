"use strict";

const faker = require("faker");
const io = require("socket.io-client");
const { thanksHandler } = require("./vendor-handler.js");

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' });

const sns = new AWS.SNS()

const sns_topic = 'arn:aws:sns:us-west-2:077526148259:pickup.fifo';

const payload = {
  orderId: faker.datatype.uuid(),
  customer: faker.name.findName(),
  vendorId:sns_topic
};





const HOST = process.env.HOST || "http://localhost:3000";
const capsConnection = io.connect(`${HOST}/caps`);

// const store = "fake store";
const store = process.argv.splice(2)[0]

capsConnection.emit("join", store);
capsConnection.emit('getAll')
capsConnection.on('message',msg =>{
  console.log('messages: ',msg.payload)
  capsConnection.emit('received',msg)
})
capsConnection.on("delivered", thanksHandler);

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
