const connection = require('../configs/db')
module.exports = {
    getPayment:  (sortBy = "id", asc = 1, page = 1, perPage = 5) =>{
      return new Promise(async(resolve, reject)=>{
        if(sortBy || page || perPage){
          const match = {}
          const sortableColumn = ['updated', 'id']
          if (!sortableColumn.includes (sortBy)){
            reject(new Error('invalid sort column'))
          }
          const order = asc == -1?'DESC':'ASC'
         
          const start = (parseInt(perPage)*parseInt(page))-parseInt(perPage)
          match.current_page = page
          match.perPage = perPage
          match.limit = 100
          const prevPage = parseInt(parseInt(page)-1)
          match.previous_page = page>0? "http://localhost:4003/api/v1/payment?page="+ prevPage: null
          match.next_page = "http://localhost:4003/api/v1/payment?page="+ parseInt(parseInt(page)+1)  
          connection.query("SELECT p.*, u.name as user_name, pr.name as product_name FROM payment as p LEFT JOIN user as u ON p.user_id = u.id LEFT JOIN product as pr ON p.product_id =pr.id ORDER BY "+ sortBy + " " + order + " LIMIT ?,?",[parseInt(start), parseInt(perPage)], 
          (err, result)=>{
            if(!err){
              console.log(result)
              match.result = result
              resolve(match);
            }else{
              reject(new Error(err));
            }
          }) 
        }
        connection.query("SELECT * FROM `payment` LIMIT 1, 3 ORDER BY name asc", 
        (err, result)=>{
          if(!err){
            resolve(result);
          }else{
            reject(new Error(err));
          }
        })
      })
    },
    countModel: (tabel) =>{
      return new Promise((resolve, reject) => {
        connection.query("SELECT count(*) as TOTAL FROM payment", 
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