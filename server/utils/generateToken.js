const jwt = require('jsonwebtoken');
require('dotenv').config()


function generateToken(tokenType, user){
    let token = null;
    if(tokenType == 'refresh'){
        token = jwt.sign({email: user.email, id: user._id}, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "15m" })
    }

    if(tokenType == 'access'){
        token = jwt.sign({email: user.email , id: user._id}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "30d" })

    }

    return token;
}

module.exports = generateToken