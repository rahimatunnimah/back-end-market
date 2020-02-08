const connection = require('../configs/db');

module.exports = {
    getAllCart: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT cart.*, product.name,product.image,product.price FROM cart LEFT JOIN product ON product.id=cart.product_id WHERE cart.user_id=? ORDER BY added DESC", id_user, 
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    editQty: (data, id_cart) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE cart SET ? WHERE id = ?", [data, id_cart], 
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    deleteCart: (id_cart) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM cart WHERE id= ?", id_cart, 
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}