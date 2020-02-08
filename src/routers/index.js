const express = require('express');

const product = require('./product');
const category = require('./category');
const payment = require('./payment');
const cart = require('./cart');
const user = require('./user');
const Router = express.Router();

Router.use('/product', product);
Router.use('/category', category);
Router.use('/cart', cart);
Router.use('/payment', payment);
Router.use('/user', user);

module.exports = Router;