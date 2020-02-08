const connection = require('../configs/db')
module.exports = {
    checkout: (user_id) => {
        const message = []
        // console.log(user_id)
        return new Promise((resolve, reject) =>{
            connection.query("SELECT * FROM cart WHERE user_id =?", user_id, 
            (err, result)=>{
                if(!err){
                    // console.log('cek')
                    if(result.length >0){
                        console.log('result', result)
                        result.forEach(e => {
                            connection.query("SELECT id,name,price,stock FROM product WHERE id =?", e.product_id,
                            (err, resultp)=>{
                                if(!err){
                                    console.log('resultp', resultp)
                               if(resultp.length>0){
                                   console.log('resultp', resultp) 
                                   resultp.forEach((el)=>{
                                    console.log('el',el)
                                       if(el.stock>0){
                                           const total_price = e.quantity*el.price
                                           const data = {
                                               user_id,
                                               product_id: el.id,
                                               quantity: e.quantity,
                                               total_price
                                           }
                                           console.log('el',el)
                                           connection.query("INSERT INTO payment SET ?", data)
                                           connection.query("DELETE FROM cart WHERE user_id =?", user_id)
                                           connection.query("UPDATE product SET stock =stock-? WHERE id =?", [e.quantity, el.id]) 
                                           message.push(`succes checkout ${el.name}`)
                                        }
                                       else{
                                           message.push(`Stock ${el.name} empty`)
                                       }
                                       message.forEach((m) =>{
                                            resolve(m)
                                       })
                                   })
                               }
                            }else{
                                console.log('err', err)
                                reject(new Error(err))
                            }
                            })
                            
                        })
                    }else{
                        resolve("sorry, cart is empty. shop again!")
                    }
                }else{
                    reject (new Error (err))
                }
            })
        })
    }
}