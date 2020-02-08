const express = require('express');
const Router = express.Router()
const productController = require('../controllers/product')
const multer = require('multer');
const auth = require('../helpers/auth')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname)
    }
  })
const path = require('path')
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})

Router
.get('/', auth.verify, productController.getProduct)
.get('/:id_product', productController.productDetail)
.post('/', upload.single('image'), productController.insertProduct)
.patch('/:id_product', productController.updateProduct)
.delete('/:id_product', productController.deleteProduct)
.post('/addtocart', auth.verify, productController.addToCart)

module.exports = Router