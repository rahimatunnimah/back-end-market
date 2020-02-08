const connection = require('../configs/db')
module.exports = {
    creatUser: (data)=>{
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user SET ?", data, 
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            })    
        })
    },
    getUser: (user_name)=>{
        return new Promise((resolve, reject) => {
            connection.query("SELECT id, name, user_name, password FROM user WHERE user_name=?",user_name, 
            (err, result)=>{
                if(!err){
                    resolve(result);
                } else {
                  reject(new Error(err));
                }
            })
        })
    }
}