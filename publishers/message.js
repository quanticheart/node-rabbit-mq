const rabbit = require('../config/configRabbitMQ');

async function sendEmail(text) {
    const exchange = 'user.signed_up';
    const queue = 'user.sign_up_email';
    const routingKey = 'sign_up_email';

    const msg = {
        'id': Math.floor(Math.random() * 1000),
        'email': 'user@domail.com',
        name: 'firstname lastname',
        msg: text
    };
    await rabbit.publisher(exchange, queue, routingKey, msg)
}

module.exports = sendEmail