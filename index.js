// noinspection JSIgnoredPromiseFromCall

require("dotenv").config()
const authRoute = require("./middleware/fakeMiddleware")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const publisher = require("./publishers/message")
const consumer = require("./consumers/message")

app.get("/sendEmail", authRoute, (req, res) => {
    publisher.sendEmail("Test Send Email").then(_ => {
        return res.status(200).send({status: true});
    }).catch(error => {
        return res.status(500).send({status: false, msg: error.error})
    })
});

app.get("/sendSms", authRoute, (req, res) => {
    publisher.sendSms("Test Send Email").then(_ => {
        return res.status(200).send({status: true});
    }).catch(error => {
        return res.status(500).send({status: false, msg: error.error})
    })
});

app.get("/sendPush", authRoute, (req, res) => {
    publisher.sendPush("Test Send Email").then(_ => {
        return res.status(200).send({status: true});
    }).catch(error => {
        return res.status(500).send({status: false, msg: error.error})
    })
});

consumer()

app.listen(process.env.port, () => {
    console.log(`OK ${process.env.port}`)
})