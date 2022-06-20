const rabbit = require('../config/configRabbitMQ');

async function sendEmail(text) {
    const msg = {
        'id': Math.floor(Math.random() * 1000),
        'email': 'user@domail.com',
        name: 'firstname lastname',
        msg: text
    };
    await rabbit.publisher(
        rabbit.constants.messageExchange,
        rabbit.constants.queueMessageEmail,
        rabbit.constants.routeKeyMessageEmail,
        msg)
}

async function sendPush(text) {
    const push = {
        'id': Math.floor(Math.random() * 1000),
        title: 'Push App',
        msg: text
    };
    await rabbit.publisher(
        rabbit.constants.messageExchange,
        rabbit.constants.queueMessagePush,
        rabbit.constants.routeKeyMessagePush,
        push)
}

async function sendSms(text) {
    const sms = {
        'id': Math.floor(Math.random() * 1000),
        number: '5511988887777',
        msg: text
    };
    await rabbit.publisher(
        rabbit.constants.messageExchange,
        rabbit.constants.queueMessageSms,
        rabbit.constants.routeKeyMessageSms,
        sms)
}

module.exports = {sendEmail, sendPush, sendSms}