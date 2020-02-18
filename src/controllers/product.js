const productModel = require('../models/product')
const miscHelper = require('../helpers/helpers');
module.exports = {
    getProduct: async (req, res)=>{
        const name = req.query.name
        const description = req.query.description
        const sortBy = req.query.sortBy
        const asc = req.query.asc
        const page = req.query.page
        let perPage = req.query.perPage
        let totalData = 0
        try {
          totalData = await productModel.countModel('product')
        } catch (error) {
          console.log(error)
        }
        const total = totalData[0].TOTAL
        productModel.getProduct(name, description, sortBy, asc, page, perPage)
        .then((result)=>{          
          const resultProduct = result
         if(!perPage){
           perPage = 5
         }
          resultProduct.totalPage = Math.ceil(total/parseInt(perPage)) 
          resultProduct.total_data = totalData[0].TOTAL        
          miscHelper.response(res, resultProduct)
        })
        .catch(err=>{
          miscHelper.response(res, {}, res.status, err)
        })
    },
    productDetail: (req, res) =>{
        const id_product = req.params.id_product;
        productModel.productDetail(id_product)
          .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
    },
    insertProduct: (req, res) => {
      const {name, description, price, stock, image, id_category} = req.body;
      const data = {
        name,
        description,
        price,
        stock,
        image:image,
        id_category       
      }
      productModel.insertProduct(data)
        .then((result) => {
          miscHelper.response(res, result, 201)
        })
        .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
            console.log (err)
          })
    },
    updateProduct: (req, res) => {
      const id_product = req.params.id_product
      console.log(req.body)
      const {name, description, price, stock, id_category} = req.body;
      const data = {
        name,
        description,
        price,
        stock,
        id_category,
      }
      productModel.updateProduct(id_product,data)
        .then((result) => {
          res.json(result)
        })
        .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
    },
    deleteProduct: (req, res) => {
      const id_product = req.params.id_product;
  
      productModel.deleteProduct(id_product)
        .then((result) => {
          res.json(result)
        })
        .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
    },
    addToCart: (req, res) => {
      const user_id = req.decoded.user_id
      const { product_id, quantity } = req.body;
      const data = {
          user_id,
          product_id,
          quantity
      }
      productModel.addToCart(data)
          .then((result) => {
              miscHelper.response(res, result, 200)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
  }
}