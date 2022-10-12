const jwt = require("jsonwebtoken") ;

const comprobarJWT = (token = '') => {
    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        return [true, uid]

    } catch (error) {
        return [false, null]
    }
}


module.exports = comprobarJWT;
