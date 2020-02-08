const bcrypt = require('bcryptjs')
const userModel = require('../models/user');
const miscHelper = require('../helpers/helpers');
module.exports = {
    register:(req, res)=>{
        const {name, user_name, password, address, birthday} = req.body 
        if (!user_name){
            return miscHelper.response(res, {}, 422, "can't user_name empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        if (!name){
            return miscHelper.response(res, {}, 422, "can't name empty")
        }
        const data = {
            name,
            user_name,
            password: miscHelper.hashPassword(password),
            address,
            birthday
        }
        userModel.creatUser(data)
        .then((result) => {
            miscHelper.response(res, result, 201)
          })
          .catch(err=>{
              console.log(err)
              
            miscHelper.response(res, {}, res.status, err)})
    },
    login:async(req, res)=>{
        const {user_name, password} = req.body
        if (!user_name){
            return miscHelper.response(res, {}, 422, "can't user_name empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        await userModel.getUser(user_name)
        .then((result)=>{
            if(!result.length){
                return miscHelper.response(res, {}, 422, "not registered")
            }else{
                if(!bcrypt.compareSync(password, result[0].password)){
                    return miscHelper.response(res, {}, 422, "invalid password")
                }
                const {id, user_name, name} = result[0]
                // console.log(id)
                const token = miscHelper.generateToken(id, user_name, name)
                return miscHelper.response(res, {token:token}, 201, "succes login")
            }
        })
        .catch(err =>{
            console.log(err)
        })
        
    }
    
}