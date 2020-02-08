const connection = require('../configs/db')
module.exports = {
    getCategory: (sortBy = "id", asc = 1) =>{
        return new Promise((resolve, reject)=>{
        
            const sortableColumn = ['id', 'name']
            if (!sortableColumn.includes (sortBy)){
              reject(new Error('invalid sort column'))
            }
            const order = asc == -1?'DESC':'ASC'
          
          connection.query("SELECT * FROM category ORDER BY "+ sortBy + " " + order, 
          (err, result)=>{
            if(!err){
              console.log(result)
              resolve(result);
            }else{
              reject(new Error(err));
            }
          })
        })
      },
      categoryDetail: (id_category) => {
        return new Promise((resolve, reject) => {
          connection.query("SELECT * FROM category WHERE id = ?", id_category, 
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          })
        })
    },
    insertCategory: (data) => {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO category SET ?", data, 
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    },
      updateCategory: (id_category, data) => {
        return new Promise((resolve, reject) => {
          connection.query("UPDATE category SET ? WHERE id = ?", [data, id_category], 
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          })
        })
      },
        deleteCategory: (id_category) => {
      return new Promise((resolve, reject) => {
        connection.query("DELETE FROM category WHERE id = ?", id_category, 
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    },

}