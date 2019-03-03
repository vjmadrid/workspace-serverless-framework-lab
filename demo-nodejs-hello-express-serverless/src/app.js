'use strict';
const express = require('express')
const sls = require('serverless-http')
const app = express()

const IS_OFFLINE = eval(process.env.IS_OFFLINE);

app.get('/', async (req, res, next) => {
    console.log('info', '[APP EXPRESS] hello...' );
    console.log('info', '[*] IS_OFFLINE : '+ IS_OFFLINE);

    res.status(200).send('Hello World!' + new Date().toTimeString())
})

module.exports.server = sls(app)