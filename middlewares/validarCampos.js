const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => {
    
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })

        return;
    }

    next();
}


module.exports = {
    validarCampos,

}
