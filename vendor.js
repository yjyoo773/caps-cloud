"use strict";

const faker = require("faker");

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const sns = new AWS.SNS();

const sns_topic = "arn:aws:sns:us-west-2:077526148259:pickup.fifo";

// const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');

// const producer = Producer.create({
//   queueUrl: `https://sqs.us-west-2.amazonaws.com/077526148259/packages.fifo`,
//   region: `us-west-2`,
//   MessageGroupId:'123',
//   MessageDeduplicationId:faker.datatype.uuid()
// });

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/077526148259/vendor',
  handleMessage: async (message) => {
    console.log(JSON.parse(message.Body));
  }
});


const data = {
  orderId: faker.datatype.uuid(),
  customer: faker.name.findName(),
  vendorId: sns_topic,
};

const payload = {
  Message: JSON.stringify(data),
  TopicArn: sns_topic,
  MessageGroupId:'123',
  MessageDeduplicationId:faker.datatype.uuid()
};

setInterval(async () => {
  sns
    .publish(payload)
    .promise()
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
  // try {
  //   const message = {
  //     id: faker.datatype.uuid(),
  //     body: JSON.stringify(data),
  //     groupId:'123',
  //     deduplicationId:faker.datatype.uuid()
  //   };

  //   // this produces a new "item" (which is the message above)
  //   // and sends it to our sqs queue
  //   const response = await producer.send(message);
  //   console.log(response);
  // } catch (e) {
  //   console.error(e);
  // }
// }, Math.floor(Math.random() * 1000));
// }, 5000);


// const app = Consumer.create({
//   queueUrl: 'https://sqs.us-west-2.amazonaws.com/077526148259/vendor',
//   handleMessage: async (message) => {
//     console.log(JSON.parse(message.Body));
//   }
// });

app.start();