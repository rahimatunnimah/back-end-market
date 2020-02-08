const cartModel = require('../models/cart');
const miscHelper = require('../helpers/helpers');

module.exports = {
    getAllCart: (req, res) => {
        const id_user = req.decoded.user_id
        cartModel.getAllCart(id_user)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err=>{
                miscHelper.response(res, {}, res.status, err) 
            })
    },
    editQty: (req, res) => {
        const id_cart = req.params.cart_id
        const { quantity } = req.body;
        const data = {
            quantity
        }
        cartModel.editQty(data, id_cart)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err=>{
                miscHelper.response(res, {}, res.status, err)
            })
    },

    deleteCart: (req, res) => {
        const id_cart = req.params.cart_id

        cartModel.deleteCart(id_cart)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err=>{
                miscHelper.response(res, {}, res.status, err)
            })
    }
}