const Mensaje = require('../models/mensaje')


const obtenerChat = async(req, res) => {
    const { uid } = req
    const { de } = req.params

    const last30 = await Mensaje.find({
        $or: [
            { de: uid,  para: de},
            { de: de,  para: uid}
        ]
    })
    .sort({ createdAt: 'asc' })
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })
}



module.exports = {
    obtenerChat,

};
