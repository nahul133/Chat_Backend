const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const generarJWT = require('../helpers/generarJWT');


const crearUsuario = async(req, res) => {

    const {email, password } = req.body;

    try {
        const emailExiste = await Usuario.findOne({email})

        if (emailExiste) {
            return res.json({ok: false, error: 'Usuario Ya Registrado'})
        } 

        const nuevoUsuario = new Usuario(req.body)
        
        const salt = bcrypt.genSaltSync();

        nuevoUsuario.password = bcrypt.hashSync(password, salt);

        await nuevoUsuario.save();

        // generar el JWT
        const token = generarJWT(nuevoUsuario._id);

        res.status(200).json({ok: true, msg: "Usuario Creado Correctamente", nuevoUsuario, token })

    } catch (error) {
        console.log(error)
    }
}


const logearUsuario = async(req, res) => {
     const { email, password } = req.body;

     try {
         const existeUsuario = await Usuario.findOne({email})

            if (!existeUsuario) {
               return res.json({ok: false, msg: "El Usuario no existe"});
               
            }

            const validar = bcrypt.compareSync(password, existeUsuario.password)

            if (!validar) {
               return res.json({ok: false ,msg: "La Contraseña es incorrecta" })
            } else {
                const token = generarJWT(existeUsuario._id)

                res.status(200).json({
                    ok: true,
                    existeUsuario,
                    token
                })
            }
     } catch (error) {
        console.log(error)
     }
    
}


const revisarToken = async(req, res) => {
    const {uid} = req;
    
    const token = generarJWT(uid)

    const usuario = await Usuario.findById(uid)

    res.json({
        ok: true,
        usuario,
        token
    })
}


module.exports = {
    crearUsuario,
    logearUsuario,
    revisarToken
};
