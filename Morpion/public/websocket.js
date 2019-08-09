//Websocket cote serveur
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

//On initialise les connections des clients au websockets
io.on('connection',function(socket){
    console.log("connection websocket");
    // quand un client envoie sur le canal message
    socket.on('message',function(message){
        //On informe tous les clients qui ecoute le canal message d'un nouveau message
        socket.broadcast.emit('message',{message: message, pseudo:socket.pseudo});
    })

    socket.on('new_pseudo',function(p){
        socket.pseudo = p;
    })
})

server.listen(4001, function(){
    console.log("new connection");
})