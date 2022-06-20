// Exchanges
const messageExchange = "user.messages"

// Queues
const queueMessageEmail = "queue.email"
const queueMessagePush = "queue.push"
const queueMessageSms = "queue.sms"

// Route Key / Bind
const routeKeyMessageEmail = "bind.email"
const routeKeyMessagePush = "bind.push"
const routeKeyMessageSms = "bind.sms"

module.exports = {
    messageExchange,
    queueMessageEmail, routeKeyMessageEmail,
    queueMessagePush, routeKeyMessagePush,
    queueMessageSms, routeKeyMessageSms,
}