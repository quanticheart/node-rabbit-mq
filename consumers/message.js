const rabbit = require('../config/configRabbitMQ');

async function processMessage() {
    await rabbit.consumer('user.sign_up_email', (data) => {
        console.log(data.content.toString(), 'Call email API here');
    })
}

async function rabbitConsumer() {
    await processMessage()
}

module.exports = rabbitConsumer