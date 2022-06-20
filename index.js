require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const publisherEmail = require("./publishers/message")
const rabbit = require("./consumers/message")

app.get("/sendEmail", (req, res) => {
    publisherEmail("test rabbitMQ 2").then(_ => {
        return res.status(200).send({status: true});
    }).catch(error => {
        return res.status(500).send({status: false, msg: error.error})
    })
});

rabbit()

app.listen(process.env.port, () => {
    console.log(`OK ${process.env.port}`)
})