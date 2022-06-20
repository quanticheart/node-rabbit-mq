const rabbit = require('../config/configRabbitMQ');

async function processMessageEmail() {
    await rabbit.consumer(rabbit.constants.queueMessageEmail, (data) => {
        console.log(rabbit.constants.queueMessageEmail + " consumer callback")
        console.log(data);
    })
}

async function processMessagePush() {
    await rabbit.consumer(rabbit.constants.queueMessagePush, (data) => {
        console.log(rabbit.constants.queueMessagePush + " consumer callback")
        console.log(data);
    })
}

async function processMessageSms() {
    await rabbit.consumer(rabbit.constants.queueMessageSms, (data) => {
        console.log(rabbit.constants.queueMessageSms + " consumer callback")
        console.log(data);
    })
}

async function rabbitConsumer() {
    await processMessageEmail()
    await processMessagePush()
    await processMessageSms()
}

module.exports = rabbitConsumer