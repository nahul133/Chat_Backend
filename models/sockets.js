const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/socketsControllers");
const comprobarJWT = require("../helpers/comprobarJWT");


class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketsEvents();
    }


    socketsEvents() {

        this.io.on('connection', async( socket ) => {
            
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])
            
            if (!valido) {
                console.log('socket No identificado')
                return socket.disconnect()
            }

            const user = await usuarioConectado(uid)
            console.log('Se Conectó' ,user.nombre)

            // unir usuario a la sala
            socket.join( uid )

            this.io.emit('listar-usuarios', await getUsuarios())

            socket.on('mensaje-personal',async(payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to( payload.para ).emit('mensaje-personal', mensaje)
                this.io.to( payload.de ).emit('mensaje-personal', mensaje)
            })

            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
                this.io.emit('listar-usuarios', await getUsuarios())
            })
            
        })

    }

}


module.exports = Sockets;
