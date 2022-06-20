require("dotenv").config()
const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL;

// http://localhost:15672/#/
// guest::guest
async function publisher(exchange, queue, routingKey, json) {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    const channel = await connection.createChannel();

    try {
        console.log('Publishing');
        await channel.assertExchange(exchange, 'direct', {durable: true});
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchange, routingKey);
        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(json)));
        console.log('Message published');
    } catch (e) {
        console.error('Error in publishing message', e);
    } finally {
        console.info('Closing channel and connection if available');
        await channel.close();
        await connection.close();
        console.info('Channel and connection closed');
    }
}

async function consumer(queue, callback) {
    const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    const channel = await connection.createChannel();
    channel.prefetch(10);
    process.once('SIGINT', async () => {
        console.log('got sigint, closing connection');
        await channel.close();
        await connection.close();
        process.exit(0);
    });

    await channel.assertQueue(queue, {durable: true});
    await channel.consume(queue, async (msg) => {
            console.log('processing messages');
            await callback(msg);
            await channel.ack(msg);
        },
        {
            noAck: false,
            consumerTag: 'email_consumer'
        });
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
}

module.exports = { publisher, consumer }
