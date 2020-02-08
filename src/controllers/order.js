const checkoutModel = require("../models/order")
const miscHelper = require('../helpers/helpers')
module.exports ={
    checkout: (req, res)=>{
        const user_id = req.decoded.user_id
        checkoutModel.checkout(user_id)
        .then((result)=>{
            miscHelper.response(res, result)
        })
        .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
        })
    }
}