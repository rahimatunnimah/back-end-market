require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT
const router = require('./src/routers/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/v1', router)
app.listen(port, function(){
    console.log('app running')
})