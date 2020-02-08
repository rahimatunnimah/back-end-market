const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
module.exports = {
    response : (res, result, status, err) =>{
        let resultPrint = {}
        resultPrint.status = status === 200 || 201 ?'Succes':'error';
        resultPrint.status_code = status;
        resultPrint.result= result;
        resultPrint.err = err || null 
        return res.json(resultPrint);
    },
    hashPassword : (password) =>{
        const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
    },
    generateToken : (id, user_name, name) =>{
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 1);
        return jwt.sign({
            user_id:id, 
            user_name,
            name,
            exp: parseInt(expirationDate.getTime() / 1000, 10)
        },process.env.PRIVATE_KEY)


    }
}