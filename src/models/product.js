const connection = require('../configs/db')
module.exports = {
    getProduct: (name = "", description = "", sortBy = "id", asc = 1, page = 1, perPage = 5) =>{
      return new Promise((resolve, reject)=>{
        if(name || description || sortBy || page || perPage){
          const match = {}          
          const sortableColumn = ['name', 'id_category', 'updated_at', 'id']
          if (!sortableColumn.includes (sortBy)){
            reject(new Error('invalid sort column'))
          }
          const order = asc == -1?'DESC':'ASC'          
          const start = (parseInt(perPage)*parseInt(page))-parseInt(perPage)
  
          match.current_page = page
          match.perPage = perPage
          match.limit = 100
          const prevPage = parseInt(parseInt(page)-1)
          match.previous_page = page>0? "http://localhost:4003/api/v1/product?page="+ prevPage: null
          match.next_page = "http://localhost:4003/api/v1/product?page="+ parseInt(parseInt(page)+1)  
          connection.query("SELECT p.*, c.name as category_name FROM product as p LEFT JOIN category as c ON p.id_category = c.id WHERE p.name LIKE '%"+name+"%' AND description LIKE '%"+description+"%'" + " ORDER BY "+ sortBy + " " + order + " LIMIT ?,?",[parseInt(start), parseInt(perPage)], 
          (err, result)=>{
            if(!err){
              match.result = result
              resolve(match);
            }else{
              reject(new Error(err));
            }
          }) 
        }
       
      })
    },
    countModel: (tabel) =>{
      return new Promise((resolve, reject) => {
        connection.query("SELECT count(*) as TOTAL FROM " + tabel,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
  },
    
    productDetail: (id_product) => {
        return new Promise((resolve, reject) => {
          connection.query("SELECT product.*, category.name as category_name FROM product LEFT JOIN category ON product.id_category = category.id WHERE product.id = ?", id_product, 
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          })
        })
    },
    insertProduct: (data) => {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO product SET ?", data, 
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    },
    updateProduct: (id_product, data) => {
      return new Promise((resolve, reject) => {
        console.log(id_product, data)
        connection.query("UPDATE product SET ? WHERE id = ?", [data, id_product], 
        (err, result) => {
          if (!err) {
            console.log("result", result)
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    },
    deleteProduct: (id_product) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM product WHERE id = ?", id_product, 
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      })
    })
    },
    addToCart:(data) =>{
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO cart SET ?", data, 
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