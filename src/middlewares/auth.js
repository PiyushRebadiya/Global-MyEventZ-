const jwt = require('jsonwebtoken');
const { errorMessage } = require('../common/main');
const { SECRET_KEY } = require('../common/variable');

const auth = async(req, res, next) => {
    try{
        const bearerToken = req.headers['authorization'];
        if(bearerToken){
            const token = bearerToken.split(' ')?.[1]
            const decoded = jwt.verify(token, SECRET_KEY);
            if(decoded){
                req.user = decoded
            }
            return next();
        }
        return res.status(404).json(errorMessage('A token is required for authentication'));
    }catch(error){
        return res.status(400).json(errorMessage(error.message));
    }
}

module.exports = auth