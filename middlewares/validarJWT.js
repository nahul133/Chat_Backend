const jwt = require('jsonwebtoken')


const validarJWT = (req, res, next) => {
    
    try {
        
        const token = req.header('x-token')

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "Acción no valida (no hay Token en la petición)"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const {uid} = payload

        req.uid = uid
        
        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Token no Valido"
        })
    }

}


module.exports = validarJWT;
