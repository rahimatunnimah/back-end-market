const categoryModel = require('../models/category')
const miscHelper = require('../helpers/helpers');
module.exports = {
    getCategory: (req, res)=>{
      const sortBy = req.query.sortBy
      const asc = req.query.asc
        categoryModel.getCategory(sortBy, asc)
        .then((result)=>{
          miscHelper.response(res, result)
        })
        .catch(err=>{
          miscHelper.response(res, {}, res.status, err)
        })
    },
    categoryDetail: (req, res) =>{
        const id_category = req.params.id_category;
        categoryModel.categoryDetail(id_category)
          .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
    },
    insertCategory: (req, res) => {
      const {name} = req.body;
      const data = {
        name
      }
      categoryModel.insertCategory(data)
        .then((result) => {
          miscHelper.response(res, result, 201)
        })
        .catch(err=>{
          miscHelper.response(res, {}, res.status, err)
        })
    },
    updateCategory: (req, res) => {
        const id_category = req.params.id_category
        const {name} = req.body;
        const data = {
          name
        }
        categoryModel.updateCategory(id_category,data)
          .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
      },
      deleteCategory: (req, res) => {
        const id_category = req.params.id_category;
    
        categoryModel.deleteCategory(id_category)
          .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
      },
}