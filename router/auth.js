
/*  
    path: api/login
*/

const {Router} = require('express');
const { crearUsuario, logearUsuario, revisarToken } = require('../controllers/authController');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');


const router = Router();


router.post('/new', [
    check('nombre', "El nombre es Obligatorio").not().isEmpty(),
    check('password', "La contraseña es Obligatoria").not().isEmpty(),
    check('email', "El Email es Obligatorio").isEmail(),
    validarCampos
] ,crearUsuario)

router.post('/', [
    check('email', "El Email es Obligatorio").isEmail(),
    check('password', "La contraseña es Obligatoria").not().isEmpty(),
    validarCampos

] ,logearUsuario)

router.get('/renew', validarJWT ,revisarToken)

module.exports = router;

