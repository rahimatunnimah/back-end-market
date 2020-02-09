if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 5000

const router = require('./src/routers/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/v1', router)
app.listen(port, function(err){
    if (err) throw err
    console.log('app running')
})