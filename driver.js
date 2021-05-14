'use strict'

const { Consumer } = require('sqs-consumer');

const { Producer } = require('sqs-producer');

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/077526148259/vendor',
  region: `us-west-2`,

});


const app = Consumer.create({
    queueUrl: 'https://sqs.us-west-2.amazonaws.com/077526148259/packages.fifo',
    handleMessage: async (message) => {
      console.log(JSON.parse(message.Body));
    }
  });
  
  app.start();