const express = require('express');
const http = require("http");
const socketio = require('socket.io')
const path = require('path');
const cors = require('cors')

const Sockets = require('./sockets');
const dbConnection = require('../database/db');
require('dotenv').config(); 

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 8080;
        
        // conectar db
        dbConnection();

        // http server 
        this.server = http.createServer(this.app)

        // configuracion sockets
        this.io = socketio( this.server, { /* configurariones */ } );

        this.socket = new Sockets(this.io);
    }

    middleWares() {
        this.app.use( express.static( path.resolve(__dirname, '../Public') ) ); 

        // CORS
        this.app.use( cors() );

        // Parsear Body
        this.app.use( express.json());

        // router
        this.app.use( '/api/login', require('../router/auth'))
        this.app.use( '/api/mensajes', require('../router/mensajes'))
    }

    escuchar() {

        this.middleWares();
        this.server.listen(this.port, () => {
            console.log(`Servidor Corriendo En El Puerto ${this.port}`)
        })
    }

}



module.exports = Server;
